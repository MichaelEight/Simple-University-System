import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';

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
  return (
    <main>
      <div>
        <p>Placeholder 2</p>
      </div>
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
