import Hero from '../components/home/Hero';
import Trending from '../components/home/Trending';
import InTheatres from '../components/home/InTheatres';

// Models
import { WatchlistProps } from '../models/IWatchlist';

const Home = ({ handleCreateWatchlistMovie, watchlist } : WatchlistProps) => {
  return (
    <div className='content'>
      <section className="home-container">
        <Hero handleCreateWatchlistMovie={handleCreateWatchlistMovie} watchlist={watchlist} />
        <div className='home-content-container'>
          <Trending />
          <InTheatres />
        </div>
      </section>
    </div>
  );
};

export default Home;