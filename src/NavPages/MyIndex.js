import '../NavPagesStyles/MyIndex.css';
import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentGrades() {

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
  return (
    <main>
      <div>
        <p>Placeholder My Profile</p>
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
