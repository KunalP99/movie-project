import Home from './components/Home';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:movieId' element={<MovieDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
