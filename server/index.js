import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from './routes/auth.js';
import questionRouter from './routes/question.js';
import answerRouter from './routes/answer.js';

const app = express();
dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// set up routes
// for user
app.use("/auth", userRouter);

// for questions
app.use("/question", questionRouter)

//for answers
app.use("/answer", answerRouter)

mongoose.connect(MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
    );
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});