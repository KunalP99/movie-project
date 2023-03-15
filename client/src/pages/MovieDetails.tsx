import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/api';
import IMovieDetails from '../models/IMovieDetails';

type MovieParams = {
  movieId: string;
}

const MovieDetails = () => {
  const { movieId } = useParams<MovieParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId || '')
      .then(data => {
        console.log(data);
        setMovieDetails(data);
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  return (
    <section className="individual-movie-container">
      {movieDetails && <div>
        <h1>{movieDetails.title}</h1>
      </div>}
    </section>
  );
};

export default MovieDetails;