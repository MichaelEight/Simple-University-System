import React, { useEffect, useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../NavPagesStyles/MyIndex.css';
import '../NavPagesStyles/defaultTable.css';
import ContentGrades from './MyIndexContent/Grades';
import ContentStats from './MyIndexContent/Stats';
import ContentMyPlan from './MyIndexContent/MyPlan';
import ContentMyProfile from './MyIndexContent/MyProfile';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case

// Define the labels for the options in the sidebar
const optionLabels = ["Oceny", "Statystyki", "Mój Plan", "Mój Profil"];

export default function MainPage({user}) {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentGrades user={user}/>,
    1: <ContentStats user={user}/>,
    2: <ContentMyPlan user={user}/>,
    3: <ContentMyProfile user={user}/>,
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
