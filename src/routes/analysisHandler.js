import express from 'express';
import mongoose from 'mongoose';
import { connectToDatabase } from '../server.js';
import { auth } from '../middleware/auth.js';
import { ActivityModel } from '../models/activities.js';
import { MoodModel } from '../models/moods.js';
import { UserModel } from '../models/users.js';

const analysisRouter = express.Router();

analysisRouter.get('/:_id', auth, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const mood = await db.collection('moods').findOne({ mood: req.params.mood_id });

    console.log(mood)
    if (!mood) {
      return res.status(404).json({ message: 'mood not found' });
    }

    // Sum score of all attributes for the mood
    const moodSums = await MoodModel.aggregate([
      { $match: { _id: mood._id } },
      {
        $group: {
          _id: mood._id,
          totalScore: {
            $sum: {
              $add: [
                "$happy",
                "$concentration",
                "$motivated",
                "$energized",
                "$interest",
                "$clarity",
                "$refreshed"
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          mood: req.params._id,
          totalScore: 1
        }
      }
    ]);
    console.log(moodSums)
    res.json({ moodSums });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error in mood analysis' });
  }
});

export { analysisRouter };
