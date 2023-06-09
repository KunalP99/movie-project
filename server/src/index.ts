import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes
import userRoutes from './routes/user';
import watchlistRoutes from './routes/watchlist';
import historyRoutes from './routes/history';

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/watchlist-movies', watchlistRoutes);
app.use('/history', historyRoutes);

// Connect to database and then start up server
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
