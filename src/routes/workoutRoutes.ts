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
 *               - workoutType
 *               - duration
 *               - calories
 *             properties:
 *               type:
 *                 type: string
 *                 description: Workout type ID
 *               duration:
 *                 type: number
 *               calories:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Workout logged
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Workout updated
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
 *     responses:
 *       204:
 *         description: Workout deleted
 */
router.delete("/:id", deleteWorkout);

export default router;
