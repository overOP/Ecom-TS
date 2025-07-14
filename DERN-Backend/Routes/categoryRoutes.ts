import express from 'express';
import { createCategory, getAllCategories } from '../controller/Category/Category';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);

export default router;
