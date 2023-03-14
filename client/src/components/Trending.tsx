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
        slidesPerView={2.5}
        breakpoints={{
          200: {
            slidesPerView: 1.3
          },
          300: {
            slidesPerView: 2.3
          },
          375: {
            slidesPerView: 2.5
          },
          500: {
            slidesPerView: 2.2
          },
          650: {
            slidesPerView: 2.6
          },
          700: {
            slidesPerView: 3.1
          },
          1000: {
            slidesPerView: 3.8
          },
          1250: {
            slidesPerView: 5.3
          },
          1600: {
            slidesPerView: 4.5
          },
          2300: {
            slidesPerView: 5.5
          }
        }}
      >
        <div className='shadow-overlay-left'></div>
        <div className='shadow-overlay-right'></div>
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