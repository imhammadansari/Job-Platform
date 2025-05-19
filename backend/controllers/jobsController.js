const jobsModel = require('../models/jobs-model');
// const upload = require('../config/multer');

const createJob = async function (req, res){
    try {
        const { title, description, type, tags, salary, deadline } = req.body;
        console.log(req.body);

        const newRequest = await jobsModel.create({
            title, 
            description,
            type,
            tags, 
            salary, 
            deadline,
            employee: req.user._id
        });
        res.status(200).json(newRequest);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create job', error: error.message });
    }
}

const viewAllJobs = async function (req, res){
    try {
        const jobs = await jobsModel.find().populate('employee', 'name');

        if(!jobs) return res.status(400).send("No jobs found");

        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const viewAllEmployeeJobs = async function (req, res){
    try {
        const employeeId = req.user._id;

        const jobs = await jobsModel.find({employee: employeeId});

        if(!jobs || jobs.length === 0) return res.status(400).send("jobs not found");

        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send(error.message);

    }
}

const viewJobsById = async function (req, res){
    try {
        const jobId = req.params.id;
        const job = await jobsModel.findById(jobId).populate('employee', 'name');

        if(!job) return res.status(500).send("job not found");

        res.status(200).send(job);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updatejob = async function (req, res){
    try {
        const jobID = req.params.id;
        const updatedJob = await jobsModel.findByIdAndUpdate(
            jobID,
            {...req.body},
            {new: true, runValidators: true}
        )

        if(!updatedJob) return res.status(400).send("job does not exist");

        res.status(200).send({updatedJob: updatedJob});
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const updatejobByAdmin = async function (req, res){
    try {
        const jobID = req.params.id;
        const updatedJob = await jobsModel.findByIdAndUpdate(
            jobID,
            {...req.body},
            {new: true, runValidators: true}
        )

        if(!updatedJob) return res.status(400).send("job does not exist");

        res.status(200).send({updatedJob: updatedJob});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deletejob = async function (req, res){
    try {
        const jobID = req.params.id;
        const deletedJob = await jobsModel.findByIdAndDelete(jobID);

        if(!deletedJob) return res.status(400).send("job does not exist");

        res.status(200).send(`job with the ${jobID} has been deleted.`);
    } catch (error) {
        res.status(500).send(error.message);

    }
}

const deletejobByAdmin = async function (req, res){
    try {
        const jobID = req.params.id;
        const deleteJob = await jobsModel.findByIdAndDelete(jobID);

        if(!deleteJob) return res.status(400).send("job does not exist");

        res.status(200).send(`job with the ${jobID} has been deleted.`);
    } catch (error) {
        res.status(500).send(error.message);

    }
}
module.exports = { createJob, viewAllJobs, viewAllEmployeeJobs, viewJobsById, updatejob, updatejobByAdmin, 
    deletejob, deletejobByAdmin };