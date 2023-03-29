import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { usersRouter } from '../src/routes/usersHandler.js';
import { activitiesRouter } from '../src/routes/activitiesHandler.js';
import { dailyRouter } from './routes/dailyHandler.js';
import { weeklyRouter } from './routes/weeklyHandler.js';
import { moodsRouter } from './routes/moodsHandler.js';

dotenv.config();
const connectionString = process.env.MONGO_URL;
const port = process.env.PORT;

const app = express();

const mongooseDb = await mongoose.connect(connectionString);

async function connectToDatabase() {
  try {
    const db = mongooseDb.connection.db;
    const collection = db.collection('moods');
    return collection;
  } catch (err) {
    console.log('Error connecting to database', err);
  }
}


app.use(express.json());
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/activities', activitiesRouter);
app.use('/moods', moodsRouter);
app.use('/daily', dailyRouter);
app.use('/weekly', weeklyRouter);

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

export { connectToDatabase };
