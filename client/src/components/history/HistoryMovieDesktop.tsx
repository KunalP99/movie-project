import { useState, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import { deleteHistoryMovie } from '../../api/mongoapi';

// Images
import RatingStar from '../../images/rating-star.svg';
import PopcornPoints from '../../images/popcorn-points.svg';
import WhiteTick from '../../images/white-tick.svg';
import WhiteDots from '../../images/more_horiz.svg';
import EditIcon from '../../images/edit-icon.svg';
import DeleteIcon from '../../images/trash-icon.svg';

// Models
import IHistory from '../../models/IHistory';

// Context
import { UserContext } from '../../components/context/UserContext';

interface Props {
  movie: IHistory,
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>
}

const HistoryMovieDesktop = ({ movie, history, setHistory } : Props) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  // Handle deleting movie from history
  const handleDeleteFromHistory = () => {
    if (movie !== undefined && user.sub !== '') {
      deleteHistoryMovie(user.sub, movie._id);
      // Update UI to show array with removed movie
      setHistory(history.filter(person => person.user_id === user.sub)
        .filter(historyMovie => historyMovie._id !== movie._id));
    }
  };

  return (
    <div className='history-item-container-desktop'>
      <div className='history-img-title-container-desktop'>
        <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
        <p className='history-movie-title-desktop'>{movie.title}</p>
      </div>
      <p className='history-watch-date-container-desktop'>{format(parseISO(`${movie.watch_date}`), 'd LLL yyyy')}</p>
      <div className='history-points-container-desktop'>
        <img src={PopcornPoints} alt="Popcorn points"/>
        <p>{movie.points}</p>
      </div>
      <div className='history-rating-container-desktop'>
        <img src={RatingStar} alt="Rating star" />
        <p>{movie.user_rating}</p>
      </div>
      {movie.rewatch &&
      <div className='history-rewatch-container-desktop'>
        <img src={WhiteTick} alt="Rewatch" />
      </div>
      }
      <button 
        type='button' 
        className='history-white-dots' 
        onClick={() => setShowDropdown(!showDropdown)}>
        <img  src={WhiteDots} alt="Open dropdown" />
      </button>
      {showDropdown && 
        <div className='history-dropdown-container'>
          <button className='history-dropdown-button' type='button'>
            <img src={EditIcon} alt="Edit movie" />
            <p>Edit</p>
          </button>
          <button className='history-dropdown-button' type='button' onClick={handleDeleteFromHistory}>
            <img src={DeleteIcon} alt="Delete movie" />
            <p>Delete</p> 
          </button>
        </div>
      }
    </div>
  );
};

export default HistoryMovieDesktop;