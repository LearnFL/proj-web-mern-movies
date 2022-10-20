import {Movie} from '../models/movies.js';
import {Query} from 'mongoose';
import {ObjectId} from 'mongodb';

let movies;

export default class MoviesDAO {
  static async getMovies({filters=null, page=0, moviesPerPage=20}={}){
    let query;
    if(filters) {
      if('title' in filters){
        query = { $text:{ $search: filters['title']}} ;
      }else if("rated" in filters) {
        query = { rated: filters['rated']};
      }else if("genres" in filters) {
        query = { genres: [filters['genres']]};
      }
    }
    let options = {
      skip: page,
      limit: moviesPerPage
    }
    return await Movie.find(query).skip(page*moviesPerPage).limit(moviesPerPage);
  }

  static async getMovieById(res, id){
    try {
      return await Movie.aggregate([
        {$match: {_id: new ObjectId(id)}},
        {$lookup:{
          from: 'reviews',
          localField: '_id',
          foreignField: 'movie_id',
          as: 'reviews'
        }}
      ]);
    }catch(e){
      console.error(e);
      res.status(404);
    }
  }

  static async getRatings(){
    let ratings = [];
    try {
      ratings = await Movie.distinct('rated');
      return ratings;
    }catch(e){
      console.error(`Unable to get ratings: ${e}`);
    }
  }

}
