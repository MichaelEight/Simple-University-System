import React, { useEffect, useState } from 'react';

export default function ContentGrades({user}) {
  const [gradesData, setGradesData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorWhileLoadingData, setErrorWhileLoadingData] = useState(false);
  const [subjectsDetails, setSubjectsDetails] = useState({});
  const [teachersDetails, setTeachersDetails] = useState({});

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
  
  

    return (
      <main>
        {dataLoaded ? (
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
              {gradesData.map((item, index) => (
                <tr key={index} className='rows-colors'>
                  <td>{subjectsDetails[item.subject_id]?.subject_name}</td>
                  <td>{subjectsDetails[item.subject_id]?.subject_code}</td>
                  <td>{teachersDetails[item.posted_by_id]}</td>
                  <td>{item.grade}</td>
                  <td>{subjectsDetails[item.subject_id]?.ects}</td>
                  <td>
                    {item.acceptance_state === 'not_accepted' ? (
                      <>
                        <button onClick={() => handleAcceptGrade(item.grade_id)}>Zaakceptuj</button>
                        <button>Reklamuj</button>
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