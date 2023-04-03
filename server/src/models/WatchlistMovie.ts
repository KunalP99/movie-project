import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const WatchListMovieSchema = new Schema({
  movieId: Number,
  title: String,
  overview: String,
  rating: Number,
  poster_path: String,
  release_date: String,
  user_id: {
    type: String,
    required: true
  }
});

const WatchListMovieModel = mongoose.model('WatchlistMovie', WatchListMovieSchema);

export default WatchListMovieModel;