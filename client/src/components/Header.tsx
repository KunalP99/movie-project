import { useState, useContext } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

// Images
import HambugerIcon from '../images/hamburger-menu.svg';
import SearchIcon from '../images/sidebar/search-icon.svg';
import WatchlistIcon from '../images/sidebar/watchlist-icon.svg';
import HistoryIcon from '../images/sidebar/history-icon.svg';
// import ProfileIcon from '../images/sidebar/profile-icon.svg';
import CloseIcon from '../images/sidebar/x.svg';

// Context
import { UserContext } from './context/UserContext';

interface GoogleUserInfo {
  email: string,
  given_name: string,
  sub: string,
  name: string,
  picture: string
}

const Header = () => {
  const [navIcon, setNavIcon] = useState(HambugerIcon);
  const {user, setUser} = useContext(UserContext);
  console.log(user);

  const toggleMenu = () => {
    const navbarLinks = document.querySelector('.navbar-links');

    if (navIcon === HambugerIcon) {
      setNavIcon(CloseIcon);
    } else {
      setNavIcon(HambugerIcon);
    }

    // Show X icon and Hamburger icon
    navbarLinks?.classList.toggle('active');
  };
  
  return (
    <header>
      <nav>
        <div className='header-logo'>
          <a href="/">
            <h2>Logo</h2>
          </a>
        </div>
        <div className='navbar-links'>
          <ul>
            <li>
              <img src={SearchIcon} alt="Search for a movie" />
              <a href="/search">Search</a>
            </li>
            <li>
              <img src={WatchlistIcon} alt="View your watchlist" />
              <a href="/watchlist">Watchlist</a>
            </li>
            <li>
              <img src={HistoryIcon} alt="View your watch history" />
              <a href="#">History</a>
            </li>
            <li>
              {user.email !== '' ? 
                <div>
                  <a>{user.given_name}</a>
                </div>
                :
                <GoogleLogin 
                  useOneTap
                  auto_select
                  onSuccess={(res) => {
                    const decoded: GoogleUserInfo = jwt_decode(res.credential || '');
                    setUser(decoded);
                  }}
                  onError={() => console.log('Failed to Login')}
                />
              }
            </li>
          </ul>
        </div>
        <button className='nav-btn' type='button' onClick={toggleMenu}><img src={navIcon} alt="Open sidebar" /></button>
      </nav>
    </header>
  );
};

export default Header;