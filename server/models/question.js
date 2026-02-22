import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questiontitle: { type: String, required: true, },
    questionbody: { type: String, required: true },
    questiontags: { type: [String], required: true },
    noofanswer: { type: Number, default: 0 },
    upvote: { type: [String], default: [] },
    downvote: { type: [String], default: [] },
    userposted: { type: String },
    userid: { type: String, required: true },
    askedon: { type: Date, default: Date.now },
    answer: [{
        answerbody: { type: String },
        useranswered: { type: String },
        answeredon: { type: Date, default: Date.now },
        userid: { type: String, required: true },
    }]
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);