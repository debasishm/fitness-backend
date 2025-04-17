import { Request, Response } from 'express';
import Goal from '../models/goal.model';
import { AuthRequest } from '../middlewares/auth';

export const createGoal = async (req: AuthRequest, res: Response) => {
  try {
    const { goalType, targetValue, startDate, endDate } = req.body;

    const goal = await Goal.create({
      user: req.userId,
      goalType,
      targetValue,
      startDate,
      endDate,
    });

    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error creating goal', error: err });
  }
};

export const getGoals = async (req: AuthRequest, res: Response) => {
  try {
    const goals = await Goal.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals', error: err });
  }
};

export const updateGoalProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { goalId } = req.params;
    const { currentValue } = req.body;

    const goal = await Goal.findOne({ _id: goalId, user: req.userId });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    goal.currentValue = currentValue;

    // Auto-track progress
    if (currentValue >= goal.targetValue) {
      goal.isAchieved = true;
    }

    await goal.save();

    let message = 'Progress updated';

    // Notify if close to goal (≥ 90% of target)
    if (!goal.isAchieved && currentValue >= goal.targetValue * 0.9) {
      message = 'You’re very close to reaching your goal!';
    }

    res.status(200).json({ goal, message });
  } catch (err) {
    res.status(500).json({ message: 'Error updating progress', error: err });
  }
};

export const deleteGoal = async (req: AuthRequest, res: Response) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findOneAndDelete({ _id: goalId, user: req.userId });

    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting goal', error: err });
  }
};
