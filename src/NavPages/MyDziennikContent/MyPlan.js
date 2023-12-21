import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../MyIndexContent/MyPlan.css';


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

export default function ContentMyPlanTeacher({user}) {
  const [validToken, setValidToken] = useState(true);
  const [timetableData, setTimetableData] = useState([]);
  const [events, setEvents] = useState([]);
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
    const uniqueLessons = new Map(); // Map to store unique lessons
  
    // Iterate over timetableData to populate uniqueLessons
    timetableData.forEach(lesson => {
      const identifier = `${lesson.subject_id}-${lesson.starts_at}-${lesson.place}`;
      if (!uniqueLessons.has(identifier)) {
        uniqueLessons.set(identifier, lesson);
      }
    });
  
    const prepEvents = [];
  
    uniqueLessons.forEach(lesson => {
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
  
          const subjectDetail = subjectsDetails[lesson.subject_id];
          const subjectName = subjectDetail ? subjectDetail.name : 'Unknown Subject';
          const subjectCode = subjectDetail ? subjectDetail.code : 'Unknown Code';
  
          const eventTitle = `[${subjectCode}] ${subjectName}, Room: ${lesson.place}, ${startHour.format('HH:mm')} - ${endHour.format('HH:mm')}`;
          prepEvents.push({ title: eventTitle, start, end, resource: lesson });
        }
      });
    });
  
    setEvents(prepEvents);
  };
  
  


  useEffect(() => {
    const loadUserPlanData = async () => {
      try {
        // Check if there is cached data in localStorage
        const cachedData = localStorage.getItem('userDziennikTimetableData');
        const cachedDataSubjects = localStorage.getItem('userDziennikTimetableSubjectsData');
        const cachedTimestamp = localStorage.getItem('userDziennikTimetableDataTimestamp');
        const currentTimestamp = new Date().getTime();

        // If cached data exists and is less than 30 seconds old, use it
        if (cachedData && cachedDataSubjects && cachedTimestamp && currentTimestamp - cachedTimestamp < 30000) {
          try{
          const cachedTimetableData = JSON.parse(cachedData);
          const cachedSubjects = JSON.parse(cachedDataSubjects || '{}');

          setTimetableData(cachedTimetableData);
          setSubjectsDetails(cachedSubjects);

          // Ensure states are updated before calling updateEvents
          setTimeout(() => {
            setDataLoaded(true);
          }, 0);

          console.log("Data (user plan) loaded from local storage!");
          }catch (e) {
            console.error('Error parsing cached data:', e);
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
                console.log("Data (user plan) downloaded successfully!");

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
                
                  console.log("Data (user plan) with subject names downloaded successfully!");
                }

                setDataLoaded(true);
              } else {
                console.log("User plan data download failed!");
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
      localStorage.setItem('userDziennikTimetableData', JSON.stringify(timetableData));
      localStorage.setItem('userDziennikTimetableDataTimestamp', new Date().getTime().toString());
      console.log("Timetable data saved to local storage!");
    }
  }, [timetableData, dataLoaded]);
  
  useEffect(() => {
    if (dataLoaded && Object.keys(subjectsDetails).length > 0) {
      localStorage.setItem('userDziennikTimetableSubjectsData', JSON.stringify(subjectsDetails));
      console.log("Subject data saved to local storage!");
    }
  }, [subjectsDetails, dataLoaded]);

  useEffect(() => {
    // This useEffect is triggered when timetableData or subjectsDetails change.
    if (timetableData.length > 0 && Object.keys(subjectsDetails).length > 0) {
      updateEvents();
    }
  }, [timetableData, subjectsDetails]);
  

  const CustomEvent = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        {event.desc && ':  ' + event.desc}
      </span>
    );
  };

  return (
    <main>
      {validToken && dataLoaded ?
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          components={{
            event: CustomEvent, // Use the custom event component
          }}
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
