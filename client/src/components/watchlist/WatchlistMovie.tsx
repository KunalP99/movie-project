import { useState, useContext } from 'react';
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';

// Components
import HistoryAddForm from '../forms/HistoryAddForm';

// Images
import HistoryIcon from '../../images/white-history-icon.svg';
import DeleteIcon from '../../images/delete-icon.svg';

// Models
import IHistory from '../../models/IHistory';

// Context
import { UserContext } from '../context/UserContext';

interface Props {
  movie: IHandleGetWatchlistMovies,
  watchlist: IHandleGetWatchlistMovies[],
  setWatchlist: React.Dispatch<React.SetStateAction<IHandleGetWatchlistMovies[]>>,
  handleDeleteWatchlistMovie(
    userId: string,
    movieId: number
  ): Promise<void>,
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>
}

const WatchlistMovie = ({ movie, handleDeleteWatchlistMovie, watchlist, setWatchlist, history, setHistory } : Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fromWatchlist = true;
  const { user } = useContext(UserContext);

  // Handle deleting movie from watchlist
  const handleDeleteFromWatchlist = () => {
    if (movie !== undefined) {
      handleDeleteWatchlistMovie(user.sub, movie.movieId);
      // Update UI to show array with removed movie
      setWatchlist(watchlist.filter(person => person.user_id === user.sub)
        .filter(watchlistMovie => watchlistMovie.movieId !== movie.movieId));
    }
  };

  return (
    <>
      <div className='watchlist-movie-container' >
        <a 
          key={movie.movieId} 
          href={`/movie/${movie.movieId}`} 
          title={movie.title}>
          <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
        </a>
        <div className='watchlist-movie-btn-container'>
          <button type='button' onClick={handleDeleteFromWatchlist}>
            <img src={DeleteIcon} alt="Delete movie from watchlist" />
          </button>
          <button type='button' onClick={() => setShowModal(true)}>
            <img src={HistoryIcon} alt="Add movie to history" />
          </button>
        </div>
      </div>
      {showModal &&
        <HistoryAddForm 
          setShowModal={setShowModal} 
          id={movie.movieId}
          title={movie.title}
          posterPath={movie.poster_path}
          runtime={movie.runtime}
          setFormSubmitted={setFormSubmitted}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
          history={history}
          setHistory={setHistory}
          setError={setError}
          fromWatchlist={fromWatchlist}
        />
      }
    </>
  );
};

export default WatchlistMovie;