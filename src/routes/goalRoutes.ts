/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Fitness goal management and tracking
 */
import express from "express";
import {
  createGoal,
  getGoals,
  updateGoalProgress,
  deleteGoal,
} from "../controllers/goalController";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a fitness goal
 *     tags: [Goals]
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
 *               - targetValue
 *               - startDate
 *               - endDate
 *             properties:
 *               workoutType:
 *                 type: string
 *                 description: ID of the workout type (ObjectId)
 *               targetValue:
 *                 type: number
 *                 example: 5
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Goal created
 */
router.post("/", createGoal);

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals or a specific goal by ID
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: goalId
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional Goal ID to fetch a specific goal
 *     responses:
 *       200:
 *         description: List of goals or a single goal
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Goal'
 *                 - $ref: '#/components/schemas/Goal'
 */
router.get("/", getGoals);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update progress for a specific goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Goal ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data to update the goal progress
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentValue:
 *                 type: number
 *                 example: 4
 *     responses:
 *       200:
 *         description: Goal progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Progress updated
 *                 goal:
 *                   $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Invalid data or bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Goal not found
 */
router.put("/:id", updateGoalProgress);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a specific fitness goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Goal ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Goal deleted
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Goal not found
 */
router.delete("/:id", deleteGoal);

export default router;
