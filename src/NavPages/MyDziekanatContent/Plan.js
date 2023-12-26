import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../MyIndexContent/MyPlan.css';
import axios from "axios";

function findDates(weekday, startWeeksAgo, endWeeksInFuture) {
  const polishToMomentDayMap = {
    'poniedziałek': 0, // Monday
    'wtorek': 1,       // Tuesday
    'środa': 2,        // Wednesday
    'czwartek': 3,     // Thursday
    'piątek': 4,       // Friday
  };

  const weekdayIndex = polishToMomentDayMap[weekday];
  const dates = [];

  // Starting date, weeks ago
  let date = moment().subtract(startWeeksAgo, 'weeks').startOf('isoWeek').add(weekdayIndex, 'days');

  for (let week = -startWeeksAgo; week <= endWeeksInFuture; week++) {
    dates.push(moment(date));
    date.add(1, 'weeks');
  }

  return dates;
}

export default function ContentPlan({user}) {
  const [timetableData, setTimetableData] = useState([]);
  const [events, setEvents] = useState([]);
  const [teachersDetails, setTeachersDetails] = useState({});
  const [subjectsDetails, setSubjectsDetails] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded
  const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);
  const [targetIdInput, setTargetIdInput] = useState('');

  const [tryToLoad, setTryToLoad] = useState(false);

  // Use 24-hour format for time labels, start week on Monday
  moment.locale('en-GB', {
    week: {
      dow: 1, // Monday is the first day of the week.
    },
  });
  const formats = {
    timeGutterFormat: 'HH:mm', 
  };
  const localizer = momentLocalizer(moment);

  const updateEvents = () => {
    const prepEvents = [];
    const uniqueEventIdentifiers = new Set(); // Set to track unique event identifiers
  
    timetableData.forEach(lesson => {
      const startHour = moment(lesson.starts_at, 'HH:mm');
      const endHour = moment(lesson.ends_at, 'HH:mm');
  
      const lessonDates = findDates(lesson.weekday, 4, 4);
      lessonDates.forEach(date => {
        const isEvenWeek = date.isoWeek() % 2 === 0;
        const isOddWeek = !isEvenWeek;
        const isRelevantWeek = (lesson.which_weeks === 'wszystkie') || 
                              (lesson.which_weeks === 'parzyste' && isEvenWeek) || 
                              (lesson.which_weeks === 'nieparzyste' && isOddWeek);
  
        if (isRelevantWeek) {
          const start = moment(date).set({
            hour: startHour.hour(),
            minute: startHour.minute()
          }).toDate();
          const end = moment(date).set({
            hour: endHour.hour(),
            minute: endHour.minute()
          }).toDate();
  
          // Construct a unique identifier for the event including the date
          const eventIdentifier = `${lesson.subject_id}-${lesson.place}-${startHour.format('HH:mm')}-${date.format('YYYY-MM-DD')}`;
  
          // Only add the event if it's not already in the set
          if (!uniqueEventIdentifiers.has(eventIdentifier)) {
            const teacherDetail = teachersDetails[lesson.teacher_id];
            const teacherName = teacherDetail ? teacherDetail.fullName : 'Unknown Teacher';
            
            const subjectDetail = subjectsDetails[lesson.subject_id];
            const subjectName = subjectDetail ? subjectDetail.name : 'Unknown Subject';
            const subjectCode = subjectDetail ? subjectDetail.code : 'Unknown Code';
  
            const eventTitle = `[${subjectCode}] ${subjectName}, ${teacherName}, Room: ${lesson.place}, ${startHour.format('HH:mm')} - ${endHour.format('HH:mm')}`;
            prepEvents.push({ title: eventTitle, start, end, resource: lesson });
  
            uniqueEventIdentifiers.add(eventIdentifier); // Add the identifier to the set
          }
        }
      });
    })
  
    setEvents(prepEvents);
  };

  const loadUserPlanData = async (targetId) => {
    try {
      try{
        const res = await axios.get("https://api.ipify.org/?format=json");
        let action = "getplan";
        let jsonObject = {
          targetId: targetId,
        };
        const argsParam = encodeURIComponent(JSON.stringify(jsonObject));
        const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&args=${argsParam}&token=${user.token}`);
      }catch(error){
      }

      // Determine the URL based on whether it's a student or a teacher
      const url = `https://simpleuniversitysystem.000webhostapp.com/api/timetableData.php?token=${user.token}&targetId=${targetId}`;
  
      const response = await fetch(url);
  
      if (response.ok) {
        const userPlanDataFromDB = await response.json();
  
        // Process timetable data, teachers and subjects details as required
        // This may include setting up state variables with the received data
        setTimetableData(timetableData);
  
        //
        // LOAD TEACHER IDS
        //

        // Extract unique teacher IDs from the timetable data
        const teacherIds = [...new Set(userPlanDataFromDB.map(lesson => lesson.teacher_id))];

        // Create a comma-separated string of teacher IDs
        const teacherIdsParam = teacherIds.join(',');

        // Make an API request to fetch teacher names using GET method
        const teachersResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getTeachers.php?teacherIds=${teacherIdsParam}`);

        if (teachersResponse.ok) {
            const teachersData = await teachersResponse.json();
            
            // Create an object with teacher_id as keys and the full teacher details as values
            const teachersById = teachersData.reduce((details, teacher) => {
            details[teacher.id] = {
                title: teacher.title,
                firstName: teacher.first_name,
                lastName: teacher.last_name,
                fullName: `${teacher.title} ${teacher.first_name} ${teacher.last_name}`,
            };
            return details;
            }, {});
        
            // Update the state with the new object
            setTeachersDetails(teachersById);
        
            // Now, let's integrate the teacher's full name into the timetable data
            const updatedTimetableData = userPlanDataFromDB.map(lesson => {
            const teacher = teachersById[lesson.teacher_id];
            return {
                ...lesson,
                teacherName: teacher ? teacher.fullName : 'Unknown'
            };
            });
        
            // Update the timetable data state with teacher names included
            setTimetableData(updatedTimetableData);
        
        } else {
            console.error('Failed to fetch teachers');
            // Handle the error as needed
        }

        //
        // LOAD SUBJECT IDS
        //

        // Extract unique subject IDs from the timetable data
        const subjectIds = [...new Set(userPlanDataFromDB.map(lesson => lesson.subject_id))];

        // Create a comma-separated string of subject IDs
        const subjectIdsParam = subjectIds.join(',');

        // Make an API request to fetch subject names and codes using GET method
        const subjectsResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getSubjects.php?subjectIds=${subjectIdsParam}`);

        if (subjectsResponse.ok) {
            const subjectsData = await subjectsResponse.json();

            // Process subjects data into an object keyed by subject_id
            const subjectsById = subjectsData.reduce((details, subject) => {
            details[subject.subject_id] = {
                name: subject.subject_name,
                code: subject.subject_code,
                namecode: `[${subject.subject_code}] ${subject.subject_name}`,
            };
            return details;
            }, {});

            // Update the state with the subjects object
            setSubjectsDetails(subjectsById);
        
            // Use subjectsDetails to enrich the timetableData
            const updatedTimetableData = userPlanDataFromDB.map(lesson => {
            const subject = subjectsById[lesson.subject_id];
            return {
                ...lesson,
                subjectNamecode: subject ? subject.namecode : 'Unknown',
            };
            });
        
            // Update the timetable data state with enriched information
            setTimetableData(updatedTimetableData);
        }
  
        setDataLoaded(true);
      } else {
        // Handle HTTP error response
        console.error('Failed to fetch timetable data');
        setErrorWhileLoadingData(true);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
      setErrorWhileLoadingData(true);
      
      setTimetableData([]);
      setEvents([]);
      setTeachersDetails([]);
      setSubjectsDetails([]);
      setDataLoaded(false);
    }
  };
  

  const handleSubmit = () => {
    const id = parseInt(targetIdInput);

    if (id >= 100000 && id <= 999999) {
      loadUserPlanData(id, 'student');
    } else if (id >= 1000 && id <= 99999) {
      loadUserPlanData(id, 'teacher');
    } else {
      alert('Invalid ID. Please enter a valid student or teacher ID.');
    }
  };


  useEffect(() => {
    // This useEffect is triggered when timetableData, teachersDetails, or subjectsDetails change.
    if (timetableData.length > 0 && Object.keys(teachersDetails).length > 0 && Object.keys(subjectsDetails).length > 0) {
      updateEvents();
    }
  }, [timetableData, teachersDetails, subjectsDetails]);

  return (
    <main>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <p>Wpisz id studenta/pracownika</p>
            <input 
            type="text" 
            value={targetIdInput}
            onChange={(e) => setTargetIdInput(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "200px", borderRadius: "5px", border: "1px solid #ccc", textAlign: "center" }}
            />
            <button onClick={handleSubmit} style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Załaduj plan zajęć 
            </button>
        </div>

      {dataLoaded ?
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['week']}
          defaultView="week"
          step={15}
          timeslots={2}
          min={moment().set('hour', 7).set('minute', 30).toDate()}
          max={moment().set('hour', 21).set('minute', 0).toDate()}
          defaultDate={moment().set('hour', 7).set('minute', 30).toDate()}
          formats={formats} // Apply the custom time format
        />
      </div>
      : (tryToLoad ? <p>Loading Data...</p> : null)}
      {errorWhileLoadingData ? <p>Błąd! Nie udało się załadować danych!</p> : null}
    </main>
  );
}
