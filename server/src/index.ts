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

app.get('/watchlist-movies', async (req: Request, res: Response) => {
  const watchlistMovies = await WatchListMovieModel.find();
  console.log(watchlistMovies);
  res.status(200).json(watchlistMovies);
});

app.post('/watchlist-movie', async (req: Request, res: Response) => {
  const { movieId, title, overview, rating, poster_path, release_date } = req.body;

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
});

// Connect to database and then start up server
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
