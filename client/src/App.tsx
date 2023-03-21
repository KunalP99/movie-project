import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:movieId' element={<MovieDetails />} />
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
