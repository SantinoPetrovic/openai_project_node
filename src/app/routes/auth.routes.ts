import { Router } from 'express';
import { 
  login,
  register,
  authenticatedUser
} from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/private', authenticateToken, authenticatedUser);

export default router;