import { useContext } from 'react';
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';

// Images
import HistoryIcon from '../../images/white-history-icon.svg';
import DeleteIcon from '../../images/delete-icon.svg';

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
}

const WatchlistMovie = ({ movie, handleDeleteWatchlistMovie, watchlist, setWatchlist } : Props) => {
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
          <button type='button'>
            <img src={HistoryIcon} alt="Add movie to history" />
          </button>
        </div>
      </div>
    </>
  );
};

export default WatchlistMovie;