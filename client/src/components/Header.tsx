import { useState, useEffect, useContext } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { addUser } from '../api/mongoapi';

// Images
import HambugerIcon from '../images/hamburger-menu.svg';
import SearchIcon from '../images/sidebar/search-icon.svg';
import WatchlistIcon from '../images/sidebar/watchlist-icon.svg';
import HistoryIcon from '../images/sidebar/history-icon.svg';
// import ProfileIcon from '../images/sidebar/profile-icon.svg';
import CloseIcon from '../images/sidebar/x.svg';

// Models
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';

// Context
import { UserContext } from './context/UserContext';

interface Props {
  watchlist: IHandleGetWatchlistMovies[],
  setWatchlist: React.Dispatch<React.SetStateAction<IHandleGetWatchlistMovies[]>>
}

interface GoogleUserInfo {
  email: string,
  given_name: string,
  sub: string,
  name: string,
  picture: string
}

const Header = ({ watchlist, setWatchlist } : Props) => {
  const [navIcon, setNavIcon] = useState(HambugerIcon);
  const {user, setUser} = useContext(UserContext);

  // Get local storage item data when component mounts if there is data
  useEffect(() => {
    const data = window.localStorage.getItem('POPCORN_USER');
    if (data !== null) {
      console.log(data);
      setUser(JSON.parse(data));
    }
  }, []); 

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
                    // Decodes token to get user data
                    const decoded: GoogleUserInfo = jwt_decode(res.credential || '');
                    setUser(decoded);
                    window.localStorage.setItem('POPCORN_USER', JSON.stringify(decoded));
                    setWatchlist([...watchlist]);
                    addUser(
                      decoded.email,
                      decoded.given_name,
                      decoded.name,
                      decoded.picture,
                      decoded.sub
                    );
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