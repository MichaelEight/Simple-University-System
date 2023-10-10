import '../App.css';
import './Navbar.css';
import React, { useState } from 'react';

export default function Navbar(props){
    const { selectedItem, onNavItemChange } = props;

    return (
        <nav className='navigation-menu'>
          <ul>
            <li onClick={() => onNavItemChange(0)} className={selectedItem === 0 ? 'selected' : ''}>
              <p>Strona Główna</p>
            </li>
            <li onClick={() => onNavItemChange(1)} className={selectedItem === 1 ? 'selected' : ''}>
              <p>Mój Indeks</p>
            </li>
            <li onClick={() => onNavItemChange(2)} className={selectedItem === 2 ? 'selected' : ''}>
              <p>Mój Dziennik</p>
            </li>
            <li onClick={() => onNavItemChange(3)} className={selectedItem === 3 ? 'selected' : ''}>
              <p>Link 4</p>
            </li>
            <li onClick={() => onNavItemChange(4)} className={selectedItem === 4 ? 'selected' : ''}>
              <p>Link 5</p>
            </li>
          </ul>
        </nav>
      );
}