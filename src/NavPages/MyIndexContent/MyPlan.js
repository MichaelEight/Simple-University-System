import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyPlan.css';

export default function ContentMyPlan({user}) {
  const [validToken, setValidToken] = useState(true);
  const [timetableData, setTimetableData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded
  const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);

  // Use 24-hour format for time labels
  moment.locale('en-GB');
  const formats = {
    timeGutterFormat: 'HH:mm', 
  };
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const loadUserPlanData = async () => {
      try {
        // Check if there is cached data in localStorage
        const cachedData = localStorage.getItem('userPlanData');
        const cachedTimestamp = localStorage.getItem('userPlanDataTimestamp');
        const currentTimestamp = new Date().getTime();

        // If cached data exists and is less than 30 seconds old, use it
        if (cachedData && cachedTimestamp && currentTimestamp - cachedTimestamp < 30000) {
          setTimetableData(JSON.parse(cachedData));
          setDataLoaded(true);
          console.log("Data (user plan) loaded from local storage!");
        } else {
          const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/validateToken.php?token=${user.token}`);
          if (response.ok) {
            const data = await response.json();
            if (data.valid) {
              setValidToken(true);

              const dataResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/timetableData.php?token=${user.token}`);
              console.log(dataResponse);
              if (dataResponse.ok) {
                const userPlanDataFromDB = await dataResponse.json();

                console.log(userPlanDataFromDB);

                setTimetableData(userPlanDataFromDB);
                setDataLoaded(true);
                console.log("Data (user plan) downloaded successfully!");

                // Cache the data in localStorage
                localStorage.setItem('userPlanData', JSON.stringify(userPlanDataFromDB));
                localStorage.setItem('userPlanDataTimestamp', currentTimestamp.toString());
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

  // Transform fetched data to fit the calendar's event format
  const events = timetableData.map(lesson => {
    const start = new Date(lesson.starts_at);
    const end = new Date(lesson.ends_at);
  
    // Format times using moment.js for consistency
    const startTime = moment(start).format('HH:mm');
    const endTime = moment(end).format('HH:mm');
  
    // Construct the event title
    const eventTitle = `[${lesson.subject_code}] ${lesson.teacher_name}, Sala: ${lesson.place}, ${startTime} - ${endTime}`;
  
    return {
      title: eventTitle,
      start,
      end,
    };
  });

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
