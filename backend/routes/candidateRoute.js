const express = require('express');
const { loginUser, registerUser, logoutUser, viewCandidate, allCandidates, deleteCandidate, updateStatus } = require('../controllers/candidateController');
const isAdminLoggedIn = require('../middlewares/isAdminLoggedIn');
const isCandidateLoggedin = require('../middlewares/isCandidateLoggedin');
const router = express.Router();

router.post("/candidateRegisterUser", registerUser);
router.post("/candidateLogin", loginUser);
router.post("/candidateLogout", isCandidateLoggedin, logoutUser);
router.get("/viewCandidate", isCandidateLoggedin, viewCandidate);
router.get("/viewAllCandidate", isAdminLoggedIn, allCandidates);
router.post("/deleteCandidates/:id", isAdminLoggedIn, deleteCandidate);
router.post("/updateStatus/:id", isAdminLoggedIn, updateStatus);


module.exports = router;