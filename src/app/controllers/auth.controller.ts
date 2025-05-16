import { RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
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