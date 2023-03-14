import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api/api';
import ITrendingMovies from '../models/ITrendingMovies';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState<ITrendingMovies[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then(data => {
        console.log(data.results);
        setTrendingMovies(data.results.slice(0, 15));
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
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        slidesPerView={4.5}
      >
        {!loading && trendingMovies?.map(movie => (
          <SwiperSlide key={movie.id}>
            <img src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="" loading='lazy'/>
          </SwiperSlide>   
        ))}
      </Swiper>
    </section>
  );
};

export default Trending;