import { useContext } from 'react';

// Components
import ProfileWidget from '../components/widgets/ProfileWidget';
import WatchlistMovie from '../components/watchlist/WatchlistMovie';

// Models
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';

// Context
import { UserContext } from '../components/context/UserContext';

interface Props {
  watchlist: IHandleGetWatchlistMovies[],
  setWatchlist: React.Dispatch<React.SetStateAction<IHandleGetWatchlistMovies[]>>,
  loading: boolean,
  handleDeleteWatchlistMovie(
      userId: string,
      movieId: number
    ): Promise<void>,
}

const Watchlist = ({ watchlist, setWatchlist, loading, handleDeleteWatchlistMovie} : Props) => {
  const { user } = useContext(UserContext);

  return (
    <section className="watchlist-container">
      <ProfileWidget watchlist={watchlist}/>
      <h2>Your Watchlist</h2>
      <div className='watchlist-movies-container'>
        {!loading && watchlist.filter(person => person.user_id === user.sub).map(movie => (
          <WatchlistMovie
            key={movie.movieId} 
            movie={movie} 
            handleDeleteWatchlistMovie={handleDeleteWatchlistMovie} 
            watchlist={watchlist}
            setWatchlist={setWatchlist} />
        ))}
      </div>
    </section> 
  );
};

export default Watchlist;