import express from 'express';
import authCheck from '../Middleware/authCheck';

const router = express.Router();

router.get('/profile', authCheck, (req, res) => {
  return res.json({
    message: 'Protected route accessed',
    user: req.user,
  });
});

export default router;
