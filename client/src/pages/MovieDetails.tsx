import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/api';
import IMovieDetails from '../models/IMovieDetails';
import IGenres from '../models/IGenres';

type MovieParams = {
  movieId: string;
}

const MovieDetails = () => {
  const { movieId } = useParams<MovieParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();
  const [genres, setGenres] = useState<IGenres[]>([]);
  
  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId || '')
      .then(data => {
        setMovieDetails(data);
        setGenres(data.genres);
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
        {genres && genres.map(genre => (
          <p key={genre.id}>{genre.name}</p>
        ))}
      </div>}
    </section>
  );
};

export default MovieDetails;