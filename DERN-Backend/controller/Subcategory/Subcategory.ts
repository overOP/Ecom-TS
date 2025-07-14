import { Request, Response } from 'express';
import { prisma } from '../../config/Prisma';

// GET all categories
export const getSubcategory = async (_: Request, res: Response) => {
  try {
    const subcategory = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: subcategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subcategory' });
  }
};

// CREATE a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, image } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  try {
    const newCategory = await prisma.subcategory.create({
      data: { name, image },
    });
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create subcategory' });
  }
};
