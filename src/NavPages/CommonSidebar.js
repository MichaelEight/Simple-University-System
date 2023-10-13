import React, { useState } from 'react';

function CommonSidebar({ selectedOption, onOptionClick, options, optionLabels }) {
  return (
    <aside>
      {options.map((option, index) => (
        <p
          key={index}
          onClick={() => onOptionClick(index)}
          className={selectedOption === index ? 'side-selected' : ''}
        >
          {optionLabels[index]} {/* Display the label for the option */}
        </p>
      ))}
    </aside>
  );
}

export default CommonSidebar;