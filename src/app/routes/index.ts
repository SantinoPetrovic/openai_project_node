import { Router } from 'express';
import authRoutes from './auth.routes';
import healthRoutes from './health.routes';
import openAiRoutes from './openai.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/health', healthRoutes);
router.use('/openAi', openAiRoutes);


export default router;
