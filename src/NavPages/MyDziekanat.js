import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../GlobalStyles.css';
import ContentViewRegistrations from './MyDziekanatContent/ViewRegistrations';
import ContentMyProfile from './MyDziekanatContent/MyProfile';
import ContentSubjectInfo from './MyDziekanatContent/SubjectInfo';
import ContentGrades from './MyDziekanatContent/Grades';
import ContentPlan from './MyDziekanatContent/Plan';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define option labels
const optionLabels = ["Sprawdź Rekrutacje", "Edytuj Przedmioty", "Profil Studenta", "Plan Zajęć", "Mój Profil"]; 

export default function MainPage({user}) {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentViewRegistrations user={user}/>,
    1: <ContentSubjectInfo user={user}/>,
    2: <ContentGrades user={user}/>,
    3: <ContentPlan user={user}/>,
    4: <ContentMyProfile user={user}/>,
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
