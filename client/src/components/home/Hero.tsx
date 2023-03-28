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

const Hero = ({ handleCreateWatchlistMovie, watchlist } : WatchlistProps) => {
  const [moviesInTheatre, setMoviesInTheatre] = useState<IHeroMovies[]>([]);

  useEffect(() => {
    // Get 5 movies in theatre
    getMoviesInTheatre(1)
      .then(data => setMoviesInTheatre(data.results.slice(0, 5)))
      .catch(err => console.log(err.message));
  }, []);

  // Check if movie on the hero component is inside the watchlist; if it is, add a property 'inWatchlist' set to true else just return original object
  useEffect(() => {
    watchlist.map(watchlistMovie => {
      setMoviesInTheatre(prevState => prevState.map(movieInTheatre => movieInTheatre.id === watchlistMovie.movieId ? 
        {...movieInTheatre, inWatchlist: true} : movieInTheatre));
    });
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
            <HeroMovies movie={movie} handleCreateWatchlistMovie={handleCreateWatchlistMovie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;