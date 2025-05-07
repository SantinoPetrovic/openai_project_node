import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import conversationRoutes from './conversation.routes';
import healthRoutes from './health.routes';
import messageRoutes from './message.routes';
import openAiRoutes from './openai.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/conversation', conversationRoutes);
router.use('/health', healthRoutes);
router.use('/message', messageRoutes);
router.use('/openAi', openAiRoutes);


export default router;
