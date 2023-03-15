import Home from './components/Home';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
