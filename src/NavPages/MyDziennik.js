import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../NavPagesStyles/MyDziennik.css';
import '../NavPagesStyles/defaultTable.css';
import ContentListOfStudents from './MyDziennikContent/ListOfStudents';
//import ContentQuickGrade from './MyDziennikContent/QuickGrade';
import ContentMyPlan from './MyDziennikContent/MyPlan';
import ContentSubjectInfo from './MyDziennikContent/SubjectInfo';
import ContentMyProfile from './MyDziennikContent/MyProfile';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define the labels for the options in the sidebar
const optionLabels = ["Mój Plan Zajęć", "Lista Studentów", /*"Szybkie Wprowadzenie Oceny",*/ "Moje Przedmioty", "Mój Profil"];

export default function MainPage({user}) {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentMyPlan user={user}/>,
    1: <ContentListOfStudents user={user}/>,
    //2: <ContentQuickGrade user={user}/>, // Functionality disabled
    2: <ContentSubjectInfo user={user}/>,
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
