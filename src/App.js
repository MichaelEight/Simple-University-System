// import logo from './logo.svg';
import logo from './Images/logoSUS.png';
import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Great things will appear here... hopefully!
        </p>
      </header>
    </div>
  );
}

export default App;
