const mongoose = require('mongoose');

const CandidateListingsSchema = mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true
    },
    candidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    resume: {
        type: Buffer,
        required: true
    }
})

module.exports =  mongoose.model("Listings", CandidateListingsSchema);
