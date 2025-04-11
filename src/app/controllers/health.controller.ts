import { RequestHandler } from 'express';
import db from '../models';

export const getHealthStatus: RequestHandler = (req, res): void => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
};

export const getDbStatus: RequestHandler = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).json({ db: 'connected' });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ db: 'disconnected', error: errMsg });
  }
};