const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Part Time", "Full Time", "Contract", "Internship"],
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Jobs", JobsSchema);