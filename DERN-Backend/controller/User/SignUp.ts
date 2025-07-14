import { Request, Response } from 'express';
import { prisma } from '../../config/Prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, accountType } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accountType: accountType?.toUpperCase() || 'NORMAL',
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.accountType, // ✅ FIXED: send accountType as role
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.accountType, // ✅ FIXED
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export default SignUp;
