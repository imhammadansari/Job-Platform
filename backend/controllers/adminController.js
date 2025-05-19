const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminModel = require('../models/admin-model');

const adminRegistered = async function (req, res){
    try {
        let { name, email, password } = req.body;

        let admin = await adminModel.findOne({ email });

        if(admin) return res.status(400).send("Admin already exists");

        bcrypt.genSalt(10, function (error, salt){
            if(error) return res.send(error.mesage);

            bcrypt.hash(password, salt, async function (error, hash){
                if(error) return res.send(error.mesage);

                else{
                    const admin = await adminModel.create({
                        name,
                        email,
                        password: hash
                    })

                    let token = jwt.sign({email: admin.email, _id: admin._id}, process.env.ADMIN_KEY);
                    res.cookie("token", token, {
                        httpOnly: true,
        secure: true,
        sameSite: 'None'
                    });
                    res.status(200).send("Admin Created Successfully");
                }

            })
        })
    } catch (error) {
        res.status(500).send(error.message);

    }
}

const viewAdmin = async function (req, res){
    try {
        const id = req.admin._id;

        const admin = await adminModel.findOne(id).select("-password");

        if(!admin) return res.status(400).send("No admin found");

        res.status(200).send(admin);
    } catch (error) {
        res.status(500).send(error.message);        
    }
}

const adminLogin = async function (req, res){
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }

        const admin = await adminModel.findOne({email});

        if(!admin) return res.status(402).send("Admin does not exist");

        bcrypt.compare(password, admin.password, async function (error, result){

            if (error) {
                return res.status(500).send("Error comparing passwords");
            }
            
            if (!result) {
                return res.status(401).send("Invalid credentials");
            }

            let token = jwt.sign({email: admin.email, _id: admin._id}, process.env.ADMIN_KEY);
            res.cookie("token", token, {
                httpOnly: true,
        secure: true,
        sameSite: 'None'
            });
            res.status(200).send("Admin Loggedin");
        })
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const adminLogout = async function (req, res){
    try {
        if(req.cookies.token){
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            });
            res.status(200).send("Admin Logout");
        } else {
            res.send("Something went wrong");
        }
    } catch (error) {
        res.status(500).send(error.message);

    }
}

module.exports = { adminRegistered, adminLogin, adminLogout, viewAdmin
};