// Import necessary dependencies
import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../GlobalStyles.css';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentPlaceholder1() {
  return (
    <main>
      <div>
        <p>Content will be here soon!</p>
      </div>
    </main>
  );
}

function ContentPlaceholder2() {
  return (
    <main>
      <div>
        <p>TEXT</p>
      </div>
    </main>
  );
}

// Define option labels
const optionLabels = ["Placeholder 1", "Placeholder 2"]; 

// Define the content components and pass them to CommonMainPage
const contentComponents = {
  0: <ContentPlaceholder1 />,
  1: <ContentPlaceholder2 />,
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
