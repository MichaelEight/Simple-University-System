import Header from './WebsiteGeneralElements/Header.js'
import Navbar from './WebsiteGeneralElements/Navbar.js'
import MainPage from './WebsiteGeneralElements/MainPage.js'
import Footer from './WebsiteGeneralElements/Footer.js'
import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
