import { Router } from 'express';
import { 
  createConversation,
  getAllConversations,
  getConversationById
} from '../controllers/conversation.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.get('/', authenticateToken, getAllConversations);
router.get('/:id', authenticateToken, getConversationById);
router.post('/', authenticateToken, createConversation);

export default router;