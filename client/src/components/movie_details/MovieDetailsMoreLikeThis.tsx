import { useState, useEffect, useRef } from 'react';
import { getMoviesByOnGenre } from '../../api/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type SwiperCore from 'swiper';

// Models
import IGenres from '../../models/IGenres';
import ISmallSwiperMovies from '../../models/ISmallSwiperMovies';

// Images
import ImageNotFound from '../../images/image-not-found.svg';
import WhiteArrow from '../../images/white-arrow.svg';

interface Props {
  genres: IGenres[],
  loading: boolean
}

const MovieDetailsMoreLikeThis = ({ genres, loading } : Props) => {
  const [movies, setMovies] = useState<ISmallSwiperMovies[]>([]);
  const swiperRef = useRef<SwiperCore>();

  useEffect(() => {
    // Get random value based on the genres array length and get a random page from the list of movies
    getMoviesByOnGenre(genres[Math.floor(Math.random() * genres.length)].id.toString() || '', Math.floor(Math.random() * 21))
      .then(data => setMovies(data.results))
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  return (
    <section className="movie-details-more-like-this-container">
      <h2>You may also like</h2>
      {!loading &&
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
          {!loading && movies.map(movie => {
            return (
              <SwiperSlide key={movie.id}>
                <a className='link' href={`/movie/${movie.id}`}>
                  <div className='movie-details-more-like-this-movie-container'>
                    <img src={movie.poster_path ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}` : ImageNotFound} alt={`Poster for ${movie.title}`} title={movie.title} />
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      }
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

export default MovieDetailsMoreLikeThis;