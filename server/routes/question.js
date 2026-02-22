import express from 'express';
import { askQuestion, listAllQuestions, voteQuestion } from '../controllers/question.js';
import  authenticate  from '../middleware/auth.js';

const router = express.Router();

// create question route
router.post('/ask', authenticate, askQuestion);

// Get all users route
router.get("/getallquestion", listAllQuestions);

// update question votes
router.patch("/vote/:id",authenticate, voteQuestion);


export default router;