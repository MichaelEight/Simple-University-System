import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import RandomFunc from './ExampleFunc.js'

function DisplayText()
{
  return(
    <p>Some Text</p>
  );
}

function NewTemplate() {
  return (
    <div>
      {/* Your new template content */}
      <h2>New Template</h2>
      <p>This is the new content you want to display.</p>
    </div>
  );
}

function OldTemplate(){
  return(
    <p>Old Template</p>
  );
}

function Template1() {
  // Bool variable with "get" and "set" functions, set value to "false"
  const [showNewTemplate, setShowNewTemplate] = useState(false);

  // Function that inverts bool variable 
  const toggleTemplate = () => {
    setShowNewTemplate(!showNewTemplate);
  };

  return (
    <div>
      <h1>My React Site</h1>
      <button onClick={toggleTemplate}>Toggle Template</button>
      {showNewTemplate ? <NewTemplate /> : <OldTemplate />}
    </div>
  );
}

function App() {
  const inputStyle = {
    fontSize: '69px',
    // You can add other CSS properties here if needed
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <i>Great</i> things will appear here... hopefully!🥵
        </p>
        {/* <DisplayText />
        <RandomFunc /> */}
        <input type="text" style={inputStyle} placeholder="Type something here" />
        <Template1 />
      </header>
    </div>
  );
}

export default App;
