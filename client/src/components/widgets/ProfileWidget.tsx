import { useState, useEffect, useContext } from 'react';

// Images
import PopcornPoints from '../../images/popcorn-points.svg';

// Models 
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';
import IHistory from '../../models/IHistory';

// Context
import { UserContext } from '../context/UserContext';

interface Props {
  watchlist: IHandleGetWatchlistMovies[],
  history: IHistory[],
}

const ProfileWidget = ({ watchlist, history } : Props) => {
  const [watchlistLength, setWatchlistLength] = useState<number>(0);
  const [historyLength, setHistoryLength] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setWatchlistLength(watchlist.length);
    setHistoryLength(history.length);
    setPoints(history.reduce((prev, curr) => prev + curr.points, 0));
  }, [watchlist, history]);

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
        <h3>{historyLength}</h3>
        <p>Watched</p>
      </div>
      <div className='profile-widget-item'>
        <div className='popcorn-points-container'>
          <img className='popcorn-points-img' src={PopcornPoints} alt="Points icon" />
          <h3>{points}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileWidget;