import express from 'express';
import { askAnswer, deleteAnswer } from '../controllers/answer.js';
import  authenticate  from '../middleware/auth.js';

const router = express.Router();

//? route for putting an answer
router.post('/postanswer/:id', authenticate, askAnswer);

//? route for deleting an answer
router.patch('/delete/:id', authenticate, deleteAnswer);

export default router;