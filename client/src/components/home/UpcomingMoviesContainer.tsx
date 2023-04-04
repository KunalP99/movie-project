import { useState, useEffect } from 'react';
import { getMovieVideos } from '../../api/api';

// Models
import IMovieVideos from '../../models/IMovieVideos';
import { IUpcomingMovies } from './LatestVideos';

interface Props {
  movie: IUpcomingMovies
}

const UpcomingMoviesContainer = ({ movie } : Props) => {
  const [video, setVideo] = useState<IMovieVideos>();

  useEffect(() => {
    getMovieVideos(movie.id.toString())
      .then(data =>setVideo(data.results[0]));
  }, []);

  return (
    <div>
      {video &&
      <>
        <img src={`https://img.youtube.com/vi/${video.key}/0.jpg`} alt="" />
        <p>{video.name}</p>
      </>
        
      }
    </div>
  );
};

export default UpcomingMoviesContainer;