import React, { useState, useEffect } from 'react';

function YourComponent() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
      try {
          // Replace 'loggedInStudentID' with the actual ID of the logged-in user
          const loggedInStudentID = 100000; // Example student_id
          const response = await fetch(`http://simpleuniversitysystem.000webhostapp.com/api/api.php?student_id=${loggedInStudentID}`);
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          const students = await response.json();
          setStudents(students);
      } catch (error) {
          console.error('Error:', error);
      }
  }
  
    return (
        <div>
        <h1>List of Students (placeholder)</h1>
        <ul>
          {students.map((student) => (
            <li key={student.student_id}>{student.first_name}</li>
          ))}
        </ul>
      </div>
    );
}
  
export default YourComponent;