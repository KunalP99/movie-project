// Components
import ProfileWidget from '../components/widgets/ProfileWidget';

// Models
import IHistory from '../models/IHistory';
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';

interface Props {
  history: IHistory[]
  watchlist: IHandleGetWatchlistMovies[],
}

const History = ({ history, watchlist } : Props) => {
  return (
    <section className="history-container" style={{ 'marginTop': '200px'}}>
      <ProfileWidget watchlist={watchlist} history={history} />
      <h2>History</h2>
      {history && history.map((movie) => (
        <div key={movie._id}>
          <p>{movie.title}</p>
        </div>
      ))}
    </section>
  );
};

export default History;