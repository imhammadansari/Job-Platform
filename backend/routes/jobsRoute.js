const express = require('express');
const { createJob, viewAllJobs, viewAllEmployeeJobs, viewJobsById, updatejob, updatejobByAdmin, 
    deletejob, deletejobByAdmin } = require('../controllers/jobsController');
const isEmployeeLoggedin = require('../middlewares/isEmployeeLoggedin');
const isAdminLoggedIn = require('../middlewares/isAdminLoggedIn');
const router = express.Router();

router.post("/createJob", isEmployeeLoggedin, createJob);
router.get("/viewJobs", viewAllJobs);
router.get("/viewJobsByAdmin", isAdminLoggedIn, viewAllJobs);
router.get("/viewEmployeeJobs", isEmployeeLoggedin, viewAllEmployeeJobs);
router.get("/viewJobs/:id", viewJobsById);
router.post("/updateJob/:id", isEmployeeLoggedin, updatejob);
router.post("/deleteJob/:id", isEmployeeLoggedin, deletejob);
router.post("/adminUpdateJobs/:id", isAdminLoggedIn, updatejobByAdmin);
router.post("/adminDeleteJobs/:id", isAdminLoggedIn, deletejobByAdmin);

module.exports = router;