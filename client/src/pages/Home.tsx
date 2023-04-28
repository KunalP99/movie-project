import Hero from '../components/home/Hero';
import Trending from '../components/home/Trending';
import InTheatres from '../components/home/InTheatres';
import PopularStars from '../components/home/PopularStars';

// Models
import { WatchlistProps } from '../models/IWatchlist';

const Home = ({ handleCreateWatchlistMovie, handleDeleteWatchlistMovie, watchlist } : WatchlistProps) => {
  return (
    <div className='content'>
      <section className="home-container">
        <Hero 
          handleCreateWatchlistMovie={handleCreateWatchlistMovie} 
          handleDeleteWatchlistMovie={handleDeleteWatchlistMovie} 
          watchlist={watchlist} />
        <div className='home-content-container'>
          <Trending />
          <InTheatres />
          <PopularStars />
        </div>
      </section>
    </div>
  );
};

export default Home;