import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, // specify password field as a string
    required: true
  }
});

export const UserModel = mongoose.model('User', userSchema);

