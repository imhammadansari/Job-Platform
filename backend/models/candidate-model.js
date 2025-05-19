const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "UnBlock",
        anum: ["UnBlock", "Blocked"],
        required: true
    }
})

module.exports = mongoose.model("Candidate", CandidateSchema);