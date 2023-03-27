import express from 'express';
import { MoodModel } from '../models/moods.js';
// import { ActivityModel } from '../models/activities.js';
import { auth } from '../middleware/auth.js';


const moodsRouter = express.Router();

moodsRouter.post('/:activityId', auth, async (req, res) => {
  try {
    const activity = await ActivityModel.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    const mood = new MoodModel({
      activity: activity._id, // Add reference to activity ID
      happy: req.body.happy,
      easy: req.body.easy,
      concentration: req.body.concentration,
      motivated: req.body.motivated,
      energized: req.body.energized,
      interest: req.body.interest,
      clarity: req.body.clarity,
      refreshed: req.body.refreshed,
    });
    const postOne = await Post.create({
      activity: req.activityId, // Add reference to activity ID from auth middleware
    });
    await mood.save();
    res.status(201).json({
      message: 'Mood rated successfully!',
      activity: activity,
      mood: mood,
      post: postOne,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

export { moodsRouter };
