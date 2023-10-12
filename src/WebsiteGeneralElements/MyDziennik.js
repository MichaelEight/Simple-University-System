import './Sidebar.css'
import React, { useState } from 'react';

function Sidebar({ sideSelectedStyles, onSelectedContentChange }) {
    const [selectedOption, setSelectedOption] = useState(0); // Initialize with the index of the first option
  
    const handleOptionClick = (index) => {
      setSelectedOption(index); // Mark option as selected
      onSelectedContentChange(index); // Change content box 
    };

    return (
        <aside>
        <p onClick={() => handleOptionClick(0)} style={selectedOption === 0 ? sideSelectedStyles : {}}>
            Placeholder1
        </p>
        <p onClick={() => handleOptionClick(1)} style={selectedOption === 1 ? sideSelectedStyles : {}}>
            Placeholder2
        </p>
        <p onClick={() => handleOptionClick(2)} style={selectedOption === 2 ? sideSelectedStyles : {}}>
            Placeholder3
        </p>
      </aside>
    );
}

export default function MainPage({sideSelectedStyles}) {
    const [selectedContent, setSelectedContent] = useState(0);
  
    const handleSelectedContentChange = (index) => {
      setSelectedContent(index);
    };
  
    let optionToRender;
  
    switch (selectedContent) {
      case 0:
        optionToRender = <ContentPlaceholder1 />;
        break;
      case 1:
        optionToRender = <ContentPlaceholder2 />;
        break;
      case 2:
        optionToRender = <ContentPlaceholder3 />;
        break;
      default:
        optionToRender = <div>Placeholder for other values</div>;
    }
  
    return (
      <>
        <Sidebar sideSelectedStyles={sideSelectedStyles} onSelectedContentChange={handleSelectedContentChange} />
        {optionToRender}
      </>
    );
}

// Content for each tab
//
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