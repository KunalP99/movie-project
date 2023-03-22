import * as dotenv from 'dotenv';
dotenv.config();
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import WatchListMovieModel from './models/WatchlistMovie';

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.post('/watchlist-movie', async (req: Request, res: Response) => {
  const newWatchlistMovie = new WatchListMovieModel({
    movieId: req.body.movieId,
    title: req.body.title,
    overview: req.body.overview,
    rating: req.body.rating,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date
  });

  const createdWatchlistMovie = await newWatchlistMovie.save();
  res.json(createdWatchlistMovie);
});

// Connect to database and then start up server
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
