import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: number;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, jwtSecret as string, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token,jwtSecret as string) as JwtPayload;
};