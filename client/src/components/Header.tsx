import HambugerIcon from '../images/hamburger-menu.svg';

const Header = () => {
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
            <li><a href="#">Search</a></li>
            <li><a href="#">Watchlist</a></li>
            <li><a href="#">History</a></li>
            <li><a href="#">Name</a></li>
          </ul>
        </div>
        <button className='hamburger-btn' type='button'><img src={HambugerIcon} alt="Open sidebar" /></button>
      </nav>
    </header>
  );
};

export default Header;