import express from 'express';
import { MoodModel } from '../models/moods.js';
import { UserModel } from '../models/users.js';
import { ActivityModel } from '../models/activities.js';
import { auth } from '../middleware/auth.js';
import { PostModel } from '../models/post.js';


const moodsRouter = express.Router();

moodsRouter.post('/:activityId', auth, async (req, res) => {
  try {
    const activity = await ActivityModel.findById(req.params.activityId)
    console.log(activity)
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    const mood = new MoodModel({
      activity: activity.activityId, // Add reference to activity ID
      user: req.user._id, // Add reference to user ID from auth middleware
      happy: req.body.happy,
      concentration: req.body.concentration,
      motivated: req.body.motivated,
      energized: req.body.energized,
      interest: req.body.interest,
      clarity: req.body.clarity,
      refreshed: req.body.refreshed,
    });
    const postOne = await PostModel.create({
      activity: activity.activityId, // Add reference to activity ID from auth middleware
      user: req.user._id, // Add reference to user ID from auth middleware
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

moodsRouter.get('/:userName', async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.params.userName });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const moods = await MoodModel.find({ user: user._id });
    res.json(moods);
  } catch (e) {
    console.log(e)
    res.send({ message: 'Error in fetching moods' });
  }
});

moodsRouter.delete('/:activityId', auth, async (req, res, next) => {
  try {
    const mood = await MoodModel.findOne({ _id: req.params.activityId }).populate('user');
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    if (mood.user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await MoodModel.deleteOne({ _id: req.params.activityId });
    return res.status(200).json({ message: 'Mood has been deleted!' });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message });
  }
});


export { moodsRouter };
