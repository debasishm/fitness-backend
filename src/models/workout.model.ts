import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
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
    number: {
      type: Number,
      required: true,
      description:
        "Generic metric: steps, reps, laps, etc. depending on workout type.",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
