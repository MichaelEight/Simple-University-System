import '../App.css';
import '../GeneralElementsStyles/Navbar.css';
import '../GlobalStyles.css';

export default function Navbar(props){
    const { selectedItem, onNavItemChange } = props;

    return (
        <nav className='navigation-menu'>
          <ul>
            <li onClick={() => onNavItemChange(0)} className={selectedItem === 0 ? 'selected' : 'hover-underline-animation'}>
              <p>Strona Główna</p>
            </li>
            <li onClick={() => onNavItemChange(1)} className={selectedItem === 1 ? 'selected' : 'hover-underline-animation'}>
              <p>Mój Indeks</p>
            </li>
            <li onClick={() => onNavItemChange(2)} className={selectedItem === 2 ? 'selected' : 'hover-underline-animation'}>
              <p>Mój Dziennik</p>
            </li>
            <li onClick={() => onNavItemChange(3)} className={selectedItem === 3 ? 'selected' : 'hover-underline-animation'}>
              <p>Link 4</p>
            </li>
            <li onClick={() => onNavItemChange(4)} className={selectedItem === 4 ? 'selected' : 'hover-underline-animation'}>
              <p>Link 5</p>
            </li>
          </ul>
        </nav>
      );
}