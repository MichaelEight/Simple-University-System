import React, { useState } from 'react';
import '../GeneralElementsStyles/Loginbar.css';
import '../GlobalStyles.css';

export default function LoginBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [student, setStudent] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(true);
  
    const handleLogin = () => {
      // Simulate login logic here
      if (isValidEmail && email === 'user@example.com' && password === 'password') {
        setLoggedIn(true);
        setStudent({ id: 1, name: 'John', lastname: 'Doe' });
        setShowLoginPopup(false);
        // You should set a session token or cookie here
      } else {
        alert('Invalid email or password');
      }
    };
  
    const handleLogout = () => {
      // Simulate logout logic here
      setLoggedIn(false);
      setStudent(null);
      // You should clear the session token or cookie here
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
              <p>Logged as {student.id}, {student.name}, {student.lastname}</p>
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
                <button onClick={handleLogin}>Login</button>
              </div>
            </div>
          )}
        </div>
      );
}