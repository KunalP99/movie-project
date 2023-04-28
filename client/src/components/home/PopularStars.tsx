import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper';
import { getPopularPeople } from '../../api/api';

// Images
import WhiteArrow from '../../images/white-arrow.svg';

// Models
import IPopularStars from '../../models/IPopularStars';

export const PopularStars = () => {
  const [popularStars, setPopularStars] = useState<IPopularStars[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    setLoading(true);
    getPopularPeople()
      .then(data => setPopularStars(data.results))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="stars-container">
      <h2>Top Stars</h2>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        className='small-circle-swiper'
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
        {!loading && popularStars.map(person => (
          <SwiperSlide key={person.id} title={person.name}>
            <a className='stars-person-container'>
              <img src={`https://image.tmdb.org/t/p/w342/${person.profile_path}`} alt={person.name} />
              <p>{person.name}</p>
            </a>
          </SwiperSlide>   
        ))}
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

export default PopularStars;