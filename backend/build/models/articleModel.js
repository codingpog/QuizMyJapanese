import mongoose from "mongoose";
// Quiz schema
const questionSchema = new mongoose.Schema({
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
// article schema has title, article content, and quiz (array of questions)
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
        type: [questionSchema],
        required: true
    }
}, { timestamps: true });
export const Article = mongoose.model("Article", articleSchema);
//# sourceMappingURL=articleModel.js.map