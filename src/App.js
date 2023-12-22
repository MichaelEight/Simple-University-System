import Header from './GeneralElements/Header.js'
import Navbar from './GeneralElements/Navbar.js'
import Main from './GeneralElements/Main.js'
import Footer from './GeneralElements/Footer.js'
import LoginBar from './GeneralElements/Loginbar.js'
import './App.css';
import React, { useState } from 'react';

function App() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    
    if(theme == 'light')
      document.body.classList.add('light-theme');
    else
      document.body.classList.remove('light-theme');

  };  

  const handleNavItemChange = (index) => {
    setSelectedItem(index);
  };
  
  const handleLoginStatusChange = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  return (
    <div className="App">
      <LoginBar onLoginStatusChange={handleLoginStatusChange} user={userData} setUser={setUserData} handleToggleTheme={toggleTheme} theme={theme}/>
      <Header />
      <Navbar selectedItem={selectedItem} onNavItemChange={handleNavItemChange} isLoggedIn={isLoggedIn} user={userData} theme={theme}/>
      <Main selectedItem={selectedItem} user={userData} theme={theme}/>
      <Footer theme={theme}/>
    </div>
  );
}

export default App;