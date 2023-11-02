import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../NavPagesStyles/MyDziennik.css';
import '../NavPagesStyles/defaultTable.css';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentMyPlan() {
  return (
    <main>
      <div>
        <p>Placeholder 1</p>
      </div>
    </main>
  );
}


function ContentListOfStudents() {
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
        <div>
          <div className="select-container">
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
          
          <div className="button-spacing"></div>

          <button className="load-button">Załaduj listę</button>
        </div>
        
        <div className="table-spacing"></div>

        <table className="data-table">
          <thead>
            {renderTopRowCheckboxes()}
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className='rows-colors'>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.indexNumber}</td>
                <td>{student.state}</td>
                <td>
                  <select
                    value={student.grade}
                    onChange={e => handleGradeChange(student.id, e.target.value)}
                    style={{ width: '50px', textAlign: 'center', verticalAlign: 'middle' }}
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
                  style={{ textAlign: 'center', verticalAlign: 'middle' }}
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

        <div className="table-spacing"></div>

        <button className="apply-grades-button">Zatwierdź wprowadzone oceny</button>
      </div>
    </main>
  );
}

function ContentQuickGrade() {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');

  // Function to handle the "Search" button click
  const handleSearch = () => {
    // You can make an API call here to fetch student information based on the studentId
    // For now, let's use random data as a placeholder
    const randomData = generateRandomStudentData();
    setName(randomData.name);
    setLastName(randomData.lastName);
    setStatus(randomData.status);
  };

  // Function to generate random student data as a placeholder
  const generateRandomStudentData = () => {
    // Replace this with your actual logic to generate random data
    const randomData = {
      name: 'John',
      lastName: 'Doe',
      status: 'Active',
    };
    return randomData;
  };

  function generateRandomGrade() {
    const possibleGrades = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5];
    const randomIndex = Math.floor(Math.random() * possibleGrades.length);
    const formattedGrade = possibleGrades[randomIndex].toFixed(1);
    return formattedGrade;
  }

  return (
    <main>
      <div>
        <div>
          <label>Student ID:</label>
          <input
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <p>Name: {name}</p>
          <p>Last name: {lastName}</p>
          <p>Status: {status}</p>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Current Grade</th>
            <th>Input Grade</th>
            <th>W</th>
            <th>Ć</th>
            <th>L</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {/* Generate random student data as a placeholder */}
          {Array.from({ length: 10 }, (_, index) => (
            <tr key={index} className='rows-colors'>
              <td>Subject Code {index + 1}</td>
              <td>Subject Name {index + 1}</td>
              <td>{generateRandomGrade()}</td>
              <td>
                  <select
                    // value={student.grade}
                    // onChange={e => handleGradeChange(student.id, e.target.value)}
                    style={{ width: '100px', textAlign: 'center', verticalAlign: 'middle', fontSize: '17px' }}
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
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
              <td><input type="checkbox" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='button-spacing'></div>

      <button className='apply-grades-button'>Accept new grades</button>
    </main>
  );
}

function ContentSubjectInfo() {
  return (
    <main>
      <div>
        <p>Placeholder 4</p>
      </div>
    </main>
  );
}

// Define the labels for the options in the sidebar
const optionLabels = ["Mój Plan Zajęć", "Lista Studentów", "Szybkie Wprowadzenie Oceny", "Info o Twoich Przedmiotach"];

export default function MainPage() {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentMyPlan />,
    1: <ContentListOfStudents />,
    2: <ContentQuickGrade />,
    3: <ContentSubjectInfo />,
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
