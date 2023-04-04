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
      <h1 style={{ marginTop: '200px' }}>Watchlist</h1>
      {!loading && watchlist.filter(person => person.user_id === user.sub).map(movie => (
        <>
          <p key={movie.movieId}>{movie.title}</p>
        </>
      ))}
    </section> 
  );
};

export default Watchlist;