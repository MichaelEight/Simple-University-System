// Import necessary dependencies
import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../GlobalStyles.css';
import '../NavPagesStyles/Homepage.css';
import ContentNews from './HomepageContent/News';
import ContentTechContact from './HomepageContent/TechContact';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define option labels
const optionLabels = ["Aktualności", "Kontakt"]; 

// Define the content components and pass them to CommonMainPage
const contentComponents = {
  0: <ContentNews />,
  1: <ContentTechContact />,
};

export default function MainPage() {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
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
