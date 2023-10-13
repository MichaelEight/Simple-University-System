import './Sidebar.css'
import './GlobalStyles.css';
import './Homepage.css'
import React, { useState } from 'react';

function Sidebar({ onSelectedContentChange }) {
    const [selectedOption, setSelectedOption] = useState(0); // Initialize with the index of the first option

    const handleOptionClick = (index) => {
      setSelectedOption(index); // Mark option as selected
      onSelectedContentChange(index); // Change content box 
    };

    return (
      <aside>
        <p onClick={() => handleOptionClick(0)} className={selectedOption === 0 ? 'side-selected' : {}}>
            Aktualności
        </p>
        <p onClick={() => handleOptionClick(1)} className={selectedOption === 1 ? 'side-selected' : {}}>
            Kontakt
        </p>
      </aside>
    );
}

export default function MainPage() {
    const [selectedContent, setSelectedContent] = useState(0);
  
    const handleSelectedContentChange = (index) => {
      setSelectedContent(index);
    };
  
    let optionToRender;
  
    switch (selectedContent) {
      case 0:
        optionToRender = <ContentNews />;
        break;
      case 1:
        optionToRender = <ContentTechContact />;
        break;
      default:
        optionToRender = <div>Placeholder for other values</div>;
    }
  
    return (
      <>
        <Sidebar onSelectedContentChange={handleSelectedContentChange} />
        {optionToRender}
      </>
    );
}

// Content for each tab
//
function ContentNews() {    
    return (
        <main>
          <div>
              <div className='main-center-text border-box'>
                  <p>Monotechnika Akademicka</p>
                  <p style={{fontWeight: 'bold', fontSize: '32px'}} >WITAJ W SYSTEMIE SUS</p>
              </div>

              <p style={{ fontWeight: 'bold', fontSize: '24px', margin: 10, borderBottom: '2px solid #999' }}>UWAGA TECHNICZNA!</p>
              <p style={{margin: 0, textAlign: 'justify'}}>Każdego dnia w godzinach zależnych od fazy księżyca, pogody i wielu innych czynników niezależnych od nas - system może nie działać. Wszelkie skargi proszę składać do prorektora naszej Monotechniki, który z radością podejmie się złożonej analizy problemu. W ciągu od 9 do ∞ dni roboczych proszę oczekiwać odpowiedzi negatywnej.</p>
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