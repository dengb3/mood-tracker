import express from 'express';
import { ActivityModel } from '../models/activities.js';
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
    res.json({ message: `Your average total daily mood scores where ${score}/21` });
  } catch (err) {
    console.log('Error fetching mood analysis', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

dailyRouter.get('/:userName/maxmin', auth, async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.params.userName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const today = new Date();
    const oneDayAgo = new Date(today);
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const moodStats = await MoodModel.aggregate([
      {
        $match: {
          user: user._id,
          createdOn: { $gte: oneDayAgo }
        }
      },
      {
        $group: {
          _id: "$activity",
          maxScore: { $max: { $sum: ["$happy", "$concentration", "$motivated", "$energized", "$interest", "$clarity", "$refreshed"] } },
          minScore: { $min: { $sum: ["$happy", "$concentration", "$motivated", "$energized", "$interest", "$clarity", "$refreshed"] } },
        }
      }
    ]).exec();

    let maxScoreAttribute = '';
    let minScoreAttribute = '';
    let maxScoreActivity = '';
    let minScoreActivity = '';
    let maxScore = -Infinity;
    let minScore = Infinity;

    for (let i = 0; i < moodStats.length; i++) {
      const activity = moodStats[i]._id;
      const activityMaxScore = moodStats[i].maxScore;
      const activityMinScore = moodStats[i].minScore;

      if (activityMaxScore > maxScore) {
        maxScoreAttribute = 'maximum daily mood score';
        maxScore = activityMaxScore;
        maxScoreActivity = activity;
      }

      if (activityMinScore < minScore) {
        minScoreAttribute = 'minimum daily mood score';
        minScore = activityMinScore;
        minScoreActivity = activity;
      }
    }

    res.json({
      maxScore: `Your ${maxScoreAttribute} was ${maxScore} while doing ${maxScoreActivity}`,
      minScore: `Your ${minScoreAttribute} was ${minScore} while doing ${minScoreActivity}`
    });

  } catch (err) {
    console.log('Error fetching mood analysis', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
export { dailyRouter };
