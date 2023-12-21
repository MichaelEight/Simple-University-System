import React, { useState } from 'react';
import './ListOfStudents.css';

export default function ContentListOfStudents() {
    const [students, setStudents] = useState([
      {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        indexNumber: '12345',
        state: 'active',
        grade: '',
        comments: '',
        checkboxes: {
          W: false,
          Ć: false,
          L: false,
          P: false,
        },
      },
      {
        id: 2,
        name: 'Alice',
        lastName: 'Smith',
        indexNumber: '54321',
        state: 'inactive',
        grade: '',
        comments: '',
        checkboxes: {
          W: false,
          Ć: false,
          L: false,
          P: false,
        },
      },
      {
        id: 3,
        name: 'Bob',
        lastName: 'Johnson',
        indexNumber: '98765',
        state: 'active',
        grade: '',
        comments: '',
        checkboxes: {
          W: false,
          Ć: false,
          L: false,
          P: false,
        },
      },
      {
        id: 4,
        name: 'Eve',
        lastName: 'Brown',
        indexNumber: '23456',
        state: 'inactive',
        grade: '',
        comments: '',
        checkboxes: {
          W: false,
          Ć: false,
          L: false,
          P: false,
        },
      },
      {
        id: 5,
        name: 'Eve2',
        lastName: 'Brown2',
        indexNumber: '62456',
        state: 'inactive',
        grade: '',
        comments: '',
        checkboxes: {
          W: false,
          Ć: false,
          L: false,
          P: false,
        },
      },
      {
        id: 5,
        name: 'Eve2',
        lastName: 'Brown2',
        indexNumber: '62456',
        state: 'inactive',
        grade: '',
        comments: '',
        checkboxes: {
          W: false,
          Ć: false,
          L: false,
          P: false,
        },
      },
      // Add more student data here
    ]);
  
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
  
    const subjects = ["Subject 1", "Subject 2", "Subject 3"];
    const programs = ["Program A", "Program B", "Program C"];
    const groups = ["Group X", "Group Y", "Group Z"];
  
    const [selectedSubject, setSelectedSubject] = useState("Wybierz przedmiot");
    const [selectedProgram, setSelectedProgram] = useState("Wybierz grupę kierunkową");
    const [selectedGroup, setSelectedGroup] = useState("Wybierz grupę");
  
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
                    <option key={index} value={subject}>
                      {subject}
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
              <button className="loadButton-studentslist">Załaduj listę</button>
            </div>
          </div>
          
          <div className="table-spacing-studentslist"></div>
  
          <table className="data-table-studentslist">
            <thead>
              {renderTopRowCheckboxes()}
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className='rows-colors-studentslist'>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.lastName}</td>
                  <td>{student.indexNumber}</td>
                  <td>{student.state}</td>
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
                    style={{ width:'250px', textAlign: 'center', verticalAlign: 'middle' }}
                  />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.checkboxes.W}
                      onChange={() => handleCheckboxChange(student.id, 'W')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.checkboxes.Ć}
                      onChange={() => handleCheckboxChange(student.id, 'Ć')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.checkboxes.L}
                      onChange={() => handleCheckboxChange(student.id, 'L')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.checkboxes.P}
                      onChange={() => handleCheckboxChange(student.id, 'P')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="button-spacing-studentslist">
            <button className="applyGradesButton-studentslist">Zatwierdź wprowadzone oceny</button>
          </div>
  
      </main>
    );
  }