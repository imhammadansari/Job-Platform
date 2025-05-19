const candidateListingsModels = require('../models/candidateListings-model');
// const upload = require('../config/multer');

const applyJob = async function (req, res){
    try {
        const { name, email, phoneNumber } = req.body;
        const resume = req.file.buffer;
        console.log(req.body);

        const newRequest = await candidateListingsModels.create({
            name, 
            email,
            phoneNumber,
            jobId: req.params.id,
            candidate: req.user._id,
            resume: resume
        });
        res.status(200).json(newRequest);

    } catch (error) {
        res.status(500).json({ message: 'Failed to apply for a job', error: error.message });
    }
}

const viewAllAppliedJobs = async function (req, res){
    try {
        const jobs = await candidateListingsModels.find().populate('candidate', 'name');

        if(!jobs) return res.status(400).send("No jobs found");

        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const viewUserSubmittedJobs = async function (req, res){
    try {
        const candidateId = req.user._id;

        const jobs = await candidateListingsModels.find({candidate: candidateId}).populate('jobId', 'title');

        if(!jobs || jobs.length === 0) return res.status(400).send("jobs not found");

        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send(error.message);

    }
}

const applicationsRecieved = async function (req, res){
    try {
        const jobId = req.params.id;
        const job = await candidateListingsModels.find({jobId: jobId}).populate('jobId');

        if(!job) return res.status(500).send("job not found");

        res.status(200).send(job);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const downloadResume = async (req, res) => {
    try {
        const application = await candidateListingsModels.findById(req.params.id);
        if (!application || !application.resume) {
            return res.status(404).send("Resume not found");
        }

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${application.name}_Resume.pdf"`,
        });

        res.send(application.resume);
    } catch (error) {
        res.status(500).send("Error downloading resume: " + error.message);
    }
};

module.exports = { applyJob, viewAllAppliedJobs, viewUserSubmittedJobs, applicationsRecieved, downloadResume };