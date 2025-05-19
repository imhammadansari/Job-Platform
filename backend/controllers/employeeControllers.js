const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employee-model');

const registerUser = async function (req, res) {

    try {
        let {name, email, password} = req.body;
        let user = await employeeModel.findOne({email});

        if(user) return res.status(400).send("User already exist");

        bcrypt.genSalt(10, function (error, salt){
            bcrypt.hash(password, salt, async function(error, hash){

                if(error) return res.send(error.mesage);

                else{
                    let user = await employeeModel.create({
                        name,
                        email,
                        password: hash
                    })

                    let token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_KEY);

                    res.cookie("token", token, {
                        httpOnly: true,
        secure: true,
        sameSite: 'None'
                    });
                    res.status(200).send("User Created Successfully");
                }
            })
        })
    } catch (error) {
        res.status(500).send(error.message);
        
    }
    
}

const loginUser = async function (req, res){
    try {
        let {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        let user = await employeeModel.findOne({ email });
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        bcrypt.compare(password, user.password, async function (error, result){
            if (error) {
                return res.status(500).send("Error comparing passwords");
            }
            
            if (!result) {
                return res.status(401).send("Invalid credentials");
            }

                const token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_KEY);

                res.cookie("token", token, {
                    httpOnly: true,
        secure: true,
        sameSite: 'None'
                });
                res.status(200).send("User Loggedin Successfully");
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const viewEmployee = async function (req, res){
    try {
        const id = req.user._id;

        const employee = await employeeModel.findOne(id).select("-password");

        if(!employee) return res.status(400).send("No employee found");

        res.status(200).send(employee);
    } catch (error) {
        res.status(500).send(error.message);        
    }
}

const logoutUser = async function (req, res){
    try {
        if(req.cookies.token){
            res.clearCookie("token");
            res.status(200).send("User Loggedout");
        }
        else{
            res.status(500).send("Something went wrong");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteUser = async function (req, res){
    try {
        const candidateID = req.params.id;
        const candidate = await employeeModel.findByIdAndDelete(candidateID);

        if(!candidate) return res.status(400).send("Candidate does not found");

        res.status(200).send(`Candidate with the ${candidateID} has been deleted.`);

    } catch (error) {
        res.status(500).send(error.message);

    }
}

module.exports = {
    registerUser,
    loginUser,
    viewEmployee,
    logoutUser,
    deleteUser
};