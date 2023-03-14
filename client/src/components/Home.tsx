import Hero from './Hero';
import Header from './Header';

const Home = () => {
  return (
    <section className="home-container">
      <Header />
      <div className='content'>
        <Hero />
      </div>
    </section>
  );
};

export default Home;