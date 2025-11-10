import mongoose from "mongoose";
// Quiz schema
const quizSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});
// article has title and content
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    quiz: {
        type: [quizSchema],
        required: true
    }
}, { timestamps: true });
export const Article = mongoose.model("Article", articleSchema);
//# sourceMappingURL=articleModel.js.map