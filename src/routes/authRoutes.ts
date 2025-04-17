/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and profile
 */
import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController";
import { protect } from "../middlewares/auth";

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUser);
/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 643a68f498c4fc19ddf8a123
 *                 name:
 *                   type: string
 *                   example: ddd ddd
 *                 email:
 *                   type: string
 *                   example: ddd@example.com
 *                 age:
 *                   type: number
 *                   example: 30
 *                 height:
 *                   type: number
 *                   example: 175
 *                 weight:
 *                   type: number
 *                   example: 70
 *       401:
 *         description: Unauthorized access
 */
router.get("/profile", protect, getUserProfile);
/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Update user profile fields (any field is optional)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *     responses:
 *       200:
 *         description: User profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: number
 *                 height:
 *                   type: number
 *                 weight:
 *                   type: number
 *       401:
 *         description: Unauthorized access
 */
router.put("/profile", protect, updateUserProfile);
export default router;
