import { useState } from 'react';
import HambugerIcon from '../images/hamburger-menu.svg';
import SearchIcon from '../images/sidebar/search-icon.svg';
import WatchlistIcon from '../images/sidebar/watchlist-icon.svg';
import HistoryIcon from '../images/sidebar/history-icon.svg';
import ProfileIcon from '../images/sidebar/profile-icon.svg';
import CloseIcon from '../images/sidebar/x.svg';

const Header = () => {
  const [navIcon, setNavIcon] = useState(HambugerIcon);

  const toggleMenu = () => {
    const navbarLinks = document.querySelector('.navbar-links');

    if (navIcon === HambugerIcon) {
      setNavIcon(CloseIcon);
    } else {
      setNavIcon(HambugerIcon);
    }

    // Show X icon and Hamburger icon
    navbarLinks?.classList.toggle('active');
    console.log('click');
  };
  return (
    <header>
      <nav>
        <div className='header-logo'>
          <a href="#">
            <h2>Logo</h2>
          </a>
        </div>
        <div className='navbar-links'>
          <ul>
            <li>
              <img src={SearchIcon} alt="Search for a movie" />
              <a href="#">Search</a>
            </li>
            <li>
              <img src={WatchlistIcon} alt="View your watchlist" />
              <a href="#">Watchlist</a>
            </li>
            <li>
              <img src={HistoryIcon} alt="View your watch history" />
              <a href="#">History</a>
            </li>
            <li>
              <img src={ProfileIcon} alt="View your profile" />
              <a href="#">Name</a>
            </li>
          </ul>
        </div>
        <button className='nav-btn' type='button' onClick={toggleMenu}><img src={navIcon} alt="Open sidebar" /></button>
      </nav>
    </header>
  );
};

export default Header;