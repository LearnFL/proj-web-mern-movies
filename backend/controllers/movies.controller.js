import {Movie} from '../models/movies.js';
import MoviesDAO from '../dao/moviesDAO.js';

export default class MoviesController {

  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage):20;
    const page = req.query.page ? parseInt(req.query.page):0;
    let filters = {};

    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    } else if (req.query.genres) {
      filters.genres = req.query.genres;
    } else if (req.query.return) {
      filters.return = req.query.return;
      }

    let query = await MoviesDAO.getMovies({filters:filters, page, moviesPerPage});

    let response = {
      movies: query,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
    }

    res.json(response);
  }

  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {};
      let movie = await MoviesDAO.getMovieById(res, id);
      if (!movie) {
        res.status(404).json({error: 'not found'});
        return
      }
      res.json(movie);
    }catch(e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error:e})
    }
  }

  static async apiGetRatings(req, res, next) {
    try {
      let propertyTypes = await MoviesDAO.getRatings();
      res.json(propertyTypes);

    }catch(e) {
      console.error(`api, ${e}`);
      res.status(500).json({ error:e});
    }
  }

}
