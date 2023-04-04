import { useState, useEffect } from 'react';
import { getMovieVideos } from '../../api/api';
import { format, parseISO } from 'date-fns';

// Models
import IMovieVideos from '../../models/IMovieVideos';
import { IUpcomingMovies } from './LatestVideos';

// Images 
import YoutubeIcon from '../../images/youtube-icon.svg';

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
        <div className='latest-video-img-container'>
          <img className='youtube-icon' src={YoutubeIcon}  />
          <img className='latest-video-youtube-thumbnail' src={`https://img.youtube.com/vi/${video.key}/0.jpg`} alt={video.name} title={video.name} />
        </div>
        <div className='latest-videos-text-container'>
          <p>{format(parseISO(`${video.published_at}`), 'd LLLL')}</p>
          <h3 title={video.name}>{video.name}</h3>
        </div>

      </>
      }
    </div>
  );
};

export default UpcomingMoviesContainer;