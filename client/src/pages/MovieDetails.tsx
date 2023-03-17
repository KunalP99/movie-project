import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos } from '../api/api';
import IMovieDetails from '../models/IMovieDetails';
import IGenres from '../models/IGenres';
import IMovieVideos from '../models/IMovieVideos';

// Components
import MovieDetailsInformation from '../components/movie_details/MovieDetailsInformation';
import MovieDetailsExtraInfo from '../components/movie_details/MovieDetailsExtraInfo';
import MovieDetailsTopCast from '../components/movie_details/MovieDetailsTopCast';

// Images
import WhitePlus from '../images/white-plus.svg';
import HistoryIcon from '../images/white-history-icon.svg';
import VideoNotFound from '../images/video-not-found.svg';

type MovieParams = {
  movieId: string;
}

const MovieDetails = () => {
  const { movieId } = useParams<MovieParams>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [videos, setVideos] = useState<IMovieVideos[]>([]);
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

    // Get trailers by filtering videos by Trailer
    getMovieVideos(movieId || '')
      .then(data => setVideos(data.results.filter((video: IMovieVideos) => video.type === 'Trailer'))
      )
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => setLoading(false));
  }, []); 
    
  return (
    <section className="movie-details-container">
      {movieDetails && 
        <div>
          {!loading && 
          <div>
            <div className='movie-details-grid'>
              <div className='top-half'>
                {videos.length !== 0 ? <iframe src={`https://www.youtube.com/embed/${videos[0].key}`} title="Youtube Video Player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> : <img className='no-video-found-img' src={VideoNotFound} />}

                <div className='top-half-padded-content'>
                  <MovieDetailsInformation 
                    title={movieDetails.title} 
                    vote_average={movieDetails.vote_average} 
                    tagline={movieDetails.tagline} 
                    genres={genres} 
                    overview={movieDetails.overview}  />
                </div>
                <div className='movie-details-btn-container'>
                  <button className='primary-btn' type='button'>Add to Watchlist <img src={WhitePlus} alt="Add to watchlist" /></button>
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
            <div>
              <MovieDetailsTopCast id={movieDetails.id.toString()}/>
            </div>
          </div>
          }
        </div>
      }
    </section>
  );
};

export default MovieDetails;