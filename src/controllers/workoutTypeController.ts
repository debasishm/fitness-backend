import WorkoutType from "../models/workoutType.model";
import { Request, Response } from "express";

export const createWorkoutType = async (req: Request, res: Response) => {
  try {
    const type = await WorkoutType.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWorkoutTypes = async (req: Request, res: Response) => {
  try {
    const types = await WorkoutType.find();
    res.json(types);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
