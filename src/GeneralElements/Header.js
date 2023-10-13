import logo from '../Images/logoSUS.png';
import '../GeneralElementsStyles/Header.css';
import '../GlobalStyles.css';

export default function Header(){
    return(
        <header className="App-header">
            <img src={logo} className="Header-Logo" alt="logo" />
        </header>
    );
}