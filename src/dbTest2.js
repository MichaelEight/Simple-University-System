import React, { useState, useEffect } from 'react';
// import { domainToASCII } from 'url';

function YourComponent() {
    const [users, setUsers] = useState([]);
    const [userDomain, setUserDomain] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
      try {
          // Replace 'loggedInStudentID' with the actual ID of the logged-in user
          const loggedInUserEmail = "100000@student.mak.pl";
          const [user_id, domain] = loggedInUserEmail.split('@');
          const response = await fetch(`http://simpleuniversitysystem.000webhostapp.com/api/inputTester.php?student_id=${user_id}&domain=${domain}`);
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          const users = await response.json();
          setUsers(users);
          setUserDomain(domain);
      } catch (error) {
          console.error('Error:', error);
      }
  }
  
    return (
        <div>
        <h1>List of Users (placeholder)</h1>
        <ul>
          {(userDomain == "student.mak.pl") ? 
            users.map((student) => (
              <li key={student.student_id}>{student.first_name} {student.last_name}</li>
            ))
            :
            users.map((user) => (
              <li key={user.id}>{user.first_name} {user.last_name}</li>
            ))}
          
        </ul>
      </div>
    );
}
  
export default YourComponent;