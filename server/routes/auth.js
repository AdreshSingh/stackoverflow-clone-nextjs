import express from 'express';
import { listAllUsers, login, signup, updateProfile } from '../controllers/auth.js';
import  authenticate  from '../middleware/auth.js';

const router = express.Router();

// Register route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Get all users route
router.get("/getallusers", listAllUsers);

// Update user profile route
router.patch("/updateprofile/:id", authenticate, updateProfile);

export default router;