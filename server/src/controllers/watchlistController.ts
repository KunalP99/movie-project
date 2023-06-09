import mongoose from 'mongoose';
import { Request, Response } from 'express';
import WatchListMovieModel from '../models/WatchlistMovie';

// Gets the list of watchlist movies from database
export const getWatchlist = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const watchlistMovies = await WatchListMovieModel.find({user_id: user_id}).sort({"createdAt": -1});
    res.status(200).json(watchlistMovies);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// Adds a movie to the database with the request body information
export const addToWatchlist = async (req: Request, res: Response) => {
  const { movieId, title, overview, rating, poster_path, backdrop_path, release_date, runtime, user_id } : 
  { movieId: number, 
    title: string, 
    overview: string, 
    rating: number, 
    poster_path: string,
    backdrop_path: string,
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
      backdrop_path,
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

// Deletes one movie from the watchlsit collection based on movie and user id
export const deleteFromWatchlist = async (req: Request, res: Response) => {
  const { id, user_id } = req.params;

  const movie = await WatchListMovieModel.findOneAndDelete({'movieId': id, 'user_id': user_id});
  res.json(movie);
}