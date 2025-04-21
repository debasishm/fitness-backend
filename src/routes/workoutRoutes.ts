/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Workout logging and tracking
 */
import express from "express";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  getWorkoutById,
} from "../controllers/workoutController";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Log a new workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workoutTypeId
 *               - number
 *             properties:
 *               workoutTypeId:
 *                 type: string
 *                 description: Workout type ID (ObjectId)
 *                 example: "661f7eaa6c7e8a2135f98712"
 *               number:
 *                 type: number
 *                 description: Steps, reps, laps, etc. depending on workout type
 *                 example: 30
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the workout (optional)
 *                 example: "2025-04-20"
 *     responses:
 *       201:
 *         description: Workout logged successfully
 */
router.post("/", createWorkout);

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get user's workout history
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workouts
 */
router.get("/", getWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workoutTypeId:
 *                 type: string
 *                 description: Workout type ID (optional)
 *               number:
 *                 type: number
 *                 description: Updated reps, steps, etc.
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Workout updated successfully
 */
router.put("/:id", updateWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 */
router.delete("/:id", deleteWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout retrieved
 *       404:
 *         description: Workout not found
 */
router.get("/:id", getWorkoutById);

export default router;
