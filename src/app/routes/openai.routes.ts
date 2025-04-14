import { Router } from 'express';
import { 
  startOpenAI
} from '../controllers/openai.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.post('/start', authenticateToken, startOpenAI);

export default router;