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
          <FontAwesomeIcon icon={faBars} onClick={toggleMenu} className='menuIcon' />
          {menuVisible && (
            <div className="slide-menu">
              <div className='homeLink'><Link to="/" onClick={hideMenu}>Home</Link></div>
              {user && <Link to="/dashboard" onClick={hideMenu}>Profile</Link>}
              <Link to="/events" onClick={hideMenu}>Events</Link>
              <Link onClick={toggleBiotopeDropdown} className='biotopeLink'>Biotopes</Link>
              {biotopeDropdownVisible && (
                <div className="biotope-dropdown">
                  <Link to="/organizations/ocean" onClick={hideMenu}>Ocean</Link>
                  <Link to="/organizations/forest" onClick={hideMenu}>Forest</Link>
                  <Link to="/organizations/desert" onClick={hideMenu}>Desert</Link>
                  <Link to="/organizations/jungle" onClick={hideMenu}>Jungle</Link>
                </div>
              )}
              {user ? (
                <button onClick={logoutAndHideMenu}>Sign Out</button>
              ) : (
                <>
                  <div className="login-get-started-links">
                    <div className='signInLink'>
                      <Link to="/login" onClick={hideMenu} className='signInLink'>Sign In</Link>
                    </div>
                    <Link to="/signup" onClick={hideMenu} className='getStartedLink'>Get Started</Link>
                  </div>                </>
              )}
            </div>
          )}
        </nav>
        {!user && (
          <div className="login-get-started-buttons">
            <div className='signInButton'>
              <Link to="/login" className='signInButton'>Sign In</Link>
            </div>
            <div className='getStartedButton'>
              <Link to="/signup">Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
