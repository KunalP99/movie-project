import mongoose, { Schema, Document } from "mongoose";

export interface IWatchlist {
  movieId: number,
  title: string,
  overview: string,
  rating: number,
  poster_path: string,
  release_date: string,
  runtime: number,
  user_id: string
}

export interface WatchlistDocument extends IWatchlist, Document {
  createdAt: Date,
  updatedAt: Date
}

const WatchListMovieSchema = new Schema({
  movieId: Number,
  title: String,
  overview: String,
  rating: Number,
  poster_path: String,
  release_date: String,
  runtime: Number,
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true});

const WatchListMovieModel = mongoose.model<WatchlistDocument>('WatchlistMovie', WatchListMovieSchema);

export default WatchListMovieModel;