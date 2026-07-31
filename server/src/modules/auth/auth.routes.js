import express from 'express';
import { loginController, registerController } from './auth.controller.js';
import { protect } from '../../middleware/auth.middleware.js';

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/me', protect, (req,res)=>{
    res.json({message: "You Are Authenticated", userId: req.userId})
})

export default router;