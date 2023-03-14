import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api/api';
import ITrendingMovies from '../models/ITrendingMovies';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState<ITrendingMovies[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then(data => {
        console.log(data.results);
        setTrendingMovies(data.results.slice(0, 10));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="trending-container">
      <h2>Trending</h2>
    </section>
  );
};

export default Trending;