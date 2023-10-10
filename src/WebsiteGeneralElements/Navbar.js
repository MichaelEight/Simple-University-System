import '../App.css';
import './Navbar.css';

export default function Navbar(){
    return(
        <nav className='navigation-menu'>
            <ul>
                <li><p>Strona Główna</p></li>
                <li><p>Mój Indeks</p></li>
                <li><p>Mój Dziennik</p></li>
                <li><p>Link 4</p></li>
                <li><p>Link 5</p></li>
            </ul>
        </nav>
    );
}