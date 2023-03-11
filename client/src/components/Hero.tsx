import { useEffect, useState } from 'react';
import { getMoviesInTheatre } from '../api/api';
import IMoviesInTheatre from '../models/IMoviesInTheatre';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';

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
      <Swiper 
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 9000
        }}
      >
        {!loading && moviesInTheatre.map(movie => (
          <SwiperSlide key={movie.id}>
            <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;