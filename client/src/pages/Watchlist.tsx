import { IHandleGetWatchlistMovies } from '../models/IWatchlist';


interface Props {
  watchlist: IHandleGetWatchlistMovies[],
  loading: boolean,
}

const Watchlist = ({ watchlist, loading} : Props) => {
  return (
    <section className="watchlist-container">
      <h1 style={{ marginTop: '200px' }}>Watchlist</h1>
      {!loading && watchlist.map(movie => (
        <p key={movie.movieId}>{movie.title}</p>
      ))}
    </section> 
  );
};

export default Watchlist;