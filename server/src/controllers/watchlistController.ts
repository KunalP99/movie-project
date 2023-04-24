import mongoose from 'mongoose';
import { Request, Response } from 'express';
import WatchListMovieModel from '../models/WatchlistMovie';

// Gets the list of watchlist movies from database
export const getWatchlist = async (req: Request, res: Response) => {
  const watchlistMovies = await WatchListMovieModel.find();
  res.status(200).json(watchlistMovies);
}

// Adds a movie to the database with the request body information
export const addToWatchlist = async (req: Request, res: Response) => {
  const { movieId, title, overview, rating, poster_path, release_date, runtime, user_id } : 
  { movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string,
    release_date: string, 
    runtime: number,
    user_id: string } = req.body;

  try {
    const newWatchlistMovie = new WatchListMovieModel({
      movieId,
      title,
      overview,
      rating,
      poster_path,
      release_date,
      runtime,
      user_id
    });
    
    const createdWatchlistMovie = await newWatchlistMovie.save();
    res.status(200).json(createdWatchlistMovie);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export const deleteFromWatchlist = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user_id = req.params.user_id;

  const movie = await WatchListMovieModel.findOneAndDelete({'movieId': id, 'user_id': user_id});
  res.json(movie);

}