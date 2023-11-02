import React, { useEffect, useState } from 'react';

export default function ContentGrades({user}) {

    const gradeData = [
      {
        subjectCode: 'Math101',
        subjectName: 'Mathematics',
        instructorName: 'John Doe',
        grade: '5.0',
        ects: 6,
        status: 'NoNote',
      },
      {
        subjectCode: 'Sci202',
        subjectName: 'Science',
        instructorName: 'Jane Smith',
        grade: '4.0',
        ects: 5,
        status: 'Proposed',
      },
      {
        subjectCode: 'Hist303',
        subjectName: 'History',
        instructorName: 'Mike Johnson',
        grade: '3.0',
        ects: 4,
        status: 'Accepted',
      },
      // Add more data objects as needed
    ];
  
    return (
      <main>
        <div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Kod Przedmiotu</th>
                <th>Nazwa Przedmiotu</th>
                <th>Prowadzący</th>
                <th>Ocena</th>
                <th>ECTS</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.map((item, index) => (
                <tr key={index} className='rows-colors'>
                  <td>{item.subjectCode}</td>
                  <td>{item.subjectName}</td>
                  <td>{item.instructorName}</td>
                  <td>{item.grade}</td>
                  <td>{item.ects}</td>
                  <td>
                    <button>Zaakceptuj</button>
                    <button>Reklamuj</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }