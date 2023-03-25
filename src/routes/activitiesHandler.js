import express from 'express';
import { ActivityModel, Post, User } from '../models/activities.js';

const activitiesRouter = express.Router();

activitiesRouter.post('/create/:id', async (req, res) => {
  const userId = req.params.id;
  const activity = new ActivityModel({
    activityName: req.body.activityName,
  });
  try {
    const postOne = await Post.create({
      user: userId,
    });
    await activity.save();
    const user = await User.findOne({ _id: userId }).populate({ path: 'posts', options: { strictPopulate: false } });
    console.log(user);
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



activitiesRouter.get('/view/:id', async (req, res) => {
  try {
    const activity = await ActivityModel.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error listing activity', error: error });
  }
});

activitiesRouter.put('/update/:id', async (req, res, next) => {
  try {
    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      req.params.id,
      {
        activityName: req.body.activityName,
        createdOn: Date.now(),
      },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json({
      message: 'Activity updated successfully!',
      activity: updatedActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

activitiesRouter.delete('/del/:id', async (req, res, next) => {
  try {
    const deletedActivity = await ActivityModel.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json({
      message: 'Activity has been deleted!',
      activity: deletedActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
});

export { activitiesRouter };
