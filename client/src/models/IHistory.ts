interface IHistory {
  user_id: string,
  movie_id: number,
  title: string,
  user_rating: number,
  poster_path: string, 
  watch_date: Date,
  rewatch: boolean,
  points: number
}

export default IHistory;