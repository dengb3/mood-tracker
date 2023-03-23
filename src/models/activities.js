import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  activity_name: { type: String, required: true },
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

export const ActivityModel = mongoose.model('Activity', activitySchema);