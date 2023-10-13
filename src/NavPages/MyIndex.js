import '../NavPagesStyles/Sidebar.css'
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
            Oceny
        </p>
        <p onClick={() => handleOptionClick(1)} className={selectedOption === 1 ? 'side-selected' : {}}>
            Statystyki
        </p>
        <p onClick={() => handleOptionClick(2)} className={selectedOption === 2 ? 'side-selected' : {}}>
            Mój Profil
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
        optionToRender = <ContentGrades />;
        break;
      case 1:
        optionToRender = <ContentStats />;
        break;
      case 2:
        optionToRender = <ContentMyProfile />;
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