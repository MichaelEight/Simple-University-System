import React, { useEffect, useState } from 'react';
import '../../NavPagesStyles/MyProfile.css';
import placeholderPic from '../../Images/placeholderImage.jpeg';
import axios from "axios";

export default function ContentMyProfile({user}) {
    const [validToken, setValidToken] = useState(true);
    const [userData, setUserData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded
    const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);

    useEffect(() => {
      const loadUserData = async () => {
        try {
          // Check if there is cached data in localStorage
          const cachedData = localStorage.getItem('userProfileData');
          const cachedTimestamp = localStorage.getItem('userProfileDataTimestamp');
          const currentTimestamp = new Date().getTime();
  
          // If cached data exists and is less than 30 seconds old, use it
          if (cachedData && cachedTimestamp && currentTimestamp - cachedTimestamp < 30000) {
            setUserData(JSON.parse(cachedData));
            setDataLoaded(true);
            console.log("Data loaded from local storage!");
          } else {
            const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/validateToken.php?token=${user.token}`);
            if (response.ok) {
              const data = await response.json();
              if (data.valid) {
                setValidToken(true);
  
                try{
                  const res = await axios.get("https://api.ipify.org/?format=json").catch(() => ({ data: { ip: "0" } }));
                  let action = "getuserprofile";
                  const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&token=${user.token}`);
                }catch(error){
              }

                const dataResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/userProfileData.php?token=${user.token}`);
                if (dataResponse.ok) {
                  const userDataFromDB = await dataResponse.json();
                  setUserData(userDataFromDB);
                  setDataLoaded(true);
                  console.log("Data downloaded successfully!");
  
                  // Cache the data in localStorage
                  localStorage.setItem('userProfileData', JSON.stringify(userDataFromDB));
                  localStorage.setItem('userProfileDataTimestamp', currentTimestamp.toString());
                } else {
                  console.log("User data download failed!");
                  setErrorWhileLoadingData(true);
                }
              } else {
                setValidToken(false);
              }
            } else {
              console.error('Error when validating the token');
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      if (user) {
        loadUserData();
      }
    }, [user]);
  
    return (
      <main>
        {validToken && dataLoaded ?
        <div className='style-separator'>
          <div className="profile-container">
            <div className="profile-picture">
              <img src={placeholderPic} alt="Profile" />
            </div>
  
            <div className='profile-section'>
              <div className="personal-info">
                <h2>Informacje Osobiste</h2>
                <p><span className="label">Imię i nazwisko:</span> {userData.first_name} {userData.last_name}</p>
                <p><span className="label">Data Urodzenia:</span> {userData.date_of_birth}</p>
              </div>
            </div>
  
            <div className="profile-section">
              <h2>Informacje Studenckie</h2>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Number Indeksu</td>
                    <td>{userData.id}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userData.id + "@student.mak.pl"}</td>
                  </tr>
                  <tr>
                    <td>Kierunek</td>
                    <td>{userData.major}</td>
                  </tr>
                  <tr>
                    <td>Stopień Studiów</td>
                    <td>{userData.degree}</td>
                  </tr>
                  <tr>
                    <td>Tryb Studiów</td>
                    <td>{userData.study_mode}</td>
                  </tr>
                  <tr>
                    <td>Obecny Semestr</td>
                    <td>{userData.current_semester}</td>
                  </tr>
                  <tr>
                    <td>Uzyskane ECTS</td>
                    <td>{userData.ECTS_gained}</td>
                  </tr>
                  <tr>
                    <td>Deficyt ECTS</td>
                    <td>{userData.ECTS_missing}</td>
                  </tr>
                  <tr>
                    <td>Początek Studiów</td>
                    <td>{userData.date_of_start}</td>
                  </tr>
                  <tr>
                    <td>Przewidywane Ukończenie Studiów</td>
                    <td>{userData.date_of_graduation}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="profile-section">
              <h2>Informacje Dodatkowe</h2>
              <table className="info-table">
                <tbody>
                  <tr>
                    <td>Kluby</td>
                    <td>{userData.clubs}</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
        : ((validToken ?
          (errorWhileLoadingData ? <p>Database error! Failed to load data!</p> : <p>Loading Data...</p>) :
           <p>INVALID TOKEN</p> )
        )}
      </main>
    );
  }