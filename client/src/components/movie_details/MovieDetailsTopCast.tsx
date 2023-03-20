import { useState, useEffect, useRef} from 'react';
import ITopCast from '../../models/ITopCast';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type SwiperCore from 'swiper';

// Images
import ImageNotFound from '../../images/image-not-found.svg';
import WhiteArrow from '../../images/white-arrow.svg';

interface Props {
  topCast: ITopCast[]
  loading: boolean
}

const MovieDetailsTopCast = ({ topCast, loading } : Props)  => {
  const swiperRef = useRef<SwiperCore>();
  console.log(topCast);
  return (
    <section className='movie-details-top-cast-container'>
      <h2>Top Cast</h2>
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
        {!loading && topCast.filter(person => person.order < 11).map(person => {
          return (
            <SwiperSlide key={person.id}>
              <div className='movie-details-person-container'>
                <img src={person.profile_path ? `http://image.tmdb.org/t/p/w342/${person.profile_path}` : ImageNotFound} alt={`Profile for ${person.name}`} loading='lazy' title={person.name} />
                <p className='top-cast-name' title={person.name}>{person.name}</p>
                <p title={person.character}>{person.character}</p>
              </div>
            </SwiperSlide>
          );
        })}
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

export default MovieDetailsTopCast;