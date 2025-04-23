import { Router } from 'express';
import { 
  createMessage,
  getMessagesByConversationId
} from '../controllers/message.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.get('/:conversationId', authenticateToken, getMessagesByConversationId);
router.post('/:conversationId', authenticateToken, createMessage);

export default router;