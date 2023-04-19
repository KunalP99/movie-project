import { Fragment } from 'react';
import { format, parseISO } from 'date-fns';

// Components
import ProfileWidget from '../components/widgets/ProfileWidget';
import HistoryMovieDesktop from '../components/history/HistoryMovieDesktop';

// Images
import RatingStar from '../images/rating-star.svg';
import PopcornPoints from '../images/popcorn-points.svg';
import WhiteTick from '../images/white-tick.svg';

// Models
import IHistory from '../models/IHistory';
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';

interface Props {
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
  watchlist: IHandleGetWatchlistMovies[],
}

const History = ({ history, setHistory, watchlist } : Props) => {
  return (
    <section className="history-container">
      <ProfileWidget watchlist={watchlist} history={history} />
      <h2>History</h2>
      <div className='history-grid-container'>
        <div className='history-grid-headings'>
          <h3>Movie</h3>
          <h3>Date</h3>
          <h3>Points</h3>
          <h3>My Rating</h3>
          <h3>Rewatch</h3>
        </div>
        {history && history.map((movie) => (
          <Fragment key={movie._id}>
            <div key={movie._id} className='history-item-container'>
              <a 
                key={movie._id} 
                href={`/movie/${movie.movie_id}`}
                title={movie.title}>
                <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
              </a>
              <div className='history-item-info-container'>
                <div className='history-item-main-info-container'>
                  <p className='history-watch-date'>{format(parseISO(`${movie.watch_date}`), 'd LLL yyyy')}</p>
                  <div className='history-points-container'>
                    <img src={PopcornPoints} alt="Popcorn points"/>
                    <p>{movie.points}</p>
                  </div>
                  <div className='history-rating-container'>
                    <img src={RatingStar} alt="Rating star" />
                    <p>{movie.user_rating}</p>
                  </div>
                  {movie.rewatch && 
                    <div className='history-rewatch-container'>
                      <img src={WhiteTick} alt="Rewatch" />
                      <p>Rewatch</p>
                    </div>
                  }
                </div>
                <p className='history-movie-title'>{movie.title}</p>
              </div>
            </div>
            <HistoryMovieDesktop movie={movie} history={history} setHistory={setHistory} />
            <div className='white-underline'></div>
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default History;