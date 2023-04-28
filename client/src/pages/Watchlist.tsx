import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import ProfileWidget from '../components/widgets/ProfileWidget';
import WatchlistMovie from '../components/watchlist/WatchlistMovie';

// Models
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';
import IHistory from '../models/IHistory';

interface Props {
  watchlist: IHandleGetWatchlistMovies[],
  setWatchlist: React.Dispatch<React.SetStateAction<IHandleGetWatchlistMovies[]>>,
  loading: boolean,
  handleDeleteWatchlistMovie(
      userId: string,
      movieId: number
    ): Promise<void>,
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>
}

const Watchlist = ({ watchlist, setWatchlist, loading, handleDeleteWatchlistMovie, history, setHistory } : Props) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const successNotif = () => toast.success('Movie added to History!');
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
    <section className="watchlist-container">
      <ProfileWidget 
        watchlist={watchlist} 
        history={history} />
      <h2>Your Watchlist</h2>
      <div className='watchlist-movies-container'>
        {!loading && watchlist.map(movie => (
          <WatchlistMovie
            key={movie.movieId} 
            movie={movie} 
            handleDeleteWatchlistMovie={handleDeleteWatchlistMovie} 
            watchlist={watchlist}
            setWatchlist={setWatchlist}
            history={history}
            setHistory={setHistory}
            setFormSubmitted={setFormSubmitted}
            setError={setError} />
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

export default Watchlist;