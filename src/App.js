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

  const handleNavItemChange = (index) => {
    setSelectedItem(index);
  };
  
  const handleLoginStatusChange = (loginStatus) => {
    setIsLoggedIn(loginStatus);
    console.log("User logged in: ", loginStatus);
  };

  return (
    <div className="App">
      <LoginBar onLoginStatusChange={handleLoginStatusChange}/>
      <Header />
      <Navbar selectedItem={selectedItem} onNavItemChange={handleNavItemChange} isLoggedIn={isLoggedIn} />
      <Main selectedItem={selectedItem} />
      <Footer />
    </div>
  );
}

export default App;