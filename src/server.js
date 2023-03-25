import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { usersRouter } from '../src/routes/usersHandler.js';
//import { activitiesRouter } from '../src/routes/activitiesHandler.js';

dotenv.config();
const connectionString = process.env.MONGO_URL;
const port = process.env.PORT;

const app = express();

mongoose.connect(connectionString);

app.use(express.json());
app.use(bodyParser.json());

app.use('/users', usersRouter);
//app.use('/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

