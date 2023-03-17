import IGenres from '../../models/IGenres';
// Images
import RatingStar from '../../images/rating-star.svg';

interface Props {
  title: string,
  vote_average: number,
  tagline: string,
  overview: string,
  genres: IGenres[]
}

const MovieDetailsInformation = ({ title, vote_average, tagline, genres, overview } : Props) => {
  return (
    <div className='movie-details-information-container'>
      <div className='movie-details-title-rating-container'>
        <h1>{title} 
          <span>
            <div className='movie-details-rating'>
              <div>
                <img src={RatingStar} alt="Rating star" />
                <p>{`${Math.round(vote_average * 10) / 10} / 10`}</p>
              </div>
            </div>
          </span>
        </h1>
      </div>
      {tagline && <p className='movie-details-tagline'>{tagline}</p>}
      <div className='movie-details-genre-container'>
        {genres && genres.map(genre => (
          <div key={genre.id}  className='movie-details-genres'>
            <p>{genre.name}</p>  
          </div>
        ))}
      </div>
      <div className='movie-details-overview-container'>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailsInformation;