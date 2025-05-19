const express = require('express');
const { loginUser, registerUser, logoutUser, deleteUser, viewEmployee } = require('../controllers/employeeControllers');
const isEmployeeLoggedin = require('../middlewares/isEmployeeLoggedin');
const isAdminLoggedIn = require('../middlewares/isAdminLoggedin');
const router = express.Router();

router.post("/employeeRegisterUser", registerUser);
router.post("/employeeLogin", loginUser);
router.get("/viewEmployee", isEmployeeLoggedin, viewEmployee);
router.post("/employeeLogout", isEmployeeLoggedin, logoutUser);
router.post("/employeeDelete", isAdminLoggedIn, deleteUser);

module.exports = router;