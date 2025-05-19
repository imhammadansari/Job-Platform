import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MenuBar = ({ hideMenu }) => {

      const [candidateUser, setCandidateUser] = useState('');
    const [employeeUser, setEmployeeUser] = useState('');
    const [adminUser, setAdminUser] = useState('');

    const navigate = useNavigate();


      axios.defaults.withCredentials = true;
    
    const candidateLoggedUser = async () => {
        try {
            const response = await axios.get(`https://job-platform.up.railway.app/candidate/viewCandidate`);
            setCandidateUser(response.data);
        } catch (error) {
        }
    }

    const logoutCandidate = async () => {
        try {
            const response = await axios.post('https://job-platform.up.railway.app/candidate/candidateLogout');
            if (response.status === 200) {
                toast.success("Candidate Loggedout successfully!")
                                setTimeout(() => window.location.reload(), 2000);

            }
        } catch (error) {

        }
    }

    const logoutEmployee = async () => {
        try {
            const response = await axios.post('https://job-platform.up.railway.app/employee/employeeLogout');
            if (response.status === 200) {
                toast.success("Employee Loggedout successfully!")
                                setTimeout(() => window.location.reload(), 2000);

            }
        } catch (error) {

        }
    }

    const logoutAdmin = async () => {
        try {
            const response = await axios.post('https://job-platform.up.railway.app/admin/adminLogout');
            if (response.status === 200) {
                toast.success("Admin Loggedout successfully!")
                                setTimeout(() => window.location.reload(), 2000);

            }
        } catch (error) {


        }
    }

    const employeeLoggedUser = async () => {
        try {
            const response = await axios.get(`https://job-platform.up.railway.app/employee/viewEmployee`);
            setEmployeeUser(response.data);
        } catch (error) {

        }
    }

    const adminLoggedUser = async () => {
        try {
            const response = await axios.get(`https://job-platform.up.railway.app/admin/viewAdmin`);
            setAdminUser(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

      useEffect(() => {
          candidateLoggedUser();
          adminLoggedUser();
          employeeLoggedUser();
      }, []);
  
      const handleAccountNavigation = async (e) => {
      const value = e.target.value;
  
      if (value === "candidateLogout") {
          await logoutCandidate();
          setTimeout(() => navigate('/home'), 2000);
          return;
      }
      
      if (value === "employeeLogout") {
          await logoutEmployee();
          setTimeout(() => navigate('/home'), 2000);
          return;
      }
      
      if (value === "adminLogout") {
          await logoutAdmin();
          setTimeout(() => navigate('/home'), 2000);
          return;
      }
  
      
  
      if (value) {
          navigate(value);
      }
  }
  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>

      <div className='absolute inset-0 bg-black/20' onClick={hideMenu}></div>
      
      <div className='relative flex justify-end h-full w-full'>

        <div className='bg-[rgb(2,6,111)] text-shadow-white w-1/3 h-full flex flex-col '>
          <div className='p-4'>
            <button onClick={hideMenu} className='mb-6 text-white'>Close</button>
            <ul className='flex flex-col gap-4 text-white'>
              <li><a href="/home">Home</a></li>
              <li><a href="/job-posts">Post a Job</a></li>
              <li><a href="/home">Browse Jobs</a></li>
              <li>
                            {(candidateUser?._id || employeeUser?._id || adminUser?._id) ? (
                                <select className='bg-[rgb(2,6,111)]' onChange={handleAccountNavigation} defaultValue="">
                                    <option value="" disabled>Account</option>

                                    {employeeUser?._id && (
                                        <>
                                            <option value="/employee-jobs">Dashboard</option>
                                            <option value="/job-posts">Post a Job</option>
                                            <option value="employeeLogout">Logout</option>

                                        </>
                                    )}

                                    {candidateUser?._id && (
                                        <>
                                            <option value="/submittedApplications">Submitted Jobs</option>
                                            <option value="/home">Browse Jobs</option>
                                            <option value="candidateLogout">Logout</option>
                                        </>
                                    )}

                                    {adminUser?._id && (
                                        <>
                                        <option value="/view-admin-jobs">View Analytics</option>
                                        <option value="adminLogout">Logout</option>
                                        </>

                                    )}
                                </select>
                            ) : (
                                <select className='bg-[rgb(2,6,111)]' onChange={handleAccountNavigation} defaultValue="">
                                    <option className='text-sm' value='' disabled>Login</option>
                                    <option className='text-sm' value='/candidate-login'>Candi Login</option>
                                    <option className='text-sm' value='/employee-login'>Emp Login</option>
                                </select>
                            )}
                        </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      
    </div>
  )
}

export default MenuBar