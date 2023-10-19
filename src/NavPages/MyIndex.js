import '../NavPagesStyles/Sidebar.css';
import '../NavPagesStyles/MyIndex.css';
import '../NavPagesStyles/MyProfile.css';
import React, { useState } from 'react';
import placeholderPic from '../Images/placeholderImage.jpeg';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentGrades() {

  // const [user, setUser] = useState(null);

  // // Function to send a login request
  // const login = async (email, password) => {
  //   try {
  //     const response = await axios.get(`http://simpleuniversitysystem.000webhostapp.com/api.php?action=login&email=${email}&password=${password}`);
  //     setUser(response.data.user); // Assuming the response includes user data
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [gradeData, setGradeData] = useState([]);

  // useEffect(() => {
  //   // Function to fetch data
  //   const fetchData = () => {
  //     axios.get('/api/grades') // Replace with your actual API endpoint
  //       .then(response => {
  //         setGradeData(response.data);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //       });
  //   };

  //   // Initial fetch
  //   fetchData();

  //   // Set up a periodic fetch every 15 seconds
  //   const refreshInterval = setInterval(() => {
  //     fetchData();
  //   }, 15000);

  //   // Cleanup the interval when the component unmounts
  //   return () => {
  //     clearInterval(refreshInterval);
  //   };
  // }, []);

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
            </tr>
          </thead>
          <tbody>
            {gradeData.map((item, index) => (
              <tr key={index}>
                <td>{item.subjectCode}</td>
                <td>{item.subjectName}</td>
                <td>{item.instructorName}</td>
                <td>{item.grade}</td>
                <td>{item.ects}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function ContentStats() {
  return (
    <main>
      <div>
        <p>Placeholder Stats</p>
      </div>
    </main>
  );
}

function ContentMyProfile() {
  const personalInfo = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '01/01/1990',
  };

  const studentInfo = {
    indexNumber: '12345',
    major: 'Computer Science',
    gradeLevel: 'Senior',
    email: 'john.doe@email.com',
  };

  const additionalInfo = {
    GPA: '3.7',
    AcademicAdvisor: 'Dr. Smith',
    EnrollmentStatus: 'Full-time',
    GraduationDate: 'May 2023',
    Clubs: 'Computer Science Club, Chess Club',
  };

  return (
    <main>
      <div className='style-separator'>
        <div className="profile-container">
          <div className="profile-picture">
            <img src={placeholderPic} alt="Profile" />
          </div>

          <div className='profile-section'>
            <div className="personal-info">
              <h2>Personal Info</h2>
              <p><span className="label">Name:</span> {personalInfo.firstName} {personalInfo.lastName}</p>
              <p><span className="label">Date of Birth:</span> {personalInfo.dateOfBirth}</p>
            </div>
          </div>

          <div className="profile-section">
            <h2>Student Info</h2>
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Index Number</td>
                  <td>{studentInfo.indexNumber}</td>
                </tr>
                <tr>
                  <td>Major</td>
                  <td>{studentInfo.major}</td>
                </tr>
                <tr>
                  <td>Grade Level</td>
                  <td>{studentInfo.gradeLevel}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{studentInfo.email}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="profile-section">
            <h2>Additional Info</h2>
            <table className="info-table">
              <tbody>
                <tr>
                  <td>GPA</td>
                  <td>{additionalInfo.GPA}</td>
                </tr>
                <tr>
                  <td>Academic Advisor</td>
                  <td>{additionalInfo.AcademicAdvisor}</td>
                </tr>
                <tr>
                  <td>Enrollment Status</td>
                  <td>{additionalInfo.EnrollmentStatus}</td>
                </tr>
                <tr>
                  <td>Graduation Date</td>
                  <td>{additionalInfo.GraduationDate}</td>
                </tr>
                <tr>
                  <td>Clubs</td>
                  <td>{additionalInfo.Clubs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

// Define the labels for the options in the sidebar
const optionLabels = ["Oceny", "Statystyki", "Mój Profil"];

export default function MainPage() {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentGrades />,
    1: <ContentStats />,
    2: <ContentMyProfile />,
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
