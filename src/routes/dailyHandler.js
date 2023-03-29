import express from 'express';
import { connectToDatabase } from '../server.js';
import { UserModel } from '../models/users.js';
import { auth } from '../middleware/auth.js';
import { MoodModel } from '../models/moods.js';

const dailyRouter = express.Router();

dailyRouter.get('/:userName', auth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.params.userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    const oneDayAgo = new Date(today);
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const moodSums = await MoodModel.aggregate([
      {
        $match: {
          user: user._id,
          createdOn: { $gte: oneDayAgo }
        }
      },
      {
        $group: {
          _id: '$user',
          totalScore: {
            $avg: {
              $sum: {
                $add: [
                  { $toInt: '$happy' },
                  { $toInt: '$concentration' },
                  { $toInt: '$motivated' },
                  { $toInt: '$energized' },
                  { $toInt: '$interest' },
                  { $toInt: '$clarity' },
                  { $toInt: '$refreshed' }
                ]
              }
            }
          }
        }
      }
    ]).exec();
    const score = moodSums[0].totalScore;
    res.json({ message: `Your total daily mood score for this activity was ${score}/21` });
  } catch (err) {
    console.log('Error fetching mood analysis', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { dailyRouter };
