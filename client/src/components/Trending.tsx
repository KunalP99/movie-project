import { useEffect, useState, useRef } from 'react';
import { getTrendingMovies } from '../api/api';
import ITrendingMovies from '../models/ITrendingMovies';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type SwiperCore from 'swiper';

// Images
import WhiteArrowRight from '../images/white-arrow-right.svg';
import RatingStar from '../images/rating-star.svg';

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState<ITrendingMovies[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const swiperRef = useRef<SwiperCore>();

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
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={2.5}
        loop={true}
        className='small-swiper'
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
          800: {
            slidesPerView: 3.3
          },
          1000: {
            slidesPerView: 3.8
          },
          1250: {
            slidesPerView: 4.8
          },
          1500: {
            slidesPerView: 3.5
          },
          1600: {
            slidesPerView: 4.3
          },
          1700: {
            slidesPerView: 4.5
          },
          2300: {
            slidesPerView: 5.5
          }
        }}
      >
        {!loading && trendingMovies?.map(movie => (
          <SwiperSlide key={movie.id}>
            <div>
              <div className='trending-movies-rating-container'>
                <img src={RatingStar} alt='Rating star' />
                <p>{Math.round(movie.vote_average * 10) / 10}</p>
              </div>
              <img src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={`${movie.title}`} loading='lazy'/>
            </div>

          </SwiperSlide>   
        ))}
      </Swiper>

      <div className='swiper-button-prev-unique-container'>
        <button className='swiper-button-prev-unique' onClick={() => swiperRef.current?.slidePrev()}>
          <img src={WhiteArrowRight} alt="Prev" />
        </button>
      </div>
      <div className='swiper-button-next-unique-container'>
        <button className='swiper-button-next-unique' onClick={() => swiperRef.current?.slideNext()}>
          <img src={WhiteArrowRight} alt="Next" />
        </button>
      </div>
    </section>
  );
};

export default Trending;