import Header from './WebsiteGeneralElements/Header.js'
import Navbar from './WebsiteGeneralElements/Navbar.js'
import Main from './WebsiteGeneralElements/Main.js'
import Footer from './WebsiteGeneralElements/Footer.js'
import LoginBar from './WebsiteGeneralElements/Loginbar.js'
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
