import mongoose from "mongoose";
import { PostModel } from "./post.js";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, // specify password field as a string
    required: true
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: PostModel }],
});

export const UserModel = mongoose.model('User', userSchema);
