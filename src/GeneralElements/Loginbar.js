import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library
import '../GeneralElementsStyles/Loginbar.css';
import '../GlobalStyles.css';

export default function LoginBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [student, setStudent] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false); // State for "Keep me logged in" checkbox
  
    useEffect(() => {
      // Check if the user is logged in using cookies
      const isLoggedIn = Cookies.get('loggedIn') === 'true';
      if (isLoggedIn) {
        // Retrieve user information from cookies and set the session
        const studentInfo = JSON.parse(Cookies.get('studentInfo'));
        setLoggedIn(true);
        if (studentInfo) {
          setStudent(studentInfo);
        }
      }
    }, []); // Run this effect once on component mount
  
    const handleLogin = () => {
        if (isValidEmail && email === 'user@example.com' && password === 'password') {
          const studentInfo = { id: 1, name: 'John', lastname: 'Doe' }; // Example user data
          console.log('Logging in with user data:', studentInfo); // Add this line for debugging
          setLoggedIn(true);
          setStudent(studentInfo);
      
          // Save session information in cookies if "Keep me logged in" is checked
          if (keepLoggedIn) {
            Cookies.set('loggedIn', 'true', { expires: 7 }); // Store the session for 7 days
            Cookies.set('studentInfo', JSON.stringify(studentInfo), { expires: 7 });
          }
      
          setShowLoginPopup(false);
        } else {
          alert('Invalid email or password');
        }
      };
  
    const handleLogout = () => {
      // Clear cookies and log out the user
      Cookies.remove('loggedIn');
      Cookies.remove('studentInfo');
  
      setLoggedIn(false);
      setStudent(null);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      setIsValidEmail(true); // Reset email validation status
    };
  
    const handleEmailBlur = () => {
      // Validate the email on blur
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      setIsValidEmail(emailPattern.test(email));
    };
  
    const handleClosePopup = () => {
      // Clear input fields and reset validation states
      setEmail('');
      setPassword('');
      setIsValidEmail(true);
      setShowLoginPopup(false);
    };
  
    return (
      <div className="login-bar login-right global-shadow">
        {!loggedIn ? (
          <>
            <div className="login-right login-bar-text">
              <p>Not logged in</p>
              <button onClick={() => setShowLoginPopup(true)}>Log in</button>
            </div>
          </>
        ) : (
          <div className="login-right login-bar-text">
            {student ? (
              <p>Logged as {student.id}, {student.name}, {student.lastname}</p>
            ) : (
              <p>Logged in</p>
            )}
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
        {showLoginPopup && (
          <div className="login-popup-overlay">
            <div className="login-popup">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <h2>Login</h2>
              <div className="login-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={isValidEmail ? '' : 'invalid-email'} // Apply 'invalid-email' class for invalid emails
                />
                {!isValidEmail && <p className="error-message">Invalid email</p>}
              </div>
              <div className="login-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-input">
                <label htmlFor="keepLoggedIn">Keep me logged in</label>
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                />
              </div>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        )}
      </div>
    );
  }