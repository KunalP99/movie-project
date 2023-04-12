import express from 'express';
import { getWatchlist, addToWatchlist, deleteFromWatchlist } from '../controllers/watchlistController';

const router = express.Router();

// GET watchlist
router.get('/', getWatchlist);

// POST new movie to watchlist
router.post('/', addToWatchlist);

router.delete('/:user_id/:id', deleteFromWatchlist);

export default router;