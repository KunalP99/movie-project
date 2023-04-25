import { useState, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import { handleDeleteFromHistory } from '../../helpers/historyHelpers';

// Components
import HistoryEditForm from '../forms/HistoryEditForm';

// Images
import RatingStar from '../../images/rating-star.svg';
import PopcornPoints from '../../images/popcorn-points.svg';
import WhiteTick from '../../images/white-tick.svg';
import WhiteDots from '../../images/more_horiz.svg';
import EditIcon from '../../images/edit-icon.svg';
import DeleteIcon from '../../images/trash-icon.svg';
import ImageNotFound from '../../images/image-not-found.svg';

// Models
import IHistory from '../../models/IHistory';

// Context
import { UserContext } from '../../components/context/UserContext';

interface Props {
  movie: IHistory,
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryMovieDesktop = ({ movie, history, setHistory, setFormSubmitted, setError } : Props) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  return (
    <div className='history-item-container-desktop'>
      <div className='history-img-title-container-desktop'>
        <a href={`/movie/${movie.movie_id}`} >
          <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}` : ImageNotFound} alt={`Poster for ${movie.title}`} />
        </a>
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
      <>
        <div className='history-dropdown-background' onClick={() => setShowDropdown(false)}></div>
        <div className='history-dropdown-container'>
          <button className='history-dropdown-button' type='button' onClick={() => setShowEditForm(true)}>
            <img src={EditIcon} alt="Edit movie" />
            <p>Edit</p>
          </button>
          <button 
            className='history-dropdown-button' 
            type='button' 
            onClick={() => handleDeleteFromHistory(movie, user.sub, history, setHistory, setShowDropdown)}>
            <img src={DeleteIcon} alt="Delete movie" />
            <p>Delete</p> 
          </button>
        </div>
      </>
      }
      {showEditForm && 
        <HistoryEditForm 
          setShowEditForm={setShowEditForm}
          _id={movie._id} 
          title={movie.title}
          posterPath={movie.poster_path}
          watch_date={movie.watch_date}
          user_rating={movie.user_rating}
          user_rewatch={movie.rewatch}
          setFormSubmitted={setFormSubmitted}
          setError={setError} 
        />
      }
    </div>
  );
};

export default HistoryMovieDesktop;