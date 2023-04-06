import { useContext } from 'react';

// Context
import { UserContext } from '../context/UserContext';

const ProfileWidget = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="profile-widget-container">
      <img src={user.picture} alt="User profile picture" />
      <div className='profile-widget-text'>
        <h3>1</h3>
        <p>Watchlist</p>
      </div>
      <div className='profile-widget-text'> 
        <h3>25</h3>
        <p>Watched</p>
      </div>
      <div className='profile-widget-text'>
        <h3>2</h3>
        <p>Level</p>
      </div>
      <div className='profile-widget-text'>
        <h3>5</h3>
        <p>Achievements</p>
      </div>
    </div>
  );
};

export default ProfileWidget;