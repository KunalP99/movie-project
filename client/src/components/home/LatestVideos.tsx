import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper';
import { getUpcomingMovies, getMovieVideos } from '../../api/api';

// Components
import UpcomingMoviesContainer from './UpcomingMoviesContainer';

// Models
import IMovieVideos from '../../models/IMovieVideos';

export interface IUpcomingMovies {
  title: string,
  overview: string,
  release_date: string,
  id: number
}

const LatestVideos = () => {
  const [upcomingMovies, setUpcomingMovies] = useState<IUpcomingMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    setLoading(true);

    getUpcomingMovies()
      .then(data => setUpcomingMovies(data.results))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <section className="trailers-container">
      <h2>Latest Videos</h2>
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
        {!loading && 
        <>
          {upcomingMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <UpcomingMoviesContainer movie={movie} />
            </SwiperSlide>
          ))}
        </>
        }
      </Swiper>
    </section>
  );
};

export default LatestVideos;