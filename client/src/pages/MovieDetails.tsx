import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieVideos } from '../api/api';
import IMovieDetails from '../models/IMovieDetails';
import IGenres from '../models/IGenres';
import IMovieVideos from '../models/IMovieVideos';

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
      {!loading && <div className='movie-details-grid'>
        <div className='top-half'>
          <iframe src={`https://www.youtube.com/embed/${videos[0].key}`} title="Youtube Video Player" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <div className='movie-information-container'>
            {movieDetails && <div>
              <h1>{movieDetails.title}</h1>
              <p></p>
            </div>}
          </div>
        </div>
      </div>}

    </section>
  );
};

export default MovieDetails;

// //               {genres && genres.map(genre => (
//                 <p key={genre.id}>{genre.name}</p>
//               ))}