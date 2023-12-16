import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library
import '../GeneralElementsStyles/Loginbar.css';
import '../GlobalStyles.css';

export default function LoginBar({onLoginStatusChange, user, setUser}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [keepLoggedIn, setKeepLoggedIn] = useState(true); // State for "Keep me logged in" checkbox
  
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const loginButtonRef = useRef(null);

    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          if (document.activeElement === emailInputRef.current) {
            // Email input is in focus, move focus to the password input
            passwordInputRef.current.focus();
          } else if (document.activeElement === passwordInputRef.current) {
            // Password input is in focus, apply the login button action
            loginButtonRef.current.click();
          }
        }
      };
  
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []); // Run this effect once on component mount

    useEffect(() => {
      // Check if the user is logged in using cookies
      const isLoggedInCookies = Cookies.get('loggedIn') === 'true';
    
      // Check local storage for login
      const localLoggedIn = localStorage.getItem('loggedIn') === 'true';

      var userInfo;

      if (isLoggedInCookies) {
        // Retrieve user information from cookies and set the session
        userInfo = JSON.parse(Cookies.get('userInfo'));
      } else if (localLoggedIn) {
        // Retrieve user information from local storage and set the session
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
      }
      else
      {
        userInfo = null;
      }

      if (userInfo) {
        // Validate the token
        const validateToken = async () => {
          const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/validateToken.php?token=${userInfo.token}`);
  
          if (response.ok) {
            const data = await response.json();
  
            if (data.valid) {
              // Token is valid, continue the session
              setUser(userInfo);
              setLoggedIn(true);
              onLoginStatusChange(true);
              console.log("Authentication successful!");
            } else {
              // Token is invalid or expired, perform logout
              console.log("Authentication failed!");
              handleLogout();
            }
          } else {
            console.error('Error when validating the token');
          }
        };
  
        validateToken();
      }
    }, []); // Run this effect once on component mount

    useEffect(() => {
      // Add event listener for the Escape key
      const handleEscapeKeyPress = (event) => {
        if (event.key === 'Escape' && showLoginPopup) {
          handleClosePopup();
        }
      };
  
      document.addEventListener('keydown', handleEscapeKeyPress);
  
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener('keydown', handleEscapeKeyPress);
      };
    }, [showLoginPopup]);
  
    const handleLogin = async () => {
      // Check if the email is valid
      const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    
      if (isValidEmail) {
        const [user_id, domain] = email.split('@');

        // Make an API call to the PHP backend with a GET request
        const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/login.php?user_id=${user_id}&domain=${domain}&password=${password}`);
    
        if (response.ok) {
          const data = await response.json();
    
          if (data.message === 'Login successful') {
            const userInfo = { id: data.id, name: data.first_name, lastname: data.last_name, token: data.token, role: data.role };
    
            setLoggedIn(true);
            onLoginStatusChange(true);
            setUser(userInfo);
    
            // Save session information in cookies if "Keep me logged in" is checked
            if (keepLoggedIn) {
              Cookies.set('loggedIn', 'true', { expires: 7 }); // Store the session for 7 days
              Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 7 });
            }
            
            // Store the data locally for 1 hour using localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
          
            // Set a timeout to clear the data after 1 hour
            setTimeout(() => {
              localStorage.removeItem('loggedIn');
              localStorage.removeItem('userInfo');
            }, 3600000); // 1 hour in milliseconds
    
            setShowLoginPopup(false);
          } else {
            alert('Invalid email or password');
          }
        } else {
          alert('Login failed');
        }
      } else {
        alert('Invalid email format');
      }
    };
  
    const handleLogout = async () => {
      try {
        // Check if the user is logged in using cookies
        const isLoggedInCookies = Cookies.get('loggedIn') === 'true';
      
        // Check local storage for login
        const localLoggedIn = localStorage.getItem('loggedIn') === 'true';

        var userInfo;

        if (isLoggedInCookies) {
          // Retrieve user information from cookies and set the session
          userInfo = JSON.parse(Cookies.get('userInfo'));
        } else if (localLoggedIn) {
          // Retrieve user information from local storage and set the session
          userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        else
        {
          userInfo = null;
        }

        console.log(userInfo);
        console.log(userInfo.token);

        const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/logout.php?token=${userInfo.token}`);
    
        if (response.ok) {
          console.log('Token removed from the database');
        } else {
          console.error('Failed to remove the token from the database');
        }
      } catch (error) {
        console.error('Error when removing the token:', error);
      }

      // Clear cookies and log out the user
      Cookies.remove('loggedIn');
      Cookies.remove('userInfo');

      // Clear local storage
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userInfo');

      // Remove cached data from localStorage
      localStorage.removeItem('userProfileData');
      localStorage.removeItem('userProfileDataTimestamp');
  
      setLoggedIn(false);
      onLoginStatusChange(false);
      setUser(null);

      window.location.reload(); // Force refresh
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
      setKeepLoggedIn(false);
    };
  
    return (
      <div className="login-bar login-right global-shadow">
        {!loggedIn ? (
          <>
            <div className="login-right login-bar-text">
              <p>Niezalogowany</p>
              <button onClick={() => setShowLoginPopup(true)}>Zaloguj</button>
            </div>
          </>
        ) : (
          <div className="login-right login-bar-text">
            {user ? (
              <p>{user.name} {user.lastname} ({user.id})</p>
            ) : (
              <p>Zalogowany</p>
            )}
            <button onClick={handleLogout}>Wyloguj</button>
          </div>
        )}
        {showLoginPopup && (
          <div className="login-popup-overlay">
            <div className="login-popup">
              <span className="close" onClick={handleClosePopup}>
                &times;
              </span>
              <h2>Logowanie</h2>
              <div className="login-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  ref={emailInputRef}
                  placeholder="Wprowadź email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={isValidEmail ? '' : 'invalid-email'} // Apply 'invalid-email' class for invalid emails
                />
                {!isValidEmail && <p className="error-message">Niepoprawny email!</p>}
              </div>
              <div className="login-input">
                <label htmlFor="password">Hasło</label>
                <input
                  type="password"
                  id="password"
                  ref={passwordInputRef}
                  placeholder="Wprowadź hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-input">
                <label className="keep-logged-in-label" htmlFor="keepLoggedIn">
                    Nie wylogowuj mnie
                    <input
                    className='keep-logged-in-checkbox'
                    type="checkbox"
                    id="keepLoggedIn"
                    checked={keepLoggedIn}
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                    />
                </label>
                </div>
              <button
                className='popup-login-button'
                ref={loginButtonRef}
                onClick={handleLogin}
                >Zaloguj</button>
            </div>
          </div>
        )}
      </div>
    );
  }