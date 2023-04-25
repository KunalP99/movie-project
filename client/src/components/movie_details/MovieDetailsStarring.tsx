import { useState, useEffect, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import type SwiperCore from 'swiper';
import { getPersonMovieCredits } from '../../api/api';
import { useParams } from 'react-router-dom';

// Models
import ITopCast from '../../models/ITopCast';
import IMoviesStarring from '../../models/IMoviesStarring';

// Images 
import WhiteArrow from '../../images/white-arrow.svg';
import ImageNotFoundBanner from '../../images/image-not-found-banner.svg';

interface Props {
  topCast: ITopCast[],
}

interface CastMovieId {
  id: string
}

type MovieParams = {
  movieId: string;
}

const randomNumber = (topCastLength: number) => {
  if (topCastLength < 2) {
    return 0;
  } else if (topCastLength === 2) {
    return Math.floor(Math.random() * 1);
  } else {
    return Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  } 
};

const MovieDetailsStarring = ({ topCast } : Props) => {
  const { movieId } = useParams<MovieParams>();
  const swiperRef = useRef<SwiperCore>();
  const [movies, setMovies] = useState<IMoviesStarring[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [randomNum] = useState(randomNumber(topCast.length));

  useEffect(() => {    
    // Once topcast has loaded check if the person is featured in at least 6 movies
    setDataLoaded(false);
    
    if (topCast.length > 0)  {
      getPersonMovieCredits(topCast[randomNum].id.toString())
        .then(data => {
          if (data.cast.length > 5) {
            setMovies(data.cast.filter((movie: CastMovieId) => movie.id != movieId).slice(0, 6));
            setDataLoaded(true);
          }
        })
        .catch(err => console.log(err));
    } 
  },[topCast]);
  
  return (
    <section className="movie-details-starring-container">
      {dataLoaded && 
      <div>
        <h2>{ `Movies Starring ${topCast[randomNum].name}`}</h2>
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={'auto'}
          loop={true}
          spaceBetween={16}
          breakpoints={{
            375: {
              slidesPerView: 1.1
            },
            700: {
              slidesPerView: 1.6
            },
            1000: {
              slidesPerView:  2.2
            },
            1800: {
              slidesPerView: 2.5
            },
            2000: {
              slidesPerView: 3.5
            }
          }}
        >
          {movies.map(movie => (
            <SwiperSlide key={movie.id}>
              <a className='link' href={`/movie/${movie.id}`}>
                <div className='movie-details-starring-movie-container'>
                  <img src={movie.backdrop_path ? `http://image.tmdb.org/t/p/w780/${movie.backdrop_path}` : ImageNotFoundBanner} title={`${movie.title}`} alt={`Backdrop for ${movie.title}`} /> 
                  <p>{movie.title}</p>
                </div>
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
      </div>
      }
    </section>
  );
};

export default MovieDetailsStarring;