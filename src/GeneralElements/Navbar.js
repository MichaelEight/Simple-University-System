import '../App.css';
import '../GeneralElementsStyles/Navbar.css';
import '../GlobalStyles.css';

export default function Navbar(props) {
  const { selectedItem, onNavItemChange, isLoggedIn, user } = props;

  const handlePrivilegedOptionClick = (index) => {
    if (isLoggedIn) {
      if(index === 1) // if MyIndex
      {
        if(user.role === "student" || user.role === "admin")
        {
          onNavItemChange(index); // Allow the click event if logged in as student
        }
      }
      else if(index === 2) // if MyDziennik
      {
        if(user.role === "teacher" || user.role === "admin")
        {
          onNavItemChange(index); // Allow the click event if logged in as teacher
        }
      }
      else if(index === 3) // if MyDziennik
      {
        if(user.role === "dziekan" || user.role === "admin")
        {
          onNavItemChange(index); // Allow the click event if logged in as dziekan
        }
      }
      else if(index === 5) // if AdminPanel
      {
        if(user.role === "admin")
        {
          onNavItemChange(index); // Allow the click event if logged in as admin
        }
      }
      else
      {
        onNavItemChange(index); // Allow the click event if logged in
      }
    }

    if(index === 4) // Special permission for "Rekrutacja" page
    {
      onNavItemChange(index);
    }
  };

  return (
    <nav className='navigation-menu'>
      <ul>
        <li
          onClick={() => onNavItemChange(0)}
          className={selectedItem === 0 ? 'selected' : 'hover-underline-animation'}
        >
          <p>Strona Główna</p>
        </li>

        <li
          onClick={() => handlePrivilegedOptionClick(1)}
          className={(selectedItem === 1 ? 'selected' : 'hover-underline-animation') + " " +
                      (isLoggedIn && (user.role === "student" || user.role === "admin") ? '' : 'locked-hover-underline-animation')}
          // Disable and apply a different style if not logged in
          style={{ cursor: isLoggedIn && (user.role === "student" || user.role === "admin") ? 'pointer' : 'not-allowed', color: isLoggedIn && (user.role === "student" || user.role === "admin") ? 'inherit' : 'gray' }}
        >
          <p>Mój Indeks</p>
        </li>

        <li
          onClick={() => handlePrivilegedOptionClick(2)}
          className={(selectedItem === 2 ? 'selected' : 'hover-underline-animation') + " " +
                      (isLoggedIn && (user.role === "teacher" || user.role === "admin") ? '' : 'locked-hover-underline-animation')}
          // Disable and apply a different style if not logged in
          style={{ cursor: isLoggedIn && (user.role === "teacher" || user.role === "admin") ? 'pointer' : 'not-allowed', color: isLoggedIn && (user.role === "teacher" || user.role === "admin") ? 'inherit' : 'gray' }}
        >
          <p>Mój Dziennik</p>
        </li>

        <li
          onClick={() => handlePrivilegedOptionClick(3)}
          className={(selectedItem === 3 ? 'selected' : 'hover-underline-animation') + " " +
                      (isLoggedIn && (user.role === "dziekan" || user.role === "admin") ? '' : 'locked-hover-underline-animation')}
          // Disable and apply a different style if not logged in
          style={{ cursor: isLoggedIn && (user.role === "dziekan" || user.role === "admin") ? 'pointer' : 'not-allowed', color: isLoggedIn && (user.role === "dziekan" || user.role === "admin") ? 'inherit' : 'gray' }}
        >
          <p>Mój Dziekanat</p>
        </li>
        
        <li
          onClick={() => handlePrivilegedOptionClick(4)}
          className={(selectedItem === 4 ? 'selected' : 'hover-underline-animation') + " " +
                      (!isLoggedIn ? '' : 'locked-hover-underline-animation')}
          // Disable and apply a different style if not logged in
          style={{ cursor: !isLoggedIn ? 'pointer' : 'not-allowed', color: !isLoggedIn ? 'inherit' : 'gray' }}
        >
          <p>Rekrutacja</p>
        </li>

        {isLoggedIn && user.role === "admin" ? 
        
        <li
          onClick={() => handlePrivilegedOptionClick(5)}
          className={(selectedItem === 5 ? 'selected' : 'hover-underline-animation') + " " +
                      (isLoggedIn && user.role === "admin" ? '' : 'locked-hover-underline-animation')}
          // Disable and apply a different style if not logged in
          style={{ cursor: isLoggedIn && user.role === "admin" ? 'pointer' : 'not-allowed', color: isLoggedIn && user.role === "admin" ? 'inherit' : 'gray' }}
        >
          <p>Admin Panel</p>
        </li>
        :''}
      </ul>
    </nav>
  );
}
