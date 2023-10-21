import Header from './GeneralElements/Header.js'
import Navbar from './GeneralElements/Navbar.js'
import Main from './GeneralElements/Main.js'
import Footer from './GeneralElements/Footer.js'
import LoginBar from './GeneralElements/Loginbar.js'
import './App.css';
import React, { useState, useEffect } from 'react';
import DBTest from './dbTest.js';
import DBTest2 from './dbTest2.js';

function App() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavItemChange = (index) => {
    setSelectedItem(index);
  };
  
  const handleLoginStatusChange = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  return (
    <div className="App">
      <LoginBar onLoginStatusChange={handleLoginStatusChange}/>
      <Header />
      <Navbar selectedItem={selectedItem} onNavItemChange={handleNavItemChange} isLoggedIn={isLoggedIn} />
      <Main selectedItem={selectedItem} />
      <Footer />
      <DBTest2 />
    </div>
  );
}

export default App;