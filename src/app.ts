require('dotenv').config()
import express from 'express';
import config from 'config';
import db from './../config/db';

const app = express();

// JSON middleware
app.use(express.json());

//Middlewares
import morganMiddleware from './middleware/morganMiddleware';
app.use(morganMiddleware);

//Router
const movieRouter = require('./routes/movieRouter');

// Routes
app.use('/api/v1/movie', movieRouter);

//Logger
import Logger from '../config/logger';

// App port
const port = config.get<number>('port') || 8080;

app.listen(port, async () => {
  await db();
  Logger.info(`Server online na porta: ${port}`);
});
