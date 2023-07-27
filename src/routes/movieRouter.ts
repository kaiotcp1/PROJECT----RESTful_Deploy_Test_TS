import express from 'express';
import { createMovie, findMovieById, getAllMovies, removeMovie, updateMovie } from '../controllers/movieController';

const router = express.Router();

router.route('/')
.post(createMovie)
.get(getAllMovies);

router.route('/:id')
.get(findMovieById)
.delete(removeMovie)
.patch(updateMovie)

module.exports = router;