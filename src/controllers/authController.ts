import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

// Generate JWT token using the userid
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

interface AuthenticatedRequest extends Request {
  user?: any;
}

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
  console.log("I reached here");
  const { name, email, password, age, height, weight } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      age,
      height,
      weight,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest;

    const userDetail = await User.findById(user?.id);
    if (!userDetail) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest;

    const existingUser = await User.findById(user?.id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.name = req.body.name || existingUser.name;
    existingUser.email = req.body.email || existingUser.email;
    existingUser.age = req.body.age ?? existingUser.age;
    existingUser.height = req.body.height ?? existingUser.height;
    existingUser.weight = req.body.weight ?? existingUser.weight;

    if (req.body.password) {
      existingUser.password = req.body.password;
    }

    const updatedUser = await existingUser.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      height: updatedUser.height,
      weight: updatedUser.weight,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
