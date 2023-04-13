import express from 'express';
import {  getHistory, addToHistory, updateMovieInHistory } from '../controllers/historyController';

const router = express.Router();

// GET history collection
router.get('/', getHistory);

// POST new movie to history collection
router.post('/', addToHistory);

// PATCH movie in history collection
router.patch('/:id', updateMovieInHistory);

export default router;