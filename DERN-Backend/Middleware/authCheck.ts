import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the shape of your JWT payload
interface JwtPayload {
  id: number;
  email: string;
  name: string;
  accountType: 'NORMAL' | 'BUSINESS';
  iat?: number;
  exp?: number;
}

// Extend Express Request type to include the JWT user
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const raw = req.headers.authorization || '';
    const token = raw.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded;

    next();
  } catch (err: any) {
    res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};

export default authCheck;
