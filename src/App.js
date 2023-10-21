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

  const handleNavItemChange = (index) => {
    setSelectedItem(index);
  };
  
  const handleLoginStatusChange = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  return (
    <div className="App">
      <LoginBar onLoginStatusChange={handleLoginStatusChange} user={userData} setUser={setUserData}/>
      <Header />
      <Navbar selectedItem={selectedItem} onNavItemChange={handleNavItemChange} isLoggedIn={isLoggedIn} user={userData} />
      <Main selectedItem={selectedItem} />
      <Footer />
    </div>
  );
}

export default App;