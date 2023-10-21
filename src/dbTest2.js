import React, { useState, useEffect } from 'react';

function YourComponent() {
  const [user, setUser] = useState(null);
  const [userDomain, setUserDomain] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      // Replace 'loggedInStudentID' with the actual ID of the logged-in user
      // const loggedInUserEmail = "100000@student.mak.pl";
      const loggedInUserEmail = "100000@student.mak.pl";
      const password = "banan8";
      const [user_id, domain] = loggedInUserEmail.split('@');
      const response = await fetch(`http://simpleuniversitysystem.000webhostapp.com/api/inputTester.php?user_id=${user_id}&domain=${domain}&password=${password}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const user = await response.json();
      setUser(user);
      setUserDomain(domain);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>User Information</h1>
      {userDomain === "student.mak.pl" ? (
        user && (
          <ul>
            <li>{user.first_name} {user.last_name}</li>
            <li>Student ID: {user.id}</li>
            {/* Add other user properties here */}
          </ul>
        )
      ) : userDomain === "mak.pl" && user && (
        <ul>
          <li>{user.first_name} {user.last_name}</li>
          <li>User ID: {user.id}</li>
          {/* Add other user properties here */}
        </ul>
      )}
    </div>
  );
}

export default YourComponent;
