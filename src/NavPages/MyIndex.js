// Import necessary dependencies
import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentGrades() {
  return (
    <main>
      <div>
        <p>Placeholder Grades</p>
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
