import {Movie, Review} from '../models/movies.js';
import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
let reviews;

export default class ReviewsDAO {
  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = new Review({
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: ObjectId(movieId)
      });

      return await reviewDoc.save((e)=>{
        if (e) {
          console.error(`Error while saving a review: ${e}`);
        }
      });

    } catch(e) {
      console.error(`Unable to post revuew: ${e}`);
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      return await Review.findByIdAndUpdate({user_id:userId, _id:reviewId}, {$set:{review:review, date:date}});
    } catch(e) {
      console.error(`Unable to update a review: ${e}`);
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      return await Review.deleteOne({user_id:userId, _id:reviewId});
    } catch(e) {
      console.error(`Unable to update a review: ${e}`);
    }
  }

}
