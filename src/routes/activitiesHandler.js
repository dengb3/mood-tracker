import express from 'express';
import mongoose from 'mongoose';
import { ActivityModel } from '../models/activities.js'
export const activitiesRouter = express.Router();

// Connect to the database
const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to mongoDB!'))
  .catch(err => console.log(err));

activitiesRouter.post('/create', async (req, res, next) => {
    const activity = new ActivityModel({
      activity_name: req.body.activity_name,
      date: req.body.date,

    });

    try {
    await activity.save({ session: mongoose.connection.clientSession });
    res.status(201).json({
      message: 'Activity added successfully!'
    });
    } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message
      });
    }

return activitiesRouter;

});

  // activitiesRouter.get('/view', (req, res, next) => {
  //   ActivityModel.find().then(
  //     (activities) => {
  //       res.status(200).json(activities);
  //     }
  //   ).catch(
  //     (error) => {
  //       res.status(400).json({
  //         error: error
  //       });
  //     }
  //   );
  // });

  activitiesRouter.put('/update/:id', async (req, res, next) => {
    try {
      const updatedActivity = await ActivityModel.findByIdAndUpdate(
        req.params.id,
        {
          activity_name: req.body.activity_name,
          date: req.body.date,
        },
        { new: true }
      ).session(mongoose.connection.clientSession);
  
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
  
  // activitiesRouter.delete('/del/:id', async (req, res, next) => {
  //   await ActivityModel.deleteOne({_id: req.params.id}).then(
  //     () => {
  //       res.status(200).json({
  //         message: "Activity has been deleted!"
  //       });
  //     }
  //   ).catch(
  //     (error) => {
  //       res.status(400).json({
  //         error: error
  //       });
  //     }
  //   );
  // });