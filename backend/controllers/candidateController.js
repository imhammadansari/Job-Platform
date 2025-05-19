const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const candidateModel = require('../models/candidate-model');

const registerUser = async function (req, res) {

    try {
        let {name, email, password} = req.body;
        let user = await candidateModel.findOne({email});

        if(user) return res.status(400).send("User already exist");

        bcrypt.genSalt(10, function (error, salt){
            bcrypt.hash(password, salt, async function(error, hash){

                if(error) return res.send(error.mesage);

                else{
                    let user = await candidateModel.create({
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

const updateStatus = async function (req, res){
    try {
        const { id, status } = req.body;
        console.log(req.body);

        const updateStatus = await candidateModel.findByIdAndUpdate(
            id,
            {status},
            {new: true,
            runValidators: true
            }
        );

        if(!updateStatus) return res.status(404).send("Not Found");

        res.status(200).json({request: updateStatus});
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}

const allCandidates = async function(req, res){
    try {
        const candidates = await candidateModel.find();
        if(!candidates) return res.status(400).send("No candidates found");

        res.status(200).send(candidates);

        
    } catch (error) {
        res.status(500).send(error.message);        

    }
}

const viewCandidate = async function (req, res){
    try {
        const id = req.user._id;

        const candidate = await candidateModel.findOne(id).select("-password");

        if(!candidate) return res.status(400).send("No candidate found");

        res.status(200).send(candidate);
    } catch (error) {
        res.status(500).send(error.message);        
    }
}

const deleteCandidate = async function(req, res){
    try {
                const candidateId = req.params.id;
                const deleteCandidate = await candidateModel.findByIdAndDelete(candidateId);
        
                if(!deleteCandidate) return res.status(400).send("job does not exist");
        
                res.status(200).send(`job with the ${candidateId} has been deleted.`);
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

        let user = await candidateModel.findOne({ email });
        
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

const logoutUser = async function (req, res){
    try {
        if(req.cookies.token){
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: 'None'
            });
            res.status(200).send("User Loggedout");
        }
        else{
            res.status(500).sned("Something went wrong");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    registerUser,
    viewCandidate,
    loginUser,
    logoutUser,
    allCandidates,
    deleteCandidate,
    updateStatus
};