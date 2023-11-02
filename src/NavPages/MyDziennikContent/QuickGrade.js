import React, { useState } from 'react';

export default function ContentQuickGrade() {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
  
    // Function to handle the "Search" button click
    const handleSearch = () => {
      // You can make an API call here to fetch student information based on the studentId
      // For now, let's use random data as a placeholder
      const randomData = generateRandomStudentData();
      setName(randomData.name);
      setLastName(randomData.lastName);
      setStatus(randomData.status);
    };
  
    // Function to generate random student data as a placeholder
    const generateRandomStudentData = () => {
      // Replace this with your actual logic to generate random data
      const randomData = {
        name: 'John',
        lastName: 'Doe',
        status: 'Active',
      };
      return randomData;
    };
  
    function generateRandomGrade() {
      const possibleGrades = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5];
      const randomIndex = Math.floor(Math.random() * possibleGrades.length);
      const formattedGrade = possibleGrades[randomIndex].toFixed(1);
      return formattedGrade;
    }
  
    return (
      <main>
        <div>
          <div>
            <label>Student ID:</label>
            <input
              type="number"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div>
            <p>Name: {name}</p>
            <p>Last name: {lastName}</p>
            <p>Status: {status}</p>
          </div>
        </div>
  
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>Current Grade</th>
              <th>Input Grade</th>
              <th>W</th>
              <th>Ć</th>
              <th>L</th>
              <th>P</th>
            </tr>
          </thead>
          <tbody>
            {/* Generate random student data as a placeholder */}
            {Array.from({ length: 10 }, (_, index) => (
              <tr key={index} className='rows-colors'>
                <td>Subject Code {index + 1}</td>
                <td>Subject Name {index + 1}</td>
                <td>{generateRandomGrade()}</td>
                <td>
                    <select
                      // value={student.grade}
                      // onChange={e => handleGradeChange(student.id, e.target.value)}
                      style={{ width: '100px', textAlign: 'center', verticalAlign: 'middle', fontSize: '17px' }}
                    >
                      <option value="">-</option>
                      <option value="2.0">2.0</option>
                      <option value="3.0">3.0</option>
                      <option value="3.5">3.5</option>
                      <option value="4.0">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5.0">5.0</option>
                      <option value="5.5">5.5</option>
                    </select>
                  </td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
                <td><input type="checkbox" /></td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className='button-spacing'></div>
  
        <button className='apply-grades-button'>Accept new grades</button>
      </main>
    );
  }