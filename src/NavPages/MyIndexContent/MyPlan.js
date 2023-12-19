import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyPlan.css';

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

export default function ContentMyPlan({user}) {
  const [validToken, setValidToken] = useState(true);
  const [timetableData, setTimetableData] = useState([]);
  const [events, setEvents] = useState([]);
  const [teachersDetails, setTeachersDetails] = useState({});
  const [subjectsDetails, setSubjectsDetails] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded
  const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);

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

          // Use teacher_id to get the teacher's full name from the teachersDetails state
          const teacherDetail = teachersDetails[lesson.teacher_id];
          const teacherName = teacherDetail ? teacherDetail.fullName : 'Unknown Teacher';
          
          const subjectDetail = subjectsDetails[lesson.subject_id];
          const subjectName = subjectDetail ? subjectDetail.name : 'Unknown Subject';
          const subjectCode = subjectDetail ? subjectDetail.code : 'Unknown Code';

          // Construct the event title with the teacher's full name
          const eventTitle = `[${subjectCode}] ${subjectName}, ${teacherName}, Room: ${lesson.place}, ${startHour.format('HH:mm')} - ${endHour.format('HH:mm')}`;

          // Push the event into the events array
          prepEvents.push({ title: eventTitle, start, end, resource: lesson });
          }
      });
    })

    setEvents(prepEvents);
  };


  useEffect(() => {
    const loadUserPlanData = async () => {
      try {
        // Check if there is cached data in localStorage
        const cachedData = localStorage.getItem('userTimetableData');
        const cachedDataTeachers = localStorage.getItem('userTimetableTeachersData');
        const cachedDataSubjects = localStorage.getItem('userTimetableSubjectsData');
        const cachedTimestamp = localStorage.getItem('userTimetableDataTimestamp');
        const currentTimestamp = new Date().getTime();

        // If cached data exists and is less than 30 seconds old, use it
        if (cachedData && cachedDataTeachers && cachedDataSubjects && cachedTimestamp && currentTimestamp - cachedTimestamp < 30000) {
          try{
          const cachedTimetableData = JSON.parse(cachedData);
          const cachedTeachers = JSON.parse(cachedDataTeachers || '{}');
          const cachedSubjects = JSON.parse(cachedDataSubjects || '{}');

          setTimetableData(cachedTimetableData);
          setTeachersDetails(cachedTeachers);
          setSubjectsDetails(cachedSubjects);

          // Ensure states are updated before calling updateEvents
          setTimeout(() => {
            setDataLoaded(true);
          }, 0);

          }catch (e) {
            console.error('Error parsing cached data:', e);
            // Handle error or load data from server as fallback
          }
        }
        else 
        {
          const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/validateToken.php?token=${user.token}`);
          if (response.ok) {
            const data = await response.json();
            if (data.valid) {
              setValidToken(true);

              const dataResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/timetableData.php?token=${user.token}`);
              if (dataResponse.ok) {
                const userPlanDataFromDB = await dataResponse.json();

                setTimetableData(userPlanDataFromDB);
                setDataLoaded(true);

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
                console.error("User plan data download failed!");
                setErrorWhileLoadingData(true);
              }
            } else {
              setValidToken(false);
            }
          } else {
            console.error('Error when validating the token');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user) {
      loadUserPlanData();
    }
  }, [user]);

  useEffect(() => {
    if (dataLoaded && timetableData.length > 0) {
      localStorage.setItem('userTimetableData', JSON.stringify(timetableData));
      localStorage.setItem('userTimetableDataTimestamp', new Date().getTime().toString());
    }
  }, [timetableData, dataLoaded]);
  
  useEffect(() => {
    if (dataLoaded && Object.keys(teachersDetails).length > 0) {
      localStorage.setItem('userTimetableTeachersData', JSON.stringify(teachersDetails));
    }
  }, [teachersDetails, dataLoaded]);
  
  useEffect(() => {
    if (dataLoaded && Object.keys(subjectsDetails).length > 0) {
      localStorage.setItem('userTimetableSubjectsData', JSON.stringify(subjectsDetails));
    }
  }, [subjectsDetails, dataLoaded]);

  useEffect(() => {
    // This useEffect is triggered when timetableData, teachersDetails, or subjectsDetails change.
    if (timetableData.length > 0 && Object.keys(teachersDetails).length > 0 && Object.keys(subjectsDetails).length > 0) {
      updateEvents();
    }
  }, [timetableData, teachersDetails, subjectsDetails]);
  

  return (
    <main>
      {validToken && dataLoaded ?
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
      : ((validToken ?
        (errorWhileLoadingData ? <p>Database error! Failed to load data!</p> : <p>Loading Data...</p>) :
         <p>INVALID TOKEN</p> )
     )}
    </main>
  );
}
