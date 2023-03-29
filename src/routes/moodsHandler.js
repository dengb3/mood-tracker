import express from 'express';
import { MoodModel } from '../models/moods.js';
import { UserModel } from '../models/users.js';
import { ActivityModel } from '../models/activities.js';
import { auth } from '../middleware/auth.js';
import { PostModel } from '../models/post.js';


const moodsRouter = express.Router();

moodsRouter.post('/:userName/:activityName', auth, async (req, res) => {
  try {
    const activity = await ActivityModel.findOne({ activityName: req.params.activityName })
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    const mood = new MoodModel({
      activityName: req.params.activityName, // set activityName property to name of activity
      activity: activity.activityId,
      user: req.user._id,
      happy: req.body.happy,
      concentration: req.body.concentration,
      motivated: req.body.motivated,
      energized: req.body.energized,
      interest: req.body.interest,
      clarity: req.body.clarity,
      refreshed: req.body.refreshed,
    });
    const postOne = await PostModel.create({
      activity: req.params.activityName, // set activity property to name of activity
      user: req.user._id,
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

moodsRouter.delete('/:activityName', auth, async (req, res, next) => {
  try {
    const mood = await MoodModel.findOne({ activityName: req.params.activityName }).populate('user');
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    if (mood.user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await MoodModel.deleteOne({ activityName: req.params.activityName });
    return res.status(200).json({ message: 'Mood has been deleted!' });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: error.message });
  }
});


export { moodsRouter };
