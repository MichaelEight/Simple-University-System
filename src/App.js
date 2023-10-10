import Header from './WebsiteGeneralElements/Header.js'
import Navbar from './WebsiteGeneralElements/Navbar.js'
import Main from './WebsiteGeneralElements/Main.js'
import Footer from './WebsiteGeneralElements/Footer.js'
import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
