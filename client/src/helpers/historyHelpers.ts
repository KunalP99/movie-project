import { addMovieToHistory, deleteHistoryMovie} from '../api/mongoapi';

// Models
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

// Delete movie from history
export const handleDeleteFromHistory = async (
  movie: IHistory, 
  user_id: string, 
  history: IHistory[], 
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>, 
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (movie !== undefined && user_id !== '') {
    deleteHistoryMovie(user_id, movie._id);
    
    // Update UI to show array with removed movie
    setHistory(history.filter(person => person.user_id === user_id)
      .filter(historyMovie => historyMovie._id !== movie._id));

    // Hide dropdown once delete is clicked
    setShowDropdown(false);
  }
};