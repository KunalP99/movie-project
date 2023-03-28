import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos, getMovieCredits } from '../api/api';

// Models
import IMovieDetails from '../models/IMovieDetails';
import IGenres from '../models/IGenres';
import IMovieVideos from '../models/IMovieVideos';
import ITopCast from '../models/ITopCast';
import { WatchlistProps } from '../models/IWatchlist';


// Components
import MovieDetailsInformation from '../components/movie_details/MovieDetailsInformation';
import MovieDetailsExtraInfo from '../components/movie_details/MovieDetailsExtraInfo';
import MovieDetailsTopCast from '../components/movie_details/MovieDetailsTopCast';
import MovieDetailsStarring from '../components/movie_details/MovieDetailsStarring';
import MovieDetailsMoreLikeThis from '../components/movie_details/MovieDetailsMoreLikeThis';

// Images
import WhitePlus from '../images/white-plus.svg';
import HistoryIcon from '../images/white-history-icon.svg';
import VideoNotFound from '../images/video-not-found.svg';

type MovieParams = {
  movieId: string;
}

const MovieDetails = ({ handleCreateWatchlistMovie, watchlist } : WatchlistProps ) => {
  const { movieId } = useParams<MovieParams>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [videos, setVideos] = useState<IMovieVideos[]>([]);
  const [topCast, setTopCast] = useState<ITopCast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    
    // Get movie details for indiviual movie
    getMovieDetails(movieId || '')
      .then(data => {
        setMovieDetails(data);
        setGenres(data.genres);
      })
      .catch(err => console.log(err.message)
      );

    // Get trailers by filtering videos by type of Trailer
    getMovieVideos(movieId || '')
      .then(data => setVideos(data.results.filter((video: IMovieVideos) => video.type === 'Trailer'))
      )
      .catch(err => {
        console.log(err.message);
      });

    // Get credits for movie
    getMovieCredits(movieId || '')
      .then(data => setTopCast(data.cast))
      .catch(err => console.log(err));
    setLoading(false);
  }, [movieId]); 
  
  return (
    <section className="movie-details-container">
      {movieDetails && 
        <div>
          {!loading && 
          <div>
            <div className='movie-details-grid'>
              <div className='top-half'>
                {videos.length !== 0 ? 
                  <iframe src={`https://www.youtube.com/embed/${videos[0].key}`} title="Youtube Video Player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> 
                  : 
                  <img className='no-video-found-img' src={VideoNotFound} />}
                <div className='top-half-padded-content'>
                  <MovieDetailsInformation 
                    title={movieDetails.title} 
                    vote_average={movieDetails.vote_average} 
                    tagline={movieDetails.tagline} 
                    genres={genres} 
                    overview={movieDetails.overview}  />
                </div>
                <div className='movie-details-btn-container'>
                  <button className='primary-btn' type='button' onClick={() => 
                    handleCreateWatchlistMovie(
                      movieDetails.id, 
                      movieDetails.title, 
                      movieDetails.overview, 
                      movieDetails.vote_average, 
                      movieDetails.poster_path, 
                      movieDetails.release_date
                    )}>Add to Watchlist <img src={WhitePlus} alt="Add to watchlist" /></button>
                  <button className='secondary-btn' type='button'>Add to History <img src={HistoryIcon} alt="Add to history" /></button>
                </div>
              </div>
              <div className='bottom-half'>
                <img src={`http://image.tmdb.org/t/p/w780/${movieDetails?.poster_path}`} alt={`Poster for ${movieDetails.title}`} />
                <MovieDetailsExtraInfo
                  release_date={movieDetails.release_date}
                  runtime={movieDetails.runtime}
                  budget={movieDetails.budget}
                  revenue={movieDetails.revenue}
                />
              </div>
            </div>
            <MovieDetailsTopCast topCast={topCast} loading={loading} />
            <MovieDetailsStarring topCast={topCast} />
            <MovieDetailsMoreLikeThis genres={genres} loading={loading} />
          </div>
          }
        </div>
      }
    </section>
  );
};

export default MovieDetails;