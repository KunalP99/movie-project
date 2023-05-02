import express from 'express';
import { getWatchlist, addToWatchlist, deleteFromWatchlist } from '../controllers/watchlistController';

const router = express.Router();

// GET watchlist
router.get('/:user_id', getWatchlist);

// POST new movie to watchlist
router.post('/', addToWatchlist);

// DELETE movie from watchlist
router.delete('/:user_id/:id', deleteFromWatchlist);

export default router;