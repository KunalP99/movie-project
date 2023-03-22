export interface IHandleCreateWatchlistMovie {
  handleCreateWatchlistMovie(
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string) : void
}

export interface IHandleGetWatchlistMovies {
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string
}
