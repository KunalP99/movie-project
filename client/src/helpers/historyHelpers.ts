import { addMovieToHistory } from '../api/mongoapi';
import IHistory from '../models/IHistory';

// Add movie to history
export const handleAddMovieToHistory = async (
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
  user_id: string,
  movie_id: number,
  title: string,
  user_rating: number,
  poster_path: string, 
  watch_date: Date,
  rewatch: boolean,
  points: number
) => {
  const historyMovie = await addMovieToHistory(user_id, movie_id, title, user_rating, poster_path, watch_date, rewatch, points);

  setHistory([historyMovie, ... history]);
};  