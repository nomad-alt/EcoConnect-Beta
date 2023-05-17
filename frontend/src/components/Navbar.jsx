import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const renderLoggedInLinks = () => (
    <div>
      <span>{user.email}</span>
      <button onClick={handleClick}>Log out</button>
    </div>
  );

  const renderLoggedOutLinks = () => (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );

  return (
    <header>
      <div className="container">
        <nav>
          <Link to="/">
            <FontAwesomeIcon icon={faBars} />
          </Link>
          {user ? renderLoggedInLinks() : renderLoggedOutLinks()}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
