import { useEffect, useState } from 'react';
import { getMoviesInTheatre } from '../../api/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

// Models
import IHeroMovies from '../../models/IHeroMovies';
import IHandleCreateWatchlistMovie from '../../models/IHandleCreateWatchlistMovie';

// Images
import RatingStar from '../../images/rating-star.svg';
import WhitePlus from '../../images/white-plus.svg';
import WhiteArrow from '../../images/white-arrow.svg';

const Hero = ({ handleCreateWatchlistMovie } : IHandleCreateWatchlistMovie) => {
  const [moviesInTheatre, setMoviesInTheatre] = useState<IHeroMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    
    // Get 5 movies in theatre
    getMoviesInTheatre(1)
      .then(data => setMoviesInTheatre(data.results.slice(0, 5)))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="hero-container">
      <Swiper 
        pagination={true}
        loop={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 9000
        }}
      >
        {!loading && moviesInTheatre.map(movie => (
          <SwiperSlide key={movie.id}>
            <div className='banner-foreground-overlay'></div>
            <img className='hero-banner-img' src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
            <div className='hero-movie-information-container'>
              <div className='hero-rating-container'>
                <img src={RatingStar} alt='Rating star' />
                <p>{movie.vote_average}</p>
              </div>
              <div className='hero-title'>
                <h1>{movie.title}</h1>
              </div>
              <div className='hero-overview'>
                <p>{movie.overview}</p>
              </div>
              <div className='hero-btn-container'>
                <button className='add-to-watchlist-btn'>
                  Add to Watchlist 
                  <img src={WhitePlus} alt={`Add ${movie.title} to Watchlist`} /></button>
                <Link className='view-more-btn secondary-btn' to={`/movie/${movie.id}`}>
                  View more 
                  <img src={WhiteArrow} alt={`View more information about ${movie.title}`} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;