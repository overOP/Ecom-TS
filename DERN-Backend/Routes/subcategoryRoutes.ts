import express from 'express';
import { createCategory, getSubcategory} from '../controller/Subcategory/Subcategory';

const router = express.Router();

router.get('/', getSubcategory);
router.post('/', createCategory);

export default router;
