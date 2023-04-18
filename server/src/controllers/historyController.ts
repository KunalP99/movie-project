import mongoose from 'mongoose';
import { Request, Response } from 'express';
import HistoryModel from '../models/History';

// Get the list of movies in history from database
export const getHistory = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  try {
    const historyMovies = await HistoryModel.find({user_id: user_id}).sort({"watch_date": -1});
    res.status(200).json(historyMovies);
  } catch (err) {
    res.status(400).json({ error: err });
  }

}

// Adds a movie to the history collection
export const addToHistory = async (req: Request, res: Response) => {
  const { movie_id, title, user_rating, poster_path, watch_date, rewatch, points, user_id } : 
  { user_id: string 
    movie_id: number,
    title: string,
    user_rating: number,
    poster_path: string, 
    watch_date: Date,
    rewatch: boolean,
    points: number } = req.body

    try {
      const newHistoryMovie = new HistoryModel({
        user_id,
        movie_id,
        title,
        user_rating,
        poster_path,
        watch_date,
        rewatch,
        points,
      });

      const createdHistoryMovie = await newHistoryMovie.save();
      res.status(200).json(createdHistoryMovie);
    } catch (err) {
      res.status(400).json({ error: err });
    }
}

// Finds movie and updates movie in History collection
export const updateMovieInHistory = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const movieToUpdate = await HistoryModel.findOneAndUpdate({ _id: id }, 
      {
        ...req.body
      });

      res.status(200).json(movieToUpdate);
  } catch (err) {
      res.status(400).json({ error: err });
  }

}

// Deletes one movie from the history collection based on object and user id
export const deleteFromHistory = async (req: Request, res: Response) => {
  const { _id, user_id } = req.params;

  try {
    const movie = await HistoryModel.findOneAndDelete({'_id:' : _id, 'user_id': user_id});
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}