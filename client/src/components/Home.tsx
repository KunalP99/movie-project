import Hero from './Hero';
import Trending from './Trending';
import InTheatres from './InTheatres';

const Home = () => {
  return (
    <section className="home-container">
      <Hero />
      <div className='home-content-container'>
        <Trending />
        <InTheatres />
      </div>
    </section>
  );
};

export default Home;