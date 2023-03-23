import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  password: { type: Number, required: true },
});

export const UserModel = mongoose.model('User', userSchema);

