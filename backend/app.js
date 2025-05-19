const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

dotenv.config();

const candidateRoute = require('./routes/candidateRoute');
const adminRoute = require('./routes/adminRoute');
const employeeRoute = require('./routes/employeeRoute');
const jobsRoute = require('./routes/jobsRoute');
const candidateListsRoute = require('./routes/candidateListsRoute');

app.use(cors({
    origin: "https://job-platform-omega.vercel.app",
    credentials: true
}))

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGODB_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("MongoDB connection failed", error.message);
        process.exit();
    }
}

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/candidate", candidateRoute);
app.use("/admin", adminRoute);
app.use("/employee", employeeRoute);
app.use("/jobs", jobsRoute);
app.use("/apply", candidateListsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});