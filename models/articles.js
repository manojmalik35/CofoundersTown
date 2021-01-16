const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: String,
    body: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tags: [String]
}, { timestamps: true })

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;