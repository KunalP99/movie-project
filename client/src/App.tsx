import Home from './components/Home';
import Header from './components/Header';


function App() {
  return (
    <div className="main-container">
      <Header />
      <div className='content'>
        <Home />
      </div>
    </div>
  );
}

export default App;
