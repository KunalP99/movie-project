import { useEffect, useState } from 'react';
import { getMoviesInTheatre } from '../../api/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';

// Components 
import HeroMovies from '../hero/HeroMovies';

// Models
import IHeroMovies from '../../models/IHeroMovies';
import { WatchlistProps } from '../../models/IWatchlist';

const Hero = ({ handleCreateWatchlistMovie, handleDeleteWatchlistMovie, watchlist } : WatchlistProps) => {
  const [moviesInTheatre, setMoviesInTheatre] = useState<IHeroMovies[]>([]);

  useEffect(() => {
    // Get 5 movies in theatre
    getMoviesInTheatre(1)
      .then(data => setMoviesInTheatre(data.results.slice(0, 5)))
      .catch(err => console.log(err.message));
  }, [watchlist]);

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
        {moviesInTheatre && moviesInTheatre.map(movie => (
          <SwiperSlide key={movie.id}>
            <HeroMovies 
              movie={movie} 
              handleCreateWatchlistMovie={handleCreateWatchlistMovie} 
              handleDeleteWatchlistMovie={handleDeleteWatchlistMovie} 
              watchlist={watchlist} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;