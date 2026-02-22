import mongoose from "mongoose";
import Question from "../models/question.js";

export const askQuestion = async (req, res) => {

    try {
        const { postquestiondata } = req.body;
        console.log(postquestiondata);
        const newQuestion = new Question({ ...postquestiondata });
        await newQuestion.save();
        return res.status(201).json({ data: newQuestion });
    } catch (error) {
        console.error(error?.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const listAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ askedon: -1 }); // Exclude password field
        return res.status(200).json({ data: questions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: "Question not found" });
        }

        const deletedQuestion = await Question.findByIdAndDelete(_id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const voteQuestion = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const { value, userid } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: "Question not found" });
        }

        const question = await Question.findById(_id);
        const upIndex = question.upvote.findIndex((id) => id === String(userid));
        const downIndex = question.downvote.findIndex((id) => id === String(userid));

        if (value === "upvote") {
            if (downIndex !== -1) {
                question.downvote = question.downvote.filter((id) => id !== String(userid));
            }
            if (upIndex === -1) {
                question.upvote.push(String(userid));
            } else {
                question.upvote = question.upvote.filter((id) => id !== String(userid));
            }
        } else if (value === "downvote") {
            if (upIndex !== -1) {
                question.upvote = question.upvote.filter((id) => id !== String(userid));
            }
            if (downIndex === -1) {
                question.downvote.push(String(userid));
            } else {
                question.downvote = question.downvote.filter((id) => id !== String(userid));
            }
        }

        const updatedQuestion = await question.save();
        return res.status(200).json({ message: "Question updated successfully", data: updatedQuestion });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}