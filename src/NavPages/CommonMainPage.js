import CommonSidebar from './CommonSidebar';
import React, { useState } from 'react';

function CommonMainPage({ selectedContent, onSelectedContentChange, contentComponents, optionLabels }) {
  let optionToRender;

  if (selectedContent in contentComponents) {
    optionToRender = contentComponents[selectedContent];
  } else {
    optionToRender = <div>Placeholder for other values</div>;
  }

  return (
    <>
      <CommonSidebar
        selectedOption={selectedContent}
        onOptionClick={onSelectedContentChange}
        options={Object.keys(contentComponents)}
        optionLabels={optionLabels} // Pass option labels as a prop
      />
      {optionToRender}
    </>
  );
}

export default CommonMainPage;