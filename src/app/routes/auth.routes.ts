import { Router } from 'express';
import { 
  login,
  register,
  forgotPassword,
  authenticatedUser
} from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.get('/private', authenticateToken, authenticatedUser);

export default router;