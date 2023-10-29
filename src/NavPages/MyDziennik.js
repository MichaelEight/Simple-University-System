import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../NavPagesStyles/MyDziennik.css';

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
      checkboxes: {
        W: false,
        Ć: false,
        L: false,
        P: false,
      },
    },
    // Add more student data here
  ]);

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

  const subjects = ["Subject 1", "Subject 2", "Subject 3"];
  const programs = ["Program A", "Program B", "Program C"];
  const groups = ["Group X", "Group Y", "Group Z"];

  const [selectedSubject, setSelectedSubject] = useState("Wybierz przedmiot");
  const [selectedProgram, setSelectedProgram] = useState("Wybierz grupę kierunkową");
  const [selectedGroup, setSelectedGroup] = useState("Wybierz grupę");

  return (
    <main>
      <div>
        <p>1) Wybierz przedmiot
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
        </p>
      </div>
      <div>
        <p>2) Wybierz grupę kierunkową
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
        </p>
      </div>
      <div>
        <p>3) Wybierz grupę
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
        </p>
      </div>
      <button className="load-button">Załaduj listę</button>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Index Number</th>
            <th>State</th>
            <th>Grade</th>
            <th>W</th>
            <th>Ć</th>
            <th>L</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.lastName}</td>
              <td>{student.indexNumber}</td>
              <td>{student.state}</td>
              <td>
                <input
                  type="text"
                  value={student.grade}
                  onChange={e => handleGradeChange(student.id, e.target.value)}
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
    </main>
  );
}

function ContentQuickGrade() {
  return (
    <main>
      <div>
        <p>Placeholder 3</p>
      </div>
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
