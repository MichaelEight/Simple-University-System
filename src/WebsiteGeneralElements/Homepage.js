import './Homepage.css'
import React, { useState } from 'react';

function Sidebar({ onSelectedContentChange }) {
    const [selectedOption, setSelectedOption] = useState(0); // Initialize with the index of the first option
  
    const handleOptionClick = (index) => {
      setSelectedOption(index); // Mark option as selected
      onSelectedContentChange(index); // Change content box 
    };

    const sideSelectedStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        textDecorationColor: 'blue', // Specify the color
        textDecorationThickness: '5px', // Specify the thickness
        textUnderlineOffset: '10px',
      };

    return (
        <aside>
        <p onClick={() => handleOptionClick(0)} style={selectedOption === 0 ? sideSelectedStyles : {}}>
            Aktualności
        </p>
        <p onClick={() => handleOptionClick(1)} style={selectedOption === 1 ? sideSelectedStyles : {}}>
            Opcja 2
        </p>
        <p onClick={() => handleOptionClick(2)} style={selectedOption === 2 ? sideSelectedStyles : {}}>
            Opcja 3
        </p>
        <p onClick={() => handleOptionClick(3)} style={selectedOption === 3 ? sideSelectedStyles : {}}>
            Opcja 4
        </p>
        <p onClick={() => handleOptionClick(4)} style={selectedOption === 4 ? sideSelectedStyles : {}}>
            Opcja 5
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
      // Uncomment the following case if you want to render MyIndex for selectedContent === 1
      // case 1:
      //   optionToRender = <MyIndex />;
      //   break;
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

function ContentNews() {    
    return (
        <main>
        <div>
            <div className='textStyleCentered'>
                <p>Monotechnika Akademicka</p>
                <p style={{fontWeight: 'bold', fontSize: '32px'}} >WITAJ W SYSTEMIE SUS</p>
            </div>

            <p style={{ fontWeight: 'bold', fontSize: '24px', margin: 10, borderBottom: '2px solid #999' }}>UWAGA TECHNICZNA!</p>
            <p style={{margin: 0}}>Każdego dnia w godzinach zależny od fazy księżyca, pogody i wielu innych czynników niezależnych od nas - system może nie działać. Wszelkie skargi proszę składać do prorektora Politechniki Wrocławskiej Kamila Stańca.</p>
        </div>
        </main>
    );
}