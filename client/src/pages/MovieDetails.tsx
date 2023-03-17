import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos } from '../api/api';
import IMovieDetails from '../models/IMovieDetails';
import IGenres from '../models/IGenres';
import IMovieVideos from '../models/IMovieVideos';

// Images
import RatingStar from '../images/rating-star.svg';
import WhitePlus from '../images/white-plus.svg';
import HistoryIcon from '../images/white-history-icon.svg';

type MovieParams = {
  movieId: string;
}

const MovieDetails = () => {
  const { movieId } = useParams<MovieParams>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [videos, setVideos] = useState<IMovieVideos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Format number to US dollars
  const formatToUsDollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId || '')
      .then(data => {
        console.log(data);
        setMovieDetails(data);
        setGenres(data.genres);
      })
      .catch(err => {
        console.log(err.message);
      });

    getMovieVideos(movieId || '')
      .then(data => {
        setVideos(data.results.filter((video: IMovieVideos) => video.type === 'Trailer'));
        console.log(data);
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 
    
  return (
    <section className="movie-details-container">
      {movieDetails && 
        <div>
          {!loading && 
            <div className='movie-details-grid'>
              <div className='top-half'>
                <iframe src={`https://www.youtube.com/embed/${videos[0].key}`} title="Youtube Video Player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div className='top-half-padded-content'>
                  <div className='movie-details-information-container'>
                    <div className='movie-details-title-rating-container'>
                      <h1>{movieDetails.title} 
                        <span>
                          <div className='movie-details-rating'>
                            <div>
                              <img src={RatingStar} alt="Rating star" />
                              <p>{`${Math.round(movieDetails.vote_average * 10) / 10} / 10`}</p>
                            </div>
                          </div>
                        </span>
                      </h1>
                    </div>
                    {movieDetails.tagline && <p className='movie-details-tagline'>{movieDetails.tagline}</p>}
                    <div className='movie-details-genre-container'>
                      {genres && genres.map(genre => (
                        <div key={genre.id}  className='movie-details-genres'>
                          <p>{genre.name}</p>  
                        </div>
                      ))}
                    </div>
                    <div className='movie-details-overview-container'>
                      <p>{movieDetails.overview}</p>
                    </div>
                  </div>
                </div>
                <div className='movie-details-btn-container'>
                  <button className='primary-btn' type='button'>Add to Watchlist <img src={WhitePlus} alt="Add to watchlist" /></button>
                  <button className='secondary-btn' type='button'>Add to History <img src={HistoryIcon} alt="Add to history" /></button>
                </div>
              </div>
              <div className='bottom-half'>
                <img src={`http://image.tmdb.org/t/p/w780/${movieDetails?.poster_path}`} alt={`Poster for ${movieDetails.title}`} />
                <div className='movie-details-extra-movie-information'>
                  <div>
                    <p className='movie-details-extra-subtitle'>Release Date</p>
                    <p className='movie-details-extra-body'>{movieDetails.release_date}</p>
                  </div>
                  <div>
                    <p className='movie-details-extra-subtitle'>Runtime</p>
                    <p className='movie-details-extra-body'>{`${movieDetails.runtime}m`}</p>
                  </div>
                  <div>
                    <p className='movie-details-extra-subtitle'>Budget</p>
                    {movieDetails.budget === 0 ? <p className='movie-details-extra-body'>Unknown</p> : 
                      <p className='movie-details-extra-body'>{`${formatToUsDollars.format(movieDetails.budget)}`}</p>}
                  </div>
                  <div>
                    <p className='movie-details-extra-subtitle'>Revenue</p>
                    {movieDetails.revenue === 0 ? <p className='movie-details-extra-body'>Unknown</p> : 
                      <p className='movie-details-extra-body'>{`${formatToUsDollars.format(movieDetails.revenue)}`}</p>}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </section>
  );
};

export default MovieDetails;