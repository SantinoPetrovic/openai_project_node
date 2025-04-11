import { Router } from 'express';
import { 
  roleOpenAI,
  startOpenAI
} from '../controllers/openai.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.post('/role', authenticateToken, roleOpenAI);
router.post('/start', authenticateToken, startOpenAI);

export default router;