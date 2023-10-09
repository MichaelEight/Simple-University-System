import Header from './WebsiteGeneralElements/Header.js'
import Navbar from './WebsiteGeneralElements/Navbar.js'
import React, { useState } from 'react';
import './App.css';

function MainContent() {
  return (
    <main>
      {/* Main content goes here */}
      <h1>Main Content goes here</h1>
    </main>
  );
}

function Sidebar() {
  return (
    <aside>
      {/* Sidebar content goes here */}
      <p>Sidebar Content</p>
      <p>Option 1</p>
      <p>Option 2</p>
      <p>Option 3</p>
    </aside>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <div className="container">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;
