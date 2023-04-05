import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper';
import { getUpcomingMovies } from '../../api/api';

// Components
import LatestVideo from './LatestVideo';

// Images
import WhiteArrow from '../../images/white-arrow.svg';

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
      .then(data => setUpcomingMovies(data.results.slice(4, 15)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <section className="latest-videos-container">
      <h2>Latest Videos</h2>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={'auto'}
        spaceBetween={16}
        loop={true}
        breakpoints={{
          375: {
            slidesPerView: 1.1
          },
          500: {
            slidesPerView: 1.4
          },
          900: {
            slidesPerView: 2.1
          },
          1300: {
            slidesPerView: 2.5,
          },
          1500: {
            slidesPerView: 3.5,
            spaceBetween: 60
          }
        }}
  
      >
        {!loading && 
        <>
          {upcomingMovies.map(movie => (
            <SwiperSlide key={movie.id}>
              <LatestVideo movie={movie} />
            </SwiperSlide>
          ))}
        </>
        }
      </Swiper>
      <div className='swiper-button-prev-unique-container'>
        <button className='swiper-button-prev-unique' onClick={() => swiperRef.current?.slidePrev()}>
          <img src={WhiteArrow} alt="Prev" />
        </button>
      </div>
      <div className='swiper-button-next-unique-container'>
        <button className='swiper-button-next-unique' onClick={() => swiperRef.current?.slideNext()}>
          <img src={WhiteArrow} alt="Next" />
        </button>
      </div>
    </section>
  );
};

export default LatestVideos;