import logo from '../Images/logoSUS.png';
import banner from '../Images/susBanner.png';
import '../GeneralElementsStyles/Header.css';
import '../GlobalStyles.css';

export default function Header(){
    return(
        <header className="App-header">
            {/* <img src={logo} className="Header-Logo" alt="logo" /> */}
            <img src={banner} className="Header-Banner" alt="banner" />
        </header>
    );
}