import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import db from './app/models';
import apiRoutes from './app/routes';

dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json({limit: '50mb'}));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
  db.sequelize.sync({ alter: true });
}

db.sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is running' });
});

app.use('/api', apiRoutes);

app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'API route not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // Optional: fallback if headers are already sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = parseInt(process.env.WEB_PORT || '4000', 10);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});