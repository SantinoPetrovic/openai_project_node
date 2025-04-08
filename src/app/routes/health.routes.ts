import { Router } from 'express';
import { 
  getHealthStatus,
  getDbStatus
} from '../controllers/health.controller';

const router = Router();

router.get('/', getHealthStatus);
router.get('/db', getDbStatus);

export default router;