import React, { useState, useEffect } from 'react';
import './ListOfStudents.css';

export default function ContentListOfStudents({user}) {
    const [selectedSubject, setSelectedSubject] = useState("Wybierz przedmiot");
    const [selectedProgram, setSelectedProgram] = useState("Wybierz grupę kierunkową");
    const [selectedGroup, setSelectedGroup] = useState("Wybierz grupę");  
    const [subjects, setSubjects] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [groups, setGroups] = useState(["Wszyscy", "1", "2", "3"]);  
  
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldownActive, setCooldownActive] = useState(false);

    const [students, setStudents] = useState([]);

    // State to manage the state of column checkboxes in the top row
    const [columnCheckboxes, setColumnCheckboxes] = useState({
      W: false,
      Ć: false,
      L: false,
      P: false,
    });
  
    // Function to handle the click event for the checkboxes in the top row
    const handleTopRowCheckboxClick = (column) => {
      // Update the state of the clicked column checkbox
      setColumnCheckboxes((prevColumnCheckboxes) => ({
        ...prevColumnCheckboxes,
        [column]: !prevColumnCheckboxes[column],
      }));
  
      // Update the student checkboxes based on the clicked column
      const updatedStudents = students.map((student) => ({
        ...student,
        checkboxes: {
          ...student.checkboxes,
          [column]: !columnCheckboxes[column],
        },
      }));
  
      setStudents(updatedStudents);
    };
  
    // Render checkboxes for the top row with click handlers
    const renderTopRowCheckboxes = () => (
      <tr>
        <th>lp</th>
        <th>Imię</th>
        <th>Nazwisko</th>
        <th>Numer Indeksu</th>
        <th>Status</th>
        <th>Ocena</th>
        <th>Komentarz</th>
        <th>
          <input
            type="checkbox"
            id="W"
            checked={columnCheckboxes.W}
            onChange={() => handleTopRowCheckboxClick('W')}
          />
          <label htmlFor="W">W</label>
        </th>
        <th>
          <input
            type="checkbox"
            id="Ć"
            checked={columnCheckboxes.Ć}
            onChange={() => handleTopRowCheckboxClick('Ć')}
          />
          <label htmlFor="Ć">Ć</label>
        </th>
        <th>
          <input
            type="checkbox"
            id="L"
            checked={columnCheckboxes.L}
            onChange={() => handleTopRowCheckboxClick('L')}
          />
          <label htmlFor="L">L</label>
        </th>
        <th>
          <input
            type="checkbox"
            id="P"
            checked={columnCheckboxes.P}
            onChange={() => handleTopRowCheckboxClick('P')}
          />
          <label htmlFor="P">P</label>
        </th>
      </tr>
    );
    
  
    const handleGradeChange = (id, value) => {
      const updatedStudents = students.map(student => {
        if (student.id === id) {
          return { ...student, grade: value };
        }
        return student;
      });
      setStudents(updatedStudents);
    };
  
    const handleCheckboxChange = (id, key) => {
      const updatedStudents = students.map(student => {
        if (student.id === id) {
          return { ...student, checkboxes: { ...student.checkboxes, [key]: !student.checkboxes[key] } };
        }
        return student;
      });
      setStudents(updatedStudents);
    };
  
    const handleCommentsChange = (id, value) => {
      const updatedStudents = students.map((student) => {
        if (student.id === id) {
          return { ...student, comments: value };
        }
        return student;
      });
      setStudents(updatedStudents);
    };  

    const fetchDataForDropdowns = async () => {
      const teacherToken = user.token; // Assuming 'user.token' holds the teacher's token
    
      try {
        // Fetch subjects
        const subjectsResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/listOfStudentsGetSubjects.php?token=${teacherToken}`);
        if (subjectsResponse.ok) {
          const subjectsData = await subjectsResponse.json();
          setSubjects(subjectsData);
        } else {
          console.error("Error fetching subjects:", await subjectsResponse.text());
        }
    
        // Fetch majors
        const majorsResponse = await fetch(`https://simpleuniversitysystem.000webhostapp.com/api/listOfStudentsGetMajors.php`);
        if (majorsResponse.ok) {
          const majorsData = await majorsResponse.json();
          setPrograms(majorsData);
        } else {
          console.error("Error fetching majors:", await majorsResponse.text());
        }
    
        // Groups are predefined
        setGroups(['all', '1', '2', '3']);
    
      } catch (error) {
        console.error('Error fetching data for dropdowns:', error);
      }
    };
    
    useEffect(() => {
      fetchDataForDropdowns();
    }, []); // Call this function when the component mounts

    const isDefaultSelection = (selection) => {
      return selection.startsWith("Wybierz");
    };

    const canLoadList = !isDefaultSelection(selectedSubject) && !isDefaultSelection(selectedProgram) && !isDefaultSelection(selectedGroup);

    const handleLoadListClick = async () => {
      if (!canLoadList) return; // Early exit if any selection is default

      const teacherToken = user.token; // Assuming 'user.token' holds the teacher's token
      const apiUrl = `https://simpleuniversitysystem.000webhostapp.com/api/loadStudentsList.php`;

      try {
        const response = await fetch(`${apiUrl}?token=${teacherToken}&subject=${selectedSubject}&program=${selectedProgram}&group=${selectedGroup}`);

        if (response.ok) {
          const studentsData = await response.json();

          // Add additional properties to each student object
          const updatedStudentsData = studentsData.map(student => ({
            ...student,
            grade: '',
            comments: '',
            checkboxes: {
                W: false,
                Ć: false,
                L: false,
                P: false,
            }
          }));

          setStudents(updatedStudentsData);
        } else {
          console.error('Response not ok', response);
        }
      } catch (error) {
        console.error('Failed to fetch students list', error);
      }
    };

    const handleSubmitGrades = async () => {
      if (cooldownActive) return; // Prevents button spamming
    
      setCooldownActive(true); // Start cooldown
      setIsSubmitting(true); // Disable the button

      let successCount = 0;
      let errorCount = 0;

      const gradesToSubmit = students
          .filter(student => student.grade !== '' && (student.checkboxes.W || student.checkboxes.Ć || student.checkboxes.L || student.checkboxes.P))
          .flatMap(student => {
              const types = ['W', 'Ć', 'L', 'P'].filter(type => student.checkboxes[type]);
              return types.map(type => ({
                  student_id: student.id,
                  subject_id: subjects[selectedSubject].id,
                  type,
                  grade: student.grade,
                  description: student.comments
              }));
          });

      if (gradesToSubmit.length === 0) {
          console.log("No grades to submit");
          return;
      }
  
      const apiUrl = `https://simpleuniversitysystem.000webhostapp.com/api/submitMultipleGrades.php?teacher_id=${user.id}`;
  
      for (const grade of gradesToSubmit) {
          const queryParams = new URLSearchParams(grade);
          try {
              const response = await fetch(`${apiUrl}&${queryParams.toString()}`);
              if (response.ok) {
                successCount++;
                console.log("Pomyślnie wprowadzono ocenę!");
              }else{
                errorCount++;
                console.error("Failed to submit a grade", response);
              }
          } catch (error) {
              console.error("Error submitting a grade", error);
          }
      }
  
      // Determine the submission status and corresponding class
      if (successCount === gradesToSubmit.length) {
        setSubmissionStatus({ message: 'Pomyślnie wprowadzono wszystkie oceny', className: 'students-list-success-message' });
      } else if (successCount > 0) {
          setSubmissionStatus({ message: 'Pomyślnie wprowadzono część ocen', className: 'students-list-warning-message' });
      } else {
          setSubmissionStatus({ message: 'Nie udało się wprowadzić ocen', className: 'students-list-error-message' });
      }
      console.log("Finished submitting grades");

      setIsSubmitting(false); // Re-enable the button after processing
      // Set a timeout to re-enable the button after 10 seconds
      setTimeout(() => {
        setCooldownActive(false);
      }, 10000); // 10 seconds in milliseconds
  };

    return (
      <main>
          <div>
            <div className="select-container-studentslist">
              <div>
                <p>Wybierz przedmiot</p>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="Wybierz przedmiot">Wybierz przedmiot</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Wybierz grupę kierunkową</p>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  <option value="Wybierz grupę kierunkową">Wybierz grupę kierunkową</option>
                  {programs.map((program, index) => (
                    <option key={index} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p>Wybierz grupę</p>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <option value="Wybierz grupę">Wybierz grupę</option>
                  {groups.map((group, index) => (
                    <option key={index} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="button-spacing-studentslist">
              <button className="loadButton-studentslist" onClick={handleLoadListClick}>Załaduj listę</button>
            </div>
          </div>
          
          <div className="table-spacing-studentslist"></div>
  
          <table className="data-table-studentslist">
            <thead>
              {renderTopRowCheckboxes()}
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index + 1} className='rows-colors-studentslist'>
                  <td>{index + 1}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.id}</td>
                  <td>{student.status}</td>
                  <td>
                    <select
                      value={student.grade}
                      onChange={e => handleGradeChange(student.id, e.target.value)}
                      style={{ width: '80px', textAlign: 'center', verticalAlign: 'middle' }}
                    >
                      <option value="">-</option>
                      <option value="2.0">2.0</option>
                      <option value="3.0">3.0</option>
                      <option value="3.5">3.5</option>
                      <option value="4.0">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5.0">5.0</option>
                      <option value="5.5">5.5</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={student.comments} // Assuming you have a 'comments' property in your student object
                      onChange={(e) => handleCommentsChange(student.id, e.target.value)} // Create a similar function for comments
                      style={{ width:'200px', textAlign: 'center', verticalAlign: 'middle' }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className='checkbox-input'
                      checked={student.checkboxes.W || false}
                      onChange={() => handleCheckboxChange(student.id, 'W')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className='checkbox-input'
                      checked={student.checkboxes.Ć || false}
                      onChange={() => handleCheckboxChange(student.id, 'Ć')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className='checkbox-input'
                      checked={student.checkboxes.L || false}
                      onChange={() => handleCheckboxChange(student.id, 'L')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className='checkbox-input'
                      checked={student.checkboxes.P || false}
                      onChange={() => handleCheckboxChange(student.id, 'P')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="button-spacing-studentslist">
            {submissionStatus.message && (
                  <p className={submissionStatus.className}>{submissionStatus.message}</p>
              )}
            <button
              className="applyGradesButton-studentslist"
              onClick={handleSubmitGrades}
              style={{ cursor: isSubmitting ? 'wait' : (cooldownActive ? 'not-allowed' : 'default') }}
              disabled={isSubmitting || cooldownActive} // Disable the button based on isSubmitting
            >
              Zatwierdź wprowadzone oceny
            </button>
          </div>
  
      </main>
    );
  }