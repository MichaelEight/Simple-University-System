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
              if (dataResponse.ok) {
                const userPlanDataFromDB = await dataResponse.json();

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
  const events = [];

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

        const eventTitle = `[${lesson.subject_code}] ${lesson.teacher_name}, Room: ${lesson.place}, ${startHour.format('HH:mm')} - ${endHour.format('HH:mm')}`;
        
        events.push({ title: eventTitle, start, end });
      }
    });
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
