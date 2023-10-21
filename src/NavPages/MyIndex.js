import '../NavPagesStyles/Sidebar.css';
import '../NavPagesStyles/MyIndex.css';
import '../NavPagesStyles/MyProfile.css';
import '../NavPagesStyles/Stats.css';
import React, { useEffect, useState } from 'react';
import placeholderPic from '../Images/placeholderImage.jpeg';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentGrades({user}) {

  const gradeData = [
    {
      subjectCode: 'Math101',
      subjectName: 'Mathematics',
      instructorName: 'John Doe',
      grade: '5.0',
      ects: 6,
      status: 'NoNote',
    },
    {
      subjectCode: 'Sci202',
      subjectName: 'Science',
      instructorName: 'Jane Smith',
      grade: '4.0',
      ects: 5,
      status: 'Proposed',
    },
    {
      subjectCode: 'Hist303',
      subjectName: 'History',
      instructorName: 'Mike Johnson',
      grade: '3.0',
      ects: 4,
      status: 'Accepted',
    },
    // Add more data objects as needed
  ];

  return (
    <main>
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Kod Przedmiotu</th>
              <th>Nazwa Przedmiotu</th>
              <th>Prowadzący</th>
              <th>Ocena</th>
              <th>ECTS</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {gradeData.map((item, index) => (
              <tr key={index} className='rows-colors'>
                <td>{item.subjectCode}</td>
                <td>{item.subjectName}</td>
                <td>{item.instructorName}</td>
                <td>{item.grade}</td>
                <td>{item.ects}</td>
                <td>
                  <button>Zaakceptuj</button>
                  <button>Reklamuj</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function ContentStats({user}) {
  // Placeholder data for the student's stats
  const studentStats = {
    name: 'John Doe',
    grades: [85, 92, 78, 96, 89],
    totalStudents: 50, // Total number of students
  };

  // Calculate the student's position and percentile
  const position = 5; // Student's rank
  const percentile = ((studentStats.totalStudents - position) / studentStats.totalStudents) * 100;

  return (
    <main>
      <div className="content-stats">
        <h2>{studentStats.name}'s Statistics</h2>
        <div className="grade-summary">
          <p>Your grades:</p>
          <ul>
            {studentStats.grades.map((grade, index) => (
              <li key={index}>Exam {index + 1}: {grade}</li>
            ))}
          </ul>
        </div>
        <div className="position-percentile">
          <p>You are in the top {position} students based on grades.</p>
          <p>Your grades are better than {percentile.toFixed(2)}% of other students.</p>
        </div>
      </div>
    </main>
  );
}

function ContentMyProfile({user}) {
  const [validToken, setValidToken] = useState(true);
  const [userData, setUserData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // Track whether data is loaded

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
          const response = await fetch(`http://simpleuniversitysystem.000webhostapp.com/api/validateToken.php?token=${user.token}`);
          if (response.ok) {
            const data = await response.json();
            if (data.valid) {
              setValidToken(true);

              const dataResponse = await fetch(`http://simpleuniversitysystem.000webhostapp.com/api/userProfileData.php?token=${user.token}`);
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
         <p>Loading Data...</p> :
          <p>INVALID TOKEN</p> )
      )}
    </main>
  );
}

// Define the labels for the options in the sidebar
const optionLabels = ["Oceny", "Statystyki", "Mój Profil"];

export default function MainPage({user}) {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentGrades user={user}/>,
    1: <ContentStats user={user}/>,
    2: <ContentMyProfile user={user}/>,
  };

  return (
    <CommonMainPage
      selectedContent={selectedContent}
      onSelectedContentChange={handleSelectedContentChange}
      contentComponents={contentComponents}
      optionLabels={optionLabels} // Pass the option labels
    />
  );
}
