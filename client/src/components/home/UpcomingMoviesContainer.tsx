import { useState, useEffect } from 'react';
import { getMovieVideos } from '../../api/api';
import { format, parseISO } from 'date-fns';

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
      .then(data => {
        setVideo(data.results[0]);
        console.log(data.results[0]); 
      });
  }, []);

  return (
    <div>
      {video &&
      <>
        <img src={`https://img.youtube.com/vi/${video.key}/0.jpg`} alt={video.name} title={video.name} />
        <p>{format(parseISO(`${video.published_at}`), 'd LLLL')}</p>
        <h3>{video.name}</h3>
      </>
      }
    </div>
  );
};

export default UpcomingMoviesContainer;