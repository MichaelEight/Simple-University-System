import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyPlan.css';

export default function ContentMyPlan() {
  const exampleLessons = [
    {
      id: 1,
      subject_code: 'MATH101',
      teacher_name: 'John Smith',
      starts_at: '2023-11-01T09:00:00',
      ends_at: '2023-11-01T10:30:00',
      classroom_number: '101',
    },
    {
      id: 2,
      subject_code: 'ENG202',
      teacher_name: 'Alice Johnson',
      starts_at: '2023-11-01T11:00:00',
      ends_at: '2023-11-01T12:30:00',
      classroom_number: '202',
    },
    {
      id: 3,
      subject_code: 'CHEM301',
      teacher_name: 'David Wilson',
      starts_at: '2023-11-02T14:00:00',
      ends_at: '2023-11-02T15:30:00',
      classroom_number: '303',
    },
  ];

  const localizer = momentLocalizer(moment);
  
  const events = exampleLessons.map(lesson => {
    const start = moment(lesson.starts_at).toDate();
    const end = moment(lesson.ends_at).toDate();

    // Use moment formatting to display time in 24-hour format
    const startTime = moment(start).format('HH:mm');
    const endTime = moment(end).format('HH:mm');

    const eventTitle = `[${lesson.subject_code}] ${lesson.teacher_name}, Sala: ${lesson.classroom_number}, ${startTime} - ${endTime}`;

    return {
      title: eventTitle,
      start,
      end,
    };
  });

  return (
    <main>
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
        />
      </div>
    </main>
  );
}
