import axios from 'axios';
import React, { useState, useEffect } from 'react';

async function fetchStudents() {
    try {
      const response = await fetch('http://simpleuniversitysystem.000webhostapp.com/api.php');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const students = await response.json();
      console.log(students); // Log the list of students to the console
    } catch (error) {
      console.error('Error:', error);
    }
}

function YourComponent() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
        const response = await fetch('http://simpleuniversitysystem.000webhostapp.com/api.php');

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