import { useState, useEffect, Fragment } from 'react';
import { format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import ProfileWidget from '../components/widgets/ProfileWidget';
import HistoryMovieDesktop from '../components/history/HistoryMovieDesktop';

// Images
import RatingStar from '../images/rating-star.svg';
import PopcornPoints from '../images/popcorn-points.svg';
import WhiteTick from '../images/white-tick.svg';
import ImageNotFound from '../images/image-not-found.svg';

// Models
import IHistory from '../models/IHistory';
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';

interface Props {
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
  watchlist: IHandleGetWatchlistMovies[],
}

const History = ({ history, setHistory, watchlist } : Props) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const successNotif = () => toast.success('Movie successfully updated!');
  const errorNotif = () => toast.error('Something went wrong!');

  // Checks to see if form is submitted and shows toast if true
  useEffect(() => {
    if (formSubmitted) {
      if (!error) {
        successNotif();
      } else {
        errorNotif();
        setError(false);
      }
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

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
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}` : ImageNotFound} alt={`Poster for ${movie.title}`} />
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
            <HistoryMovieDesktop 
              movie={movie} 
              history={history} 
              setHistory={setHistory} 
              setFormSubmitted={setFormSubmitted}
              setError={setError} />
            <div className='white-underline'></div>
          </Fragment>
        ))}
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default History;