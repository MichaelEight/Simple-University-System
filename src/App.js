import Header from './GeneralElements/Header.js'
import Navbar from './GeneralElements/Navbar.js'
import Main from './GeneralElements/Main.js'
import Footer from './GeneralElements/Footer.js'
import LoginBar from './GeneralElements/Loginbar.js'
import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleNavItemChange = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className="App">
      <LoginBar />
      <Header />
      <Navbar selectedItem={selectedItem} onNavItemChange={handleNavItemChange}/>
      <Main selectedItem={selectedItem}/>
      <Footer />
    </div>
  );
}

export default App;
