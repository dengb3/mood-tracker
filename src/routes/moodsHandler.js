import express from 'express';
import { MoodModel } from '../models/moods.js'
export const moodsRouter = express.Router();

moodsRouter.get('/view/:id', async (req, res) => {
  try {
    const mood = await MoodModel.findById(req.params.id);
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    res.json(mood);
  } catch (error) {
    res.status(500).json({ message: 'Error listing mood', error: error });
  }
});


moodsRouter.post('/rate', async (req, res) => {

    try {
        const newMood = new MoodModel({
          object: req.body.object,
          happy: req.body.happy,
          easy: req.body.easy,
          concentration: req.body.concentration,
          motivated: req.body.motivated,
          energized: req.body.energized,
          interest: req.body.interest,
          clarity: req.body.clarity,
          refreshed: req.body.refreshed,
        });
    
        // Save the new mood document to the database
        await newMood.save();
    
        // Return a success response
        res.status(201).json({ message: 'Mood rated' });
      } catch (error) {
        // Handle any errors that occurred during the request
        res.status(500).json({ message: 'Error rating mood', error: error });
      }
    });


  moodsRouter.put('/update/:id', async (req, res, next) => {
    try {
      const updatedMoods = await MoodModel.findByIdAndUpdate(
        req.params.id,
        {
            happy: req.body.happy,
            easy: req.body.easy,
            concentration: req.body.concentration,
            motivated: req.body.motivated,
            energized: req.body.energized,
            interest: req.body.interest,
            clarity: req.body.clarity,
            refreshed: req.body.refreshed,
        },
        { new: true })
  
      if (!updatedMoods) {
        return res.status(404).json({ error: 'Moods not found' });
      }
  
      res.status(200).json({
        message: 'Moods updated successfully!',
        activity: updatedMoods,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error: error.message,
      });
    }
  });
  
  moodsRouter.delete('/del/:id', async (req, res, next) => {
    await MoodModel.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: "Moods have been deleted!"
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });