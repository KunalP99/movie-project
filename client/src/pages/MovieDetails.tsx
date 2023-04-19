import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos, getMovieCredits } from '../api/api';
import { ToastContainer, toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Models
import IMovieDetails from '../models/IMovieDetails';
import IGenres from '../models/IGenres';
import IMovieVideos from '../models/IMovieVideos';
import ITopCast from '../models/ITopCast';
import { IHandleGetWatchlistMovies } from '../models/IWatchlist';
import IHistory from '../models/IHistory';

// Components
import MovieDetailsInformation from '../components/movie_details/MovieDetailsInformation';
import MovieDetailsExtraInfo from '../components/movie_details/MovieDetailsExtraInfo';
import MovieDetailsTopCast from '../components/movie_details/MovieDetailsTopCast';
import MovieDetailsStarring from '../components/movie_details/MovieDetailsStarring';
import MovieDetailsMoreLikeThis from '../components/movie_details/MovieDetailsMoreLikeThis';
import HistoryAddForm from '../components/forms/HistoryAddForm';

// Images
import WhitePlus from '../images/white-plus.svg';
import HistoryIcon from '../images/white-history-icon.svg';
import VideoNotFound from '../images/video-not-found.svg';

// Context
import { UserContext } from '../components/context/UserContext';

type MovieParams = {
  movieId: string;
}

interface Props {
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
  watchlist: IHandleGetWatchlistMovies[],
  setWatchlist: React.Dispatch<React.SetStateAction<IHandleGetWatchlistMovies[]>>
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>
}

const MovieDetails = ({ watchlist, setWatchlist, handleCreateWatchlistMovie, handleDeleteWatchlistMovie, history, setHistory } : Props ) => {
  const { movieId } = useParams<MovieParams>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [videos, setVideos] = useState<IMovieVideos[]>([]);
  const [topCast, setTopCast] = useState<ITopCast[]>([]);
  const [inWatchlist, setInWatchlist] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const fromWatchlist = false;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const successNotif = () => toast.success(`You earned ${movieDetails?.runtime} points`);

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

  // Check if movie is already in watchlist 
  useEffect(() => {
    watchlist.filter(person => person.user_id === user.sub).map(watchlistMovie => {
      if (movieDetails?.id === watchlistMovie.movieId) {
        setInWatchlist(true);
      }
    });
  }, [watchlist]);

  // Checks to see if form is submitted and shows toast if true
  useEffect(() => {
    if (formSubmitted) {
      successNotif();
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  useEffect(() => {
    if (error) {
      // Notify
      setError(false);
    }
  }, [error]);

  // Handle adding movie to watchlist
  const handleAddToWatchlist = () => {
    if (movieDetails !== undefined) {
      handleCreateWatchlistMovie(
        movieDetails.id, 
        movieDetails.title, 
        movieDetails.overview, 
        movieDetails.vote_average, 
        movieDetails.poster_path, 
        movieDetails.release_date,
        movieDetails.runtime,
        user.sub
      );
      setInWatchlist(true);
    }
  };

  // Handle deleting movie from watchlist
  const handleDeleteFromWatchlist = () => {
    if (movieDetails !== undefined) {
      handleDeleteWatchlistMovie(user.sub, movieDetails.id);
      setInWatchlist(false);
    }
  };

  return (
    <section className="movie-details-container">
      {movieDetails && 
        <div>
          {!loading && 
          <div>
            <div className='movie-details-grid'>
              <div className='top-half'>
                {videos.length !== 0 ? 
                  <iframe 
                    src={`https://www.youtube.com/embed/${videos[0].key}`} 
                    title="Youtube Video Player" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen></iframe> 
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
                  {!inWatchlist ? 
                    <button 
                      className='primary-btn' 
                      type='button' 
                      onClick={handleAddToWatchlist}>
                        Add to Watchlist <img src={WhitePlus} alt="Add to watchlist" />
                    </button>
                    :
                    <button 
                      className='remove-from-watchlist-btn primary-btn' 
                      onClick={handleDeleteFromWatchlist}>
                        Remove from Watchlist
                    </button>
                  }

                  <button 
                    className='secondary-btn' 
                    type='button'
                    onClick={() => setShowModal(true)}>
                      Add to History <img src={HistoryIcon} alt="Add to history" />
                  </button>
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
          {showModal && 
            <HistoryAddForm
              setShowModal={setShowModal}
              id={movieDetails.id}
              title={movieDetails.title}
              posterPath={movieDetails.poster_path}
              runtime={movieDetails.runtime}
              setFormSubmitted={setFormSubmitted}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              history={history}
              setHistory={setHistory}
              setError={setError}
              fromWatchlist={fromWatchlist} />
          }
        </div>
      }
      {!error ? 
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
        :
        <p>error</p>
      }

    </section>
  );
};

export default MovieDetails;