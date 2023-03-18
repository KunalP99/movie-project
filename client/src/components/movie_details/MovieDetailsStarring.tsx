import { useState, useEffect, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type SwiperCore from 'swiper';
import { getPersonMovieCredits } from '../../api/api';
import ITopCast from '../../models/ITopCast';
import IMoviesStarring from '../../models/IMoviesStarring';

interface Props {
  topCast: ITopCast[],
  loading: boolean
}

const MovieDetailsStarring = ({ topCast, loading } : Props) => {
  const swiperRef = useRef<SwiperCore>();
  const [movies, setMovies] = useState<IMoviesStarring[]>([]);

  useEffect(() => {
    // Once topcast has loaded check if the person is featured in at least 6 movies
    if (topCast.length > 0)  {
      getPersonMovieCredits(topCast[0].id.toString())
        .then(data => {
          if (data.cast.length > 5) {
            console.log(data.cast.slice(0, 6));
            setMovies(data.cast.slice(0, 6));
          }
        })
        .catch(err => console.log(err));
    } 
  },[topCast]);
  
  return (
    <section className="movie-details-starring-container">
      {topCast.length > 0 && <h2>{ `Movies Starring ${topCast[0].name}`}</h2>}
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1.2}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.id}>
            <div className='movie-details-starring-movie-container'>
              <h1>{movie.title}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MovieDetailsStarring;