import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { chatWithOpenAI } from '../controllers/chat.controller';

const router = Router();

router.post('/:conversationId', authenticateToken, chatWithOpenAI);

export default router;