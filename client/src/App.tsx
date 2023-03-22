import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Home from './pages/Home';
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';

function App() {
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

  useEffect(() => {

    fetch('http://localhost:5000/watchlist-movies'); 


  }, []);

  return (
    <div className="main-container">
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home handleCreateWatchlistMovie={handleCreateWatchlistMovie} />} />
          <Route path='/movie/:movieId' element={<MovieDetails handleCreateWatchlistMovie={handleCreateWatchlistMovie} />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
