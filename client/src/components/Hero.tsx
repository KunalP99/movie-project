import { useEffect, useState } from 'react';
import { getMoviesInTheatre } from '../api/api';
import IMoviesInTheatre from '../models/IMoviesInTheatre';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';

// Get width of the current window
const getWindowDimensions = () => {
  const { innerWidth: width } = window;
  return {
    width
  };
};

// Fire resize event and set the dimensions each time resize event occurs
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const Hero = () => {
  const [moviesInTheatre, setMoviesInTheatre] = useState<IMoviesInTheatre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { width } = useWindowDimensions();

  // Fetch data from TMDB api
  useEffect(() => {
    setLoading(true);
    getMoviesInTheatre()
      .then(data => {
        console.log(data.results);
        setMoviesInTheatre(data.results.slice(0, 6));
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
            <img src={width > 800 ? `http://image.tmdb.org/t/p/original/${movie.backdrop_path}` : `http://image.tmdb.org/t/p/w780/${movie.poster_path}`} alt={movie.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;