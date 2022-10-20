import Router from 'express';
import MoviesController from '../controllers/movies.controller.js';
import ReviewsController from '../controllers/reviews.controller.js'

const router = Router();

router.get('/', MoviesController.apiGetMovies);
router.post('/review', ReviewsController.apiPostReview);
router.put('/review', ReviewsController.apiUpdateReview);
router.delete('/review', ReviewsController.apiDeleteReview);
router.get('/id/:id', MoviesController.apiGetMovieById);
router.get('/ratings', MoviesController.apiGetRatings);

export {router as moviesRoute};
