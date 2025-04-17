/**
 * @swagger
 * tags:
 *   name: WorkoutTypes
 *   description: Manage types of workouts
 */
import express from "express";
import {
  createWorkoutType,
  getWorkoutTypes,
} from "../controllers/workoutTypeController";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.use(protect);
/**
 * @swagger
 * /api/workout-types:
 *   post:
 *     summary: Add a workout type
 *     tags: [WorkoutTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Workout type added
 */
router.post("/", createWorkoutType);
/**
 * @swagger
 * /api/workout-types:
 *   get:
 *     summary: Get all workout types
 *     tags: [WorkoutTypes]
 *     responses:
 *       200:
 *         description: List of workout types
 */
router.get("/", getWorkoutTypes);

export default router;
