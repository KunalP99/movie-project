import { useState, useEffect, useContext } from 'react';

// Models 
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';

// Context
import { UserContext } from '../context/UserContext';

interface Props {
  watchlist: IHandleGetWatchlistMovies[],
}

const ProfileWidget = ({ watchlist } : Props) => {
  const [watchlistLength, setWatchlistLength] = useState<number>(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const userWatchlist = watchlist.filter(person => person.user_id === user.sub);
    setWatchlistLength(userWatchlist.length);
  }, [watchlist]);

  return (
    <div className="profile-widget-container">
      <div className='profile-widget-item'>
        <img src={user.picture} alt="User profile picture" />
      </div>
      <div className='profile-widget-item'>
        <h3>{watchlistLength}</h3>
        <p>Watchlist</p>
      </div>
      <div className='profile-widget-item'> 
        <h3>25</h3>
        <p>Watched</p>
      </div>
      <div className='profile-widget-item'>
        <h3>2</h3>
        <p>Level</p>
      </div>
      <div className='profile-widget-item'>
        <h3>5</h3>
        <p>Achievements</p>
      </div>
    </div>
  );
};

export default ProfileWidget;