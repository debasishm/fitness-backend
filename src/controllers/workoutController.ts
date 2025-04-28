import Workout from "../models/workout.model";
import Goal from "../models/goal.model";
import WorkoutType from "../models/workoutType.model";
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";

export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const { workoutTypeId, number, date } = req.body;

    // Validate WorkoutType
    const workoutType = await WorkoutType.findById(workoutTypeId);
    if (!workoutType) {
      return res.status(404).json({ message: "Workout type not found" });
    }

    // Create the workout
    const workout = await Workout.create({
      user: req.userId,
      workoutType: workoutTypeId,
      number,
      date,
    });

    // Auto-update related active goals
    const workoutDate = date ? new Date(date) : new Date();

    const activeGoals = await Goal.find({
      user: req.userId,
      workoutType: workoutTypeId,
      isAchieved: false,
      startDate: { $lte: workoutDate },
      endDate: { $gte: workoutDate },
    });

    for (const goal of activeGoals) {
      goal.currentValue += number;

      if (goal.currentValue >= goal.targetValue) {
        goal.isAchieved = true;
      }

      await goal.save();
    }

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query;

    const query: any = {
      user: req.userId,
    };

    if (date && typeof date === "string") {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      query.date = {
        $gte: start,
        $lt: end,
      };
    }

    const workouts = await Workout.find(query)
      .populate("workoutType")
      .sort({ date: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const { workoutTypeId, number, date } = req.body;

    if (workoutTypeId) {
      const workoutType = await WorkoutType.findById(workoutTypeId);
      if (!workoutType) {
        return res.status(404).json({ message: "Workout type not found" });
      }
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { workoutType: workoutTypeId, number, date },
      { new: true }
    );

    if (!workout) return res.status(404).json({ message: "Workout not found" });

    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!workout) return res.status(404).json({ message: "Workout not found" });

    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWorkoutById = async (req: AuthRequest, res: Response) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.userId,
    }).populate("workoutType");

    if (!workout) return res.status(404).json({ message: "Workout not found" });

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
