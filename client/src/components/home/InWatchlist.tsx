import { useState, useEffect, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import type SwiperCore from 'swiper';

// Images
import ImageNotFoundBanner from '../../images/image-not-found-banner.svg';

// Models
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';

interface Props {
  watchlist: IHandleGetWatchlistMovies[]
}

const InWatchlist = ({ watchlist } : Props) => {
  const swiperRef = useRef<SwiperCore>();
  
  return (
    <section className="in-watchlist-container">
      <h2>In Watchlist</h2>
      <p>Here are some movies in your watchlist</p>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={'auto'}
        loop={true}
        centeredSlides={true}
        spaceBetween={16}
        modules={[Autoplay]}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          375: {
            slidesPerView: 1.5
          },
          1800: {
            slidesPerView: 1.6
          },
        }}
      >
        {watchlist.slice(0, 5).map(movie => (
          <SwiperSlide key={movie.movieId}>
            <a href={`/movie/${movie.movieId}`}>
              <img src={movie.backdrop_path ? `http://image.tmdb.org/t/p/original/${movie.backdrop_path}` : ImageNotFoundBanner} title={`${movie.title}`} alt={`Backdrop for ${movie.title}`} /> 
            </a>

          </SwiperSlide>
        ))}

      </Swiper>
    </section>
  );
};

export default InWatchlist;