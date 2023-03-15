import Hero from './Hero';
import Trending from './Trending';

const Home = () => {
  return (
    <section className="home-container">
      <Hero />
      <div className='home-content-container'>
        <Trending />
      </div>
    </section>
  );
};

export default Home;