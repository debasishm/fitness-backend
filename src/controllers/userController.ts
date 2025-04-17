import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Types } from "mongoose";

const generateToken = (id: string | Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, age, height, weight } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({
      name,
      email,
      password,
      age,
      height,
      weight,
    });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
