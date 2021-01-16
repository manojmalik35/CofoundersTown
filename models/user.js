const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index : true
    },
    name: String,
    username: String,
    password: String,
    age: {
        type: Number,
        min: 18,
        max: 102
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
module.exports = User;