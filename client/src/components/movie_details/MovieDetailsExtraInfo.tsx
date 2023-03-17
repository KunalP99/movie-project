interface Props {
  release_date: string,
  runtime: number,
  budget: number,
  revenue: number
}

const MovieDetailsExtraInfo = ({ release_date, runtime, budget, revenue } : Props) => {
  // Format number to US dollars
  const formatToUsDollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className='movie-details-extra-movie-information'>
      <div>
        <p className='movie-details-extra-subtitle'>Release Date</p>
        <p className='movie-details-extra-body'>{release_date}</p>
      </div>
      <div>
        <p className='movie-details-extra-subtitle'>Runtime</p>
        <p className='movie-details-extra-body'>{`${runtime}m`}</p>
      </div>
      <div>
        <p className='movie-details-extra-subtitle'>Budget</p>
        {budget === 0 ? <p className='movie-details-extra-body'>Unknown</p> : 
          <p className='movie-details-extra-body'>{`${formatToUsDollars.format(budget)}`}</p>}
      </div>
      <div>
        <p className='movie-details-extra-subtitle'>Revenue</p>
        {revenue === 0 ? <p className='movie-details-extra-body'>Unknown</p> : 
          <p className='movie-details-extra-body'>{`${formatToUsDollars.format(revenue)}`}</p>}
      </div>
    </div>
  );
};

export default MovieDetailsExtraInfo;