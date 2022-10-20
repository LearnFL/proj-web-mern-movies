import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import {} from 'dotenv/config';
import cors from 'cors';
import {moviesRoute} from './api/movies.route.js';

const PORT = process.env.PORT || 3000;
const app = express();

// Enables server to read amnnd accept JSON in request's body
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

// Views
app.use('/api/v1/movies', moviesRoute);
app.use('*', (req, res, next)=>res.status(404).json({error: 'not found'}));

app.listen(PORT, ()=>console.log('Backend is running.'));
export default app;
