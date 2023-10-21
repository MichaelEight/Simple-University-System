import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../GlobalStyles.css';
import '../NavPagesStyles/AdminPanel.css';

export default function AdminPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // You can handle form submission logic here, such as making an API request.
  
      // For demonstration purposes, we'll log the email and password to the console.
      console.log('Email:', email);
      console.log('Password:', password);

      try {
        const [user_id, domain] = email.split('@');

        const response = await fetch(`http://simpleuniversitysystem.000webhostapp.com/api/createPasswordForUser.php?user_id=${user_id}&domain=${domain}&password=${password}`);
    
        if (response.ok) {
            const answer = await response.json();
            console.log(answer.message);
          
        } else {
          console.error('Failed to set password');
        }
      } catch (error) {
        console.error('Error when setting password:', error);
      }
    };
  
    return (
      <div>
        <p>Some text</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            </label>
          </div>
          <div>
            <label>Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }