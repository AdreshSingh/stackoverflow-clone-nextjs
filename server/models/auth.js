import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tags: { type: [String], default: [] },
    about: { type: String, default: "" },
    joinDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('user', userSchema);