import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workoutType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutType",
      required: true,
    },
    duration: { type: Number, required: true }, // in minutes
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
