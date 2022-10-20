import mongoose from 'mongoose';
import {} from 'dotenv/config';
import {ObjectId} from 'mongodb';

mongoose.connect(process.env.MOVIEREVIEWS_DB_URI);

const movieSchema = new mongoose.Schema({}, { collection: "movies", strictQuery : false });
const Movie = mongoose.model('Movie', movieSchema);

const reviewSchema = new mongoose.Schema({
    name: String,
    user_id: Number,
    date: Date,
    review: String,
    movie_id: ObjectId
  });

const Review = mongoose.model('Review', reviewSchema);
await Review.createCollection();

export {Movie, Review};
