import Hero from '../components/home/Hero';
import Trending from '../components/home/Trending';
import InTheatres from '../components/home/InTheatres';

// Models
import { IHandleCreateWatchlistMovie } from '../models/IWatchlist';

const Home = ({ handleCreateWatchlistMovie } : IHandleCreateWatchlistMovie) => {
  return (
    <div className='content'>
      <section className="home-container">
        <Hero handleCreateWatchlistMovie={handleCreateWatchlistMovie} />
        <div className='home-content-container'>
          <Trending />
          <InTheatres />
        </div>
      </section>
    </div>
  );
};

export default Home;