import { PostModel } from './post.js'
import { UserModel } from './users.js';
import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity", required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: PostModel }],
  happy: {
    type: Number,
    description:
      "How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  concentration: {
    type: Number,
    description:
      "How concentrated did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  motivated: {
    type: Number,
    description:
      "How motivated did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  energized: {
    type: Number,
    description:
      "How energized did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  interest: {
    type: Number,
    description:
      "How interested did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  clarity: {
    type: Number,
    description:
      "How much clarity did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  refreshed: {
    type: Number,
    description:
      "How refreshed did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.",
    min: 0,
    max: 3,
    required: true
  },
  createdOn: { type: Date, default: Date.now },
  activityId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
});

export const MoodModel = mongoose.model('Mood', moodSchema);
export const User = mongoose.model('User', UserModel.schema);
