import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [biotopeDropdownVisible, setBiotopeDropdownVisible] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleBiotopeDropdown = () => {
    setBiotopeDropdownVisible(!biotopeDropdownVisible);
  };

  const logoutAndHideMenu = () => {
    logout();
    setMenuVisible(false);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
          {menuVisible && (
            <div className="slide-menu">
              <Link to="/" onClick={hideMenu}>Home</Link>
              {user && <Link to="/dashboard" onClick={hideMenu}>Profile</Link>}
              <Link to="/events" onClick={hideMenu}>Events</Link>
              <div onClick={toggleBiotopeDropdown}>Biotopes</div>
              {biotopeDropdownVisible && (
                <div className="biotope-dropdown">
                  <Link to="/biotopes/1" onClick={hideMenu}>Biotope 1</Link>
                  <Link to="/biotopes/2" onClick={hideMenu}>Biotope 2</Link>
                  <Link to="/biotopes/3" onClick={hideMenu}>Biotope 3</Link>
                  <Link to="/biotopes/4" onClick={hideMenu}>Biotope 4</Link>
                </div>
              )}
              {user ? (
                <button onClick={logoutAndHideMenu}>Sign Out</button>
              ) : (
                <>
                  <Link to="/login" onClick={hideMenu}>Sign In</Link>
                  <Link to="/signup" onClick={hideMenu}>Get Started</Link>
                </>
              )}
            </div>
          )}
        </nav>
        {!user && (
          <div className="login-get-started-links">
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Get Started</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
