import '../App.css';
import './Navbar.css';

export default function Navbar(){
    return(
        <nav className='navigation-menu'>
            <ul>
                <li><p>Link 1</p></li>
                <li><p>Link 2</p></li>
                <li><p>Link 3</p></li>
                <li><p>Link 4</p></li>
                <li><p>Link 5</p></li>
            </ul>
        </nav>
    );
}