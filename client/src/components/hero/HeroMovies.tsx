import { useState, useEffect, useContext } from 'react';

// Images
import RatingStar from '../../images/rating-star.svg';
import WhitePlus from '../../images/white-plus.svg';
import WhiteArrow from '../../images/white-arrow.svg';

// Models
import IHeroMovies from '../../models/IHeroMovies';
import { IHandleGetWatchlistMovies } from '../../models/IWatchlist';

// Context
import { UserContext } from '../context/UserContext';

interface Props {
  movie: IHeroMovies,
  handleCreateWatchlistMovie(
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string,
    runtime: number,
    user_id: string): Promise<void>,
    handleDeleteWatchlistMovie(
      userId: string,
      movieId: number
    ): Promise<void>,
    watchlist: IHandleGetWatchlistMovies[]
}

const HeroMovies = ({ movie, handleCreateWatchlistMovie, handleDeleteWatchlistMovie, watchlist } : Props) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const { user } = useContext(UserContext);

  // Check if movie is already in watchlist 
  useEffect(() => {
    watchlist.filter(person => person.user_id === user.sub).map(watchlistMovie => {
      if (movie.id === watchlistMovie.movieId) {
        setInWatchlist(true);
      }
    });
  }, [watchlist]);

  // Handle adding movie to watchlist
  const handleAddToWatchlist = () => {
    if (movie !== undefined) {
      handleCreateWatchlistMovie(
        movie.id, 
        movie.title, 
        movie.overview, 
        movie.vote_average, 
        movie.poster_path, 
        movie.release_date,
        movie.runtime,
        user.sub
      );
      setInWatchlist(true);
    }
  };

  // Handle deleting movie from watchlist
  const handleDeleteFromWatchlist = () => {
    if (movie !== undefined) {
      handleDeleteWatchlistMovie(user.sub, movie.id);
      setInWatchlist(false);
    }
  };

  return (
    <>
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
          {!inWatchlist ?
            <button className='add-to-watchlist-btn primary-btn' onClick={handleAddToWatchlist}>
              Add to Watchlist 
              <img src={WhitePlus} alt={`Add ${movie.title} to Watchlist`} /></button> 
            :
            <button 
              className='remove-from-watchlist-btn primary-btn' 
              onClick={handleDeleteFromWatchlist}>
                Remove from watchlist
            </button>
          }
          <a className='view-more-btn secondary-btn' href={`/movie/${movie.id}`}>
            View more 
            <img src={WhiteArrow} alt={`View more information about ${movie.title}`} />
          </a>
        </div>
      </div>
    </>
  );
};

export default HeroMovies;