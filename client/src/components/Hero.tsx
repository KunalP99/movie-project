import { useEffect, useState } from 'react';
import { getMoviesInTheatre } from '../api/api';

const Hero = () => {
  const [moviesInTheatre, setMoviesInTheatre] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMoviesInTheatre()
      .then(data => console.log(data.results))
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="hero-container">
      
    </section>
  );
};

export default Hero;