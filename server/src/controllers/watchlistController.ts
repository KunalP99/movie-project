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
  const { movieId, title, overview, rating, poster_path, release_date } = req.body;

  try {
    const newWatchlistMovie = new WatchListMovieModel({
      movieId,
      title,
      overview,
      rating,
      poster_path,
      release_date
    });
    
    const createdWatchlistMovie = await newWatchlistMovie.save();
    res.status(200).json(createdWatchlistMovie);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}