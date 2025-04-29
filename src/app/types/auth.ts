import { Request } from 'express';
import { JwtPayload } from '../utils/auth.utils';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}