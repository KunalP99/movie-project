import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getWatchlistMovies } from './api/mongoapi';

// Components
import Home from './pages/Home';
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';

// Models
import { IHandleGetWatchlistMovies } from './models/IWatchlist';

function App() {
  const [watchlist, setWatchlist] = useState<IHandleGetWatchlistMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCreateWatchlistMovie = (movieId: number, title: string, overview: string, rating: number, poster_path: string, release_date: string ) => {
    fetch('http://localhost:5000/watchlist-movie', {
      method: 'POST',
      body: JSON.stringify({
        movieId,
        title,
        overview,
        rating,
        poster_path, 
        release_date
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
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
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home handleCreateWatchlistMovie={handleCreateWatchlistMovie} />} />
          <Route path='/movie/:movieId' element={<MovieDetails handleCreateWatchlistMovie={handleCreateWatchlistMovie} />} />
          <Route path='/watchlist' element={<Watchlist watchlist={watchlist} loading={loading} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
