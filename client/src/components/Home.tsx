import Hero from './Hero';
import Trending from './Trending';
import InTheatres from './InTheatres';

const Home = () => {
  return (
    <div className='content'>
      <section className="home-container">
        <Hero />
        <div className='home-content-container'>
          <Trending />
          <InTheatres />
        </div>
      </section>
    </div>
  );
};

export default Home;