const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a blog title"]
    },
    description:{
        type: String,
        required: [true, "please provide a blog description"]
    },
    tag: {
        type: String,
        enum: ["Nature", "Lifestyle", "Technology", "Sport"]
    },
    createdby:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "please provide a writer"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Blog", blogSchema)