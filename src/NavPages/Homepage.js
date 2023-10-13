// Import necessary dependencies
import React, { useState } from 'react';
import '../NavPagesStyles/Sidebar.css';
import '../GlobalStyles.css';
import '../NavPagesStyles/Homepage.css';

// Import the shared components
import CommonMainPage from './CommonMainPage';

// Define your content components for this specific use case
function ContentNews() {
  return (
    <main>
      <div>
        <div className='main-center-text border-box'>
          <p>Monotechnika Akademicka</p>
          <p style={{ fontWeight: 'bold', fontSize: '32px' }}>WITAJ W SYSTEMIE SUS</p>
        </div>

        <p style={{ fontWeight: 'bold', fontSize: '24px', margin: 10, borderBottom: '2px solid #999' }}>UWAGA TECHNICZNA</p>
        <p style={{ margin: 0, textAlign: 'justify' }}>Każdego dnia w godzinach zależnych od fazy księżyca, pogody i wielu innych czynników niezależnych od nas - system może nie działać. Wszelkie skargi proszę składać do prorektora naszej Monotechniki, który z radością podejmie się złożonej analizy problemu. W ciągu od 9 do ∞ dni roboczych proszę oczekiwać odpowiedzi negatywnej.</p>
      </div>
    </main>
  );
}

function ContentTechContact() {
  return (
    <main>
      <div>
        <p>TEXT</p>
      </div>
    </main>
  );
}

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
