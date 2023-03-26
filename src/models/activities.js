import { UserModel } from './users.js';
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  activityName: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdOn: { type: Date, default: Date.now },
  activityId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
});

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const ActivityModel = mongoose.model('Activity', activitySchema);
export const Post = mongoose.model('Post', postSchema);
export const User = mongoose.model('User', UserModel.schema);
