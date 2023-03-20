import Hero from '../components/home/Hero';
import Trending from '../components/home/Trending';
import InTheatres from '../components/home/InTheatres';

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