const express = require('express');
const { applyJob, viewAllAppliedJobs, viewUserSubmittedJobs, applicationsRecieved, downloadResume } = require('../controllers/appliedJobsController');
const isCandidateLoggedin = require('../middlewares/isCandidateLoggedin');
const isEmployeeLoggedin = require('../middlewares/isEmployeeLoggedin');
const router = express.Router();
const upload = require('../config/multer')

router.post("/applyForJob/:id", isCandidateLoggedin, upload.single("resume"), applyJob);
router.get("/viewAppliedJobs", viewAllAppliedJobs);
router.get("/viewCandidateLists", isCandidateLoggedin, viewUserSubmittedJobs);
router.get("/applicationsRecieved/:id", isEmployeeLoggedin, applicationsRecieved);
router.get('/downloadResume/:id', isEmployeeLoggedin, downloadResume);

module.exports = router;