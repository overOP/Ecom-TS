import express from 'express';
import SignUp from '../controller/User/SignUp';
import Login from '../controller/User/Login';
import dataApi from '../controller/User/User';


const router = express.Router();

// POST /users/signUp
router.post('/signUp', SignUp);

// POST /users/login
router.post('/login', Login);

router.get('/dataApi', dataApi); 


export default router;
