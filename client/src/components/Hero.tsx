import { useEffect, useState } from 'react';
import { getMoviesInTheatre } from '../api/api';
import IMoviesInTheatre from '../models/IMoviesInTheatre';

const Hero = () => {
  const [moviesInTheatre, setMoviesInTheatre] = useState<IMoviesInTheatre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from TMDB api
  useEffect(() => {
    setLoading(true);
    getMoviesInTheatre()
      .then(data => {
        console.log(data.results);
        setMoviesInTheatre(data.results.slice(0, 6));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="hero-container">
      {!loading && moviesInTheatre.map(movie => (
        <div key={movie.id}>
          <p>{movie.title}</p>
        </div>
      ))}
    </section>
  );
};

export default Hero;