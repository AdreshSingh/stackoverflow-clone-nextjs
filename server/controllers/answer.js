import mongoose from "mongoose";
import Question from "../models/question.js";

export const askAnswer = async (req, res) => {

    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: "Question not found" });
        }

        const { noofanswer, answerbody, useranswered, userid } = req.body;
        
        console.log({ noofanswer, answerbody, useranswered, userid })

        const updatedQuestion = await Question.findByIdAndUpdate(
            _id,
            {
                $addToSet: { answer: [{ answerbody, useranswered, userid }] },
                $inc: { noofanswer: 1 }
            },
            { new: true }
        );
        return res.status(201).json({ data: updatedQuestion });
    } catch (error) {
        console.error(error?.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}



export const deleteAnswer = async (req, res) => {

    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({ message: "Question not found" });
        }

        const { noofanswer, answerid } = req.body;

        console.log({ noofanswer, answerid })

        if (!mongoose.Types.ObjectId.isValid(answerid)) {
            return res.status(404).json({ message: "Answer not found" });
        }
        

        const updateQuestion = new Question.updateOne(
            { _id },
            {
                $pull: { answer: { _id: answerid } },
                $inc: { noofanswer: -1 }
            },
            { new: true }
        )
        
        return res.status(201).json({ data: updateQuestion });
    } catch (error) {
        console.error(error?.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
}