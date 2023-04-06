import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import ProfileWidget from '../components/widgets/ProfileWidget';

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

  return (
    <section className="watchlist-container">
      <ProfileWidget watchlist={watchlist}/>
      <h2>Your Watchlist</h2>
      <div className='watchlist-movies-container'>
        {!loading && watchlist.filter(person => person.user_id === user.sub).map(movie => (
          <Link to={`/movie/${movie.movieId}`} className='watchlist-movie-container' key={movie.movieId} title={movie.title}>
            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} />
          </Link>
        ))}
      </div>

    </section> 
  );
};

export default Watchlist;