import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  activity_name: { type: String, required: true },
  date: { type: Date, required: true },
});

export const ActivityModel = mongoose.model('Activity', activitySchema);