import Header from './GeneralElements/Header.js'
import Navbar from './GeneralElements/Navbar.js'
import Main from './GeneralElements/Main.js'
import Footer from './GeneralElements/Footer.js'
import LoginBar from './GeneralElements/Loginbar.js'
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [selectedItem, setSelectedItem] = useState(0);

  const handleNavItemChange = (index) => {
    setSelectedItem(index);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    // Update the URL with your server's URL
    axios.get('http://localhost:3001/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <LoginBar />
      <Header />
      <Navbar selectedItem={selectedItem} onNavItemChange={handleNavItemChange} />
      <Main selectedItem={selectedItem} />
      <Footer />

      <div>
        <h1>Data from Database</h1>
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;