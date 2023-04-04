interface IMovieDetails {
  id: number,
  title: string,
  overview: string,
  backdrop_path: string,
  poster_path: string,
  tagline: string,
  vote_average: number,
  release_date: string,
  runtime: number,
  budget: number,
  revenue: number,
  inWatchlist?: boolean
}

export default IMovieDetails;