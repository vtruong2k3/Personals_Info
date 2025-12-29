import express from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiter for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // 50 requests per windowMs (increased for development)
    message: 'Too many authentication attempts, please try again later',
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/verify', protect, verifyToken);

export default router;
