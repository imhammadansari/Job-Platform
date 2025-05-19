const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employee-model');

module.exports = async function (req, res, next){
    if(!req.cookies.token){
        return res.status(503).send("Employee must be loggedin!");
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await employeeModel.findOne({email: decoded.email}).select("-password");

        if(!user) return res.status(400).send("Employee not found");

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}