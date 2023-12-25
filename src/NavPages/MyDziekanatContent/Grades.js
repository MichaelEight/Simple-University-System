import React, { useEffect, useState } from 'react';
import '../MyIndexContent/GradesModal.css';
import '../MyIndexContent/GradesDatatable.css';

export default function ContentGrades({user}) {
  const [gradesData, setGradesData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);
  const [subjectsDetails, setSubjectsDetails] = useState({});
  const [teachersDetails, setTeachersDetails] = useState({});
  const [targetStudentIdInput, setTargetStudentIdInput] = useState('');
  const [tryToDisplay, setTryToDisplay] = useState(false);

  const loadGradesDataForStudent = async () => {
    // Validation for student ID
    if(targetStudentIdInput.length !== 6 || isNaN(targetStudentIdInput)) {
      alert("Please enter a valid student ID (6 digits).");
      return;
    }

    setTryToDisplay(true);
    setDataLoaded(false);
    setErrorWhileLoadingData(false);

    try {
      const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getGradesDziekanat.php?token=${user.token}&studentid=${targetStudentIdInput}`);

      if (response.ok) {
        const grades = await response.json();
        setGradesData(grades);

        // Extract unique subject and teacher IDs
        const subjectIds = [...new Set(grades.map(grade => grade.subject_id))];
        const teacherIds = [...new Set(grades.map(grade => grade.posted_by_id))];

        try {
            const subjectsResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getSubjects.php?subjectIds=${subjectIds.join(',')}`);
            const subjectsData = await subjectsResponse.json();
            const subjectsMap = subjectsData.reduce((map, subject) => {
                map[subject.subject_id] = subject;
                return map;
            }, {});
            setSubjectsDetails(subjectsMap);

            const teachersResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getTeachers.php?teacherIds=${teacherIds.join(',')}`);
            const teachersData = await teachersResponse.json();
            const teachersMap = teachersData.reduce((map, teacher) => {
                map[teacher.id] = `${teacher.title} ${teacher.first_name} ${teacher.last_name}`;
                return map;
            }, {});
            setTeachersDetails(teachersMap);

            setDataLoaded(true);
        } catch (error) {
            console.error('Error in fetching additional details:', error);
            setErrorWhileLoadingData(true);
        }
        
      } else {
        console.error('Error while trying to fetch grades');
        setErrorWhileLoadingData(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorWhileLoadingData(true);
    }
};

    return (
      <main>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
          <p>Wpisz indeks studenta</p>
          <input 
            type="text" 
            value={targetStudentIdInput}
            onChange={(e) => setTargetStudentIdInput(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "200px", borderRadius: "5px", border: "1px solid #ccc", textAlign:"center" }}
          />
          <button onClick={loadGradesDataForStudent} style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Załaduj oceny studenta
          </button>
        </div>

        {tryToDisplay && dataLoaded && (
        <div>
          <table className="grades-data-table">
            <thead>
              <tr>
                <th>Kod Przedmiotu</th>
                <th>Nazwa Przedmiotu</th>
                <th>Prowadzący</th>
                <th>Ocena</th>
                <th>ECTS</th>
                <th>Stan</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map((item, index) => (
                <tr key={index} className='rows-colors'>
                  <td>{subjectsDetails[item.subject_id]?.subject_code} ({item.type})</td>
                  <td>{subjectsDetails[item.subject_id]?.subject_name}</td>
                  <td>{teachersDetails[item.posted_by_id]}</td>
                  <td>{item.grade}</td>
                  <td>{subjectsDetails[item.subject_id]?.ects}</td>
                  <td>
                    {item.acceptance_state === 'not_accepted' ? (
                      <span>Nie zaakceptowano!</span>
                    ) : item.acceptance_state === 'accepted' ? (
                      <span>Zaakceptowano!</span>
                    ) : item.acceptance_state === 'challenged' ? (
                      <span>Zareklamowano!</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        {!dataLoaded && errorWhileLoadingData && tryToDisplay && <p>Database error! Failed to load data!</p>}
        {!dataLoaded && !errorWhileLoadingData && tryToDisplay && <p>Loading Data...</p>}
      </main>
    );
  }