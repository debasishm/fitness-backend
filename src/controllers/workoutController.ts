import Workout from "../models/workout.model";
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";

export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const workout = await Workout.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const workouts = await Workout.find({ user: req.userId })
      .populate("workoutType")
      .sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
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
