import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getWatchlistMovies, createWatchlistMovie } from './api/mongoapi';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components
import Home from './pages/Home';
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';

// Models
import { IHandleGetWatchlistMovies } from './models/IWatchlist';

function App() {
  const [watchlist, setWatchlist] = useState<IHandleGetWatchlistMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    setWatchlist([...watchlist, watchlistMovie]);
  };

  // Get watchlist movies from backend
  useEffect(() => {
    setLoading(true);
    getWatchlistMovies()
      .then(data => setWatchlist(data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="main-container">
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
        <Header watchlist={watchlist} setWatchlist={setWatchlist} />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home handleCreateWatchlistMovie={handleCreateWatchlistMovie} watchlist={watchlist} />} />
            <Route path='/movie/:movieId' element={<MovieDetails handleCreateWatchlistMovie={handleCreateWatchlistMovie} watchlist={watchlist} />} />
            <Route path='/watchlist' element={<Watchlist watchlist={watchlist} loading={loading} />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;