import express from 'express';
import { getWatchlist, addToWatchlist } from '../controllers/watchlistController';

const router = express.Router();

// GET watchlist
router.get('/', getWatchlist);

// POST new movie to watchlist
router.post('/', addToWatchlist);

export default router;