import { useEffect, useContext } from 'react';

// Models
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';

// Context
import { UserContext } from '../components/context/UserContext';

interface Props {
  watchlist: IHandleGetWatchlistMovies[],
  loading: boolean,
}

const Watchlist = ({ watchlist, loading} : Props) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  return (
    <section className="watchlist-container">
      <h2>Your Watchlist</h2>
      <div className='watchlist-movies-container'>
        {!loading && watchlist.filter(person => person.user_id === user.sub).map(movie => (
          <div className='watchlist-movie-container' key={movie.movieId} title={movie.title}>
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>

    </section> 
  );
};

export default Watchlist;