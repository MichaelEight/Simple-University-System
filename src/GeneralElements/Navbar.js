import '../App.css';
import '../GeneralElementsStyles/Navbar.css';
import '../GlobalStyles.css';

export default function Navbar(props) {
  const { selectedItem, onNavItemChange, isLoggedIn, user } = props;

  const isAuthorized = (index, allowedRoles) => {
    if(isLoggedIn === false && index === 4) return true;

    return isLoggedIn && allowedRoles.includes(user.role);
  };

  const handleOptionClick = (index, allowedRoles) => {
    if (isAuthorized(index, allowedRoles) || (isLoggedIn === false && index === 4)) {
      onNavItemChange(index);
    }
  };

  return (
    <nav className="navigation-menu">
      <ul>
        <li
          onClick={() => onNavItemChange(0)}
          className={selectedItem === 0 ? 'selected' : 'hover-underline-animation'}
        >
          <p>Strona Główna</p>
        </li>

        <li
          onClick={() => handleOptionClick(1, ['student', 'admin'])}
          className={`${
            selectedItem === 1 ? 'selected' : 'hover-underline-animation'
          } ${isAuthorized(1, ['student', 'admin']) ? '' : 'locked-hover-underline-animation'}`}
          style={{
            cursor: isAuthorized(1, ['student', 'admin']) ? 'pointer' : 'not-allowed',
            color: isAuthorized(1, ['student', 'admin']) ? 'inherit' : 'gray',
          }}
        >
          <p>Mój Indeks</p>
        </li>

        <li
          onClick={() => handleOptionClick(2, ['teacher', 'admin'])}
          className={`${
            selectedItem === 2 ? 'selected' : 'hover-underline-animation'
          } ${isAuthorized(2, ['teacher', 'admin']) ? '' : 'locked-hover-underline-animation'}`}
          style={{
            cursor: isAuthorized(2, ['teacher', 'admin']) ? 'pointer' : 'not-allowed',
            color: isAuthorized(2, ['teacher', 'admin']) ? 'inherit' : 'gray',
          }}
        >
          <p>Mój Dziennik</p>
        </li>

        <li
          onClick={() => handleOptionClick(3, ['dziekan', 'admin'])}
          className={`${
            selectedItem === 3 ? 'selected' : 'hover-underline-animation'
          } ${isAuthorized(3, ['dziekan', 'admin']) ? '' : 'locked-hover-underline-animation'}`}
          style={{
            cursor: isAuthorized(3, ['dziekan', 'admin']) ? 'pointer' : 'not-allowed',
            color: isAuthorized(3, ['dziekan', 'admin']) ? 'inherit' : 'gray',
          }}
        >
          <p>Mój Dziekanat</p>
        </li>

        <li
          onClick={() => handleOptionClick(4, ['admin'])}
          className={`${
            selectedItem === 4 ? 'selected' : 'hover-underline-animation'
          } ${isAuthorized(4, ['admin']) ? '' : 'locked-hover-underline-animation'}`}
          style={{
            cursor: isAuthorized(4, ['admin']) ? 'pointer' : 'not-allowed',
            color: isAuthorized(4, ['admin']) ? 'inherit' : 'gray',
          }}
        >
          <p>Rekrutacja</p>
        </li>

        {isLoggedIn && user.role === 'admin' && (
          <li
            onClick={() => handleOptionClick(5, ['admin'])}
            className={`${
              selectedItem === 5 ? 'selected' : 'hover-underline-animation'
            } ${isAuthorized(5, ['admin']) ? '' : 'locked-hover-underline-animation'}`}
            style={{
              cursor: isAuthorized(5, ['admin']) ? 'pointer' : 'not-allowed',
              color: isAuthorized(5, ['admin']) ? 'inherit' : 'gray',
            }}
          >
            <p>ADMIN</p>
          </li>
        )}
      </ul>
    </nav>
  );
}
