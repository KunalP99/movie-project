import { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { 
  getWatchlistMovies, 
  createWatchlistMovie, 
  deleteWatchlistMovie,
  getHistoryMovies } from './api/mongoapi';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import Home from './pages/Home';
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';
import History from './pages/History';

// Models
import { IHandleGetWatchlistMovies } from './models/IWatchlist';
import IHistory from './models/IHistory';

// Context
import { UserContext } from './components/context/UserContext';

function App() {
  const [watchlist, setWatchlist] = useState<IHandleGetWatchlistMovies[]>([]);
  const [history, setHistory] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);

  // Add movie to watchlist
  const handleCreateWatchlistMovie = async (
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string,
    user_id: string
  ) => {
    const watchlistMovie = await createWatchlistMovie(movieId, title, overview, rating, poster_path, release_date, user_id);
    // Keep UI up to date when a new movie is added to watchlist 
    setWatchlist([watchlistMovie, ...watchlist]);
  };

  // Delete movie from watchlist
  const handleDeleteWatchlistMovie =  async (userId: string, movieId: number) => {
    await deleteWatchlistMovie(userId, movieId);
  };

  // Get watchlist movies from backend
  useEffect(() => {
    setLoading(true);
    getWatchlistMovies()
      .then(data => setWatchlist(data))
      .catch(err => console.log(err.message));

    if (user.sub !== '') {
      getHistoryMovies(user.sub)
        .then(data => setHistory(data))
        .catch(err => console.log(err.message));
    }

    setLoading(false);
  }, [user]);

  return (
    <div className="main-container">
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
        <Header watchlist={watchlist} setWatchlist={setWatchlist} />
        <div className='content'>
          <Routes>
            <Route 
              path='/' 
              element=
                {<Home 
                  handleCreateWatchlistMovie={handleCreateWatchlistMovie} 
                  handleDeleteWatchlistMovie={handleDeleteWatchlistMovie} 
                  watchlist={watchlist} />} />
            <Route 
              path='/movie/:movieId' 
              element=
                {<MovieDetails 
                  handleCreateWatchlistMovie={handleCreateWatchlistMovie} 
                  handleDeleteWatchlistMovie={handleDeleteWatchlistMovie} 
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                  history={history}
                  setHistory={setHistory} />} />
            <Route 
              path='/watchlist' 
              element=
                {<Watchlist 
                  watchlist={watchlist} 
                  loading={loading}
                  handleDeleteWatchlistMovie={handleDeleteWatchlistMovie}
                  setWatchlist={setWatchlist}
                  history={history}
                  setHistory={setHistory}
                />} />
            <Route path='/search' element={<Search />} />
            <Route path='/history' element={<History 
              history={history}
              setHistory={setHistory}
              watchlist={watchlist}
            />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;