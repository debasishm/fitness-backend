import mongoose, { Schema, Document } from "mongoose";

export interface IGoal extends Document {
  user: mongoose.Types.ObjectId;
  workoutType: mongoose.Types.ObjectId;
  targetValue: number;
  currentValue: number | 0;
  startDate: Date;
  endDate: Date;
  isAchieved: boolean;
}

const goalSchema = new Schema<IGoal>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workoutType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutType",
      required: true,
    },
    targetValue: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isAchieved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model<IGoal>("Goal", goalSchema);
export default Goal;
