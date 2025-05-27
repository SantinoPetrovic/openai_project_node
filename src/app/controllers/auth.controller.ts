import { RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from '../models';
import { AuthenticatedRequest } from '../types/auth';
import { generateToken } from '../utils/auth.utils';

const { User } = db;

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ userId: user.id, email: user.email, username: user.username });

    res.status(200).json(
      { 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        } 
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    existingUser.resetToken = resetToken;
    existingUser.resetTokenExpires = tokenExpiry;
    await existingUser.save();

    res.status(200).json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Forgot password failed' });
  }
};

export const checkResetToken: RequestHandler = async (req, res) => {
  const { resetToken } = req.body;

  if (!resetToken) {
    res.status(400).json({ error: 'Token is required.' });
    return;
  }

  try {
    const existingUser = await User.findOne({ where: { resetToken } });

    if (!existingUser) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    res.status(200).json({ message: 'Token is correct.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Reset token failed' });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken) {
    res.status(400).json({ error: 'Token is required.' });
    return;
  }

  if (!newPassword) {
    res.status(400).json({ error: 'New password is required.' });
    return;
  }

  try {
    const existingUser = await User.findOne({ where: { resetToken } });

    if (!existingUser) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(200).json({ message: 'New password is set.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Reset token failed' });
  }
};

export const register: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res.status(400).json({ error: 'Email, username and password are required.' });
    return;
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ 
      email,
      username,
      password: hashedPassword,
      tokensUsed: 0,
      tokenLimit: 10000,
    });

    const token = generateToken({ userId: newUser.id, email: newUser.email, username: newUser.username });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const authenticatedUser = async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    message: 'You are authenticated!',
    user: req.user,
  });
};