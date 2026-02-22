import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";

export const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "1h" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ data: newUser, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        },
            process.env.JWT_SECRET,
            { expiresIn: "1h" });

        return res.status(200).json({ data: existingUser, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const listAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(_id,
            { name, about, tags },
            { returnDocument: "after" }
        );
        return res.status(200).json({ data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}