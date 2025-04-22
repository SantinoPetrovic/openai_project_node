import { Router } from 'express';
import authRoutes from './auth.routes';
import conversationRoutes from './conversation.routes';
import healthRoutes from './health.routes';
import openAiRoutes from './openai.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/conversation', conversationRoutes);
router.use('/health', healthRoutes);
router.use('/openAi', openAiRoutes);


export default router;
