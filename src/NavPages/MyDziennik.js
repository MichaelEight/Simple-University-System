// Import necessary dependencies
import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentPlaceholder1() {
  return (
    <main>
      <div>
        <p>Placeholder 1</p>
      </div>
    </main>
  );
}

function ContentPlaceholder2() {
  return (
    <main>
      <div>
        <p>Placeholder 2</p>
      </div>
    </main>
  );
}

function ContentPlaceholder3() {
  return (
    <main>
      <div>
        <p>Placeholder 3</p>
      </div>
    </main>
  );
}

// Define the labels for the options in the sidebar
const optionLabels = ["Placeholder1", "Placeholder2", "Placeholder3"];

export default function MainPage() {
  const [selectedContent, setSelectedContent] = useState(0);

  const handleSelectedContentChange = (index) => {
    setSelectedContent(index);
  };

  const contentComponents = {
    0: <ContentPlaceholder1 />,
    1: <ContentPlaceholder2 />,
    2: <ContentPlaceholder3 />,
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
