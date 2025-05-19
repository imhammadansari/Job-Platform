import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import EmployeeSignUpPage from './Pages/EmployeeSignUpPage'
import EmployeeLoginPage from './Pages/EmployeeLoginPage'
import CandidateSignUp from './Pages/CandidateSignUp'
import AdminSignUpPage from './Pages/AdminSignUpPage'
import AdminLoginPage from './Pages/AdminLoginPage'
import CandidateLoginPage from './Pages/CandidateLoginPage'
import JobDetails from './Pages/JobDetails'
import ApplyJob from './Pages/ApplyJob'
import SubmittedApplications from './Pages/SubmittedApplications'
import JobPost from './Pages/JobPost'
import UpdateJobs from './Pages/UpdateJobs'
import EmployeeJobs from './Pages/EmployeeJobs'
import ApplicationsRecieved from './Pages/ApplicationsRecieved'
import AdminViewJobs from './Pages/AdminViewJobs'
import ViewAllCandidates from './Pages/ViewAllCandidates'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element = {<Navigate to = "/home" />} />
        <Route path='/home' element = {<HomePage />} />
        <Route path='/employee-signup' element = {<EmployeeSignUpPage />} />
        <Route path='/employee-login' element = {<EmployeeLoginPage />} />
        <Route path='/candidate-signup' element = {<CandidateSignUp />} />
        <Route path='/candidate-login' element = {<CandidateLoginPage />} />
        <Route path='/candidate-signup' element = {<AdminSignUpPage />} />
        <Route path='/admin-login' element = {<AdminLoginPage />} />
        <Route path='/job-details/:id' element = {<JobDetails />} />
        <Route path='/apply/:id' element = {<ApplyJob />} />
        <Route path='/submittedApplications' element = {<SubmittedApplications />} />
        <Route path='/job-posts' element = {<JobPost />} />
        <Route path='/update-jobs/:id' element = {<UpdateJobs />} />
        <Route path='/employee-jobs' element = {<EmployeeJobs />} />
        <Route path='/applications-recieved/:id' element = {<ApplicationsRecieved />} />
        <Route path='/view-admin-jobs' element = {<AdminViewJobs />} />
        <Route path='/view-all-candidates' element = {<ViewAllCandidates />} />
      </Routes>
    </>
  )
}

export default App
