import React, { useEffect, useState } from 'react';
import './GradesModal.css';
import './GradesDatatable.css';
import axios from "axios";

export default function ContentGrades({user}) {
  const [gradesData, setGradesData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);
  const [subjectsDetails, setSubjectsDetails] = useState({});
  const [teachersDetails, setTeachersDetails] = useState({});
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('2.0');
  const [currentGradeId, setCurrentGradeId] = useState(null);

  useEffect(() => {
    const loadGradesData = async () => {
        const cachedData = localStorage.getItem('userGradesData');
        const cachedDataTeachers = localStorage.getItem('userGradesDataTeachers');
        const cachedDataSubjects = localStorage.getItem('userGradesDataSubjects');
        const cachedTimestamp = localStorage.getItem('userGradesDataTimestamp');
        const currentTimestamp = new Date().getTime();

        if (cachedData && cachedDataTeachers && cachedDataSubjects && cachedTimestamp && currentTimestamp - cachedTimestamp < 30000) { // 30 seconds cache
            setGradesData(JSON.parse(cachedData));
            setSubjectsDetails(JSON.parse(cachedDataSubjects));
            setTeachersDetails(JSON.parse(cachedDataTeachers));
            setDataLoaded(true);
        } else {
          try{
            try{
              const res = await axios.get("https://api.ipify.org/?format=json");
              let action = "getgrades";
              const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&token=${user.token}`);
            }catch(error){
          }

            const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getGrades.php?token=${user.token}`);

            if (response.ok) {
              const grades = await response.json();
              setGradesData(grades);

              // Extract unique subject and teacher IDs
              const subjectIds = [...new Set(grades.map(grade => grade.subject_id))];
              const teacherIds = [...new Set(grades.map(grade => grade.posted_by_id))];

              Promise.all([
                fetchSubjectDetails(subjectIds),
                fetchTeacherDetails(teacherIds)
              ]).then(() => {
                setDataLoaded(true);
              }).catch(error => {
                console.error('Error in fetching additional details:', error);
                setErrorWhileLoadingData(true);
              });
              
            } else {
              console.error('Error while trying to fetch grades');
            }
          }catch(error) {
            console.error('Error:', error);
            setErrorWhileLoadingData(true);
          }
        };
  }

  if (user) {
    loadGradesData();
  }
}, [user]);


  const fetchSubjectDetails = async (subjectIds) => {
    try {
        const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getSubjects.php?subjectIds=${subjectIds.join(',')}`);
        if (response.ok) {
            const subjects = await response.json();
            // Convert array to object for easy access
            const subjectsMap = subjects.reduce((map, subject) => {
                map[subject.subject_id] = subject;
                return map;
            }, {});
            setSubjectsDetails(subjectsMap);
        } else {
          console.error('Error while trying to fetch subjects');
        }
    } catch (error) {
        console.error('Error fetching subjects:', error);
    }
  };

  const fetchTeacherDetails = async (teacherIds) => {
    try {
      const response = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/getTeachers.php?teacherIds=${teacherIds.join(',')}`);
      if (response.ok) {
          const teachers = await response.json();
          // Convert array to object for easy access
          const teachersMap = teachers.reduce((map, teacher) => {
              map[teacher.id] = `${teacher.title} ${teacher.first_name} ${teacher.last_name}`;
              return map;
          }, {});
          setTeachersDetails(teachersMap);
      } else {
        console.error('Error while trying to fetch teachers');
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleAcceptGrade = async (gradeId) => {
    try {
      try{
        const res = await axios.get("https://api.ipify.org/?format=json");
        let action = "acceptgrade";
        let jsonObject = {
          gradeId: gradeId,
        };
        const argsParam = encodeURIComponent(JSON.stringify(jsonObject));
        const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&args=${argsParam}&token=${user.token}`);
      }catch(error){
      }

      const url = `https://simpleuniversitysystem.000webhostapp.com/api/acceptGrade.php?gradeId=${gradeId}&token=${encodeURIComponent(user.token)}`;
      const response = await fetch(url);
  
      if (response.ok) {
        // Update the local state to reflect the change
        const updatedGrades = gradesData.map(grade => {
          if (grade.grade_id === gradeId) {
            return { ...grade, acceptance_state: 'accepted' };
          }
          return grade;
        });
        setGradesData(updatedGrades);
      } else {
        console.error('Error while trying to accept grade');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleChallengeClick = (gradeId) => {
    setCurrentGradeId(gradeId);
    setShowChallengeModal(true);
  };

  const handleConfirmChallenge = async () => {
    try {
      try{
        const res = await axios.get("https://api.ipify.org/?format=json");
        let action = "challengegrade";
        let jsonObject = {
          currentGradeId: currentGradeId,
          selectedGrade: selectedGrade
        };
        const argsParam = encodeURIComponent(JSON.stringify(jsonObject));
        const lgcall = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/log.php?ip=${res.data.ip}&action=${action}&args=${argsParam}&token=${user.token}`);
      }catch(error){
      }

      const url = `https://simpleuniversitysystem.000webhostapp.com/api/challengeGrade.php?gradeId=${currentGradeId}&challengedGrade=${encodeURIComponent(selectedGrade)}&token=${encodeURIComponent(user.token)}`;
      const response = await fetch(url);
  
      if (response.ok) {
        // Update the local state to reflect the change
        const updatedGrades = gradesData.map(grade => {
          if (grade.grade_id === currentGradeId) {
            return { ...grade, acceptance_state: 'challenged', challenged_grade: selectedGrade };
          }
          return grade;
        });
        setGradesData(updatedGrades);
      } else {
        console.error('Error while trying to challenge grade');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    // Close the modal
    setShowChallengeModal(false);
  };
  
    return (
      <main>
        {dataLoaded ? (
        <div>
          {showChallengeModal && (
            <div>
              <div className="modal-backdrop" onClick={() => setShowChallengeModal(false)}></div>
              <div className="modal">
                <p className="modal-content">Wybierz sugerowaną ocenę</p>
                <select className="modal-select" value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                  <option value="2.0">2.0</option>
                  <option value="3.0">3.0</option>
                  <option value="3.5">3.5</option>
                  <option value="4.0">4.0</option>
                  <option value="4.5">4.5</option>
                  <option value="5.0">5.0</option>
                  <option value="5.5">5.5</option>
                </select>
                <div className="modal-buttons-container">
                  <button className="modal-button" style={{marginRight:'10px'}} onClick={handleConfirmChallenge}>Zatwierdź</button>
                  <button className="modal-button cancel" onClick={() => setShowChallengeModal(false)}>Anuluj</button>
                </div>
              </div>
            </div>
          )}


          <table className="grades-data-table">
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
              {gradesData.map((item, index) => (
                <tr key={index} className='rows-colors'>
                  <td>{subjectsDetails[item.subject_id]?.subject_code} ({item.type})</td>
                  <td>{subjectsDetails[item.subject_id]?.subject_name}</td>
                  <td>{teachersDetails[item.posted_by_id]}</td>
                  <td>{item.grade}</td>
                  <td>{subjectsDetails[item.subject_id]?.ects}</td>
                  <td>
                    {item.acceptance_state === 'not_accepted' ? (
                      <>
                        <button onClick={() => handleAcceptGrade(item.grade_id)}>Zaakceptuj</button>
                        <button onClick={() => handleChallengeClick(item.grade_id)}>Reklamuj</button>
                      </>
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
        ) : (errorWhileLoadingData ? <p>Database error! Failed to load data!</p> : <p>Loading Data...</p>)}
      </main>
    );
  }