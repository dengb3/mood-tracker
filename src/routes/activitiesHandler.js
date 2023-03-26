import express from 'express';
import { ActivityModel, Post, User } from '../models/activities.js';
import { UserModel } from '../models/users.js';
import { auth } from '../middleware/auth.js';


const activitiesRouter = express.Router();

activitiesRouter.post('/:userName', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName }).populate('posts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const activity = new ActivityModel({
      activityName: req.body.activityName,
      user: user._id, // Add reference to user ID
    });
    const postOne = await Post.create({
      user: user._id,
    });
    await activity.save();
    res.status(201).json({
      message: 'Activity added successfully!',
      user: user,
      activity: activity,
      post: postOne,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
});


activitiesRouter.get('/:userName', async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.params.userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const activities = await ActivityModel.find({ user: user._id });
    res.json(activities);
  } catch (e) {
    res.send({ message: 'Error in fetching activities' });
  }
});

activitiesRouter.delete('/:activityId', auth, async (req, res, next) => {
  try {
    const activity = await ActivityModel.findOne({ _id: req.params.activityId }).populate('user');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    if (activity.user._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await ActivityModel.deleteOne({ _id: req.params.activityId });
    return res.status(200).json({ message: 'Activity has been deleted!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { activitiesRouter };
