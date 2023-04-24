export interface IHandleCreateWatchlistMovie {
  handleCreateWatchlistMovie(
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string,
    runtime: number,
    user_id: string) : void
}

export interface IHandleGetWatchlistMovies {
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string,
    runtime: number,
    user_id: string
}

export interface IHandleDeleteWatchlistMovie {
  _id: string
}

export interface WatchlistProps {
  handleCreateWatchlistMovie(
    movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string, 
    release_date: string,
    runtime: number,
    user_id: string): Promise<void>,
    handleDeleteWatchlistMovie(
      userId: string,
      movieId: number
    ): Promise<void>,
    watchlist: IHandleGetWatchlistMovies[],
}