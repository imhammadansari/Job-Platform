import React, { useEffect, useState } from 'react'
import MenuBar from './MenuBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);
    const [candidateUser, setCandidateUser] = useState('');
    const [employeeUser, setEmployeeUser] = useState('');
    const [adminUser, setAdminUser] = useState('');

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
                toast.success("Employee Loggedout successfully!");
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

    const hideMenu = () => setMenu(false);
    const showMenu = () => setMenu(!menu);

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
        <>
            <div className='w-full flex justify-between text-white h-auto py-4 px-8 md:px-12 lg:px-10 sticky top-0 z-50 bg-gradient-to-r shadow-md shadow-[rgb(2,6,111)] bg-[rgb(2,6,111)]'>
                <div>
                    <Link to='/'>Logo</Link>
                </div>

                <div className='flex items-center'>
                    <ul className='hidden md:flex cursor-pointer gap-10 text-lg'>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/job-posts">Post a Job</Link></li>
                        <li><Link to="/home">Browse Jobs</Link></li>
                        <li>
                            {(candidateUser?._id || employeeUser?._id || adminUser?._id) ? (
                                <select className='bg-[rgb(2,6,111)] w-24' onChange={handleAccountNavigation} defaultValue="">
                                    <option value="" disabled>Account</option>

                                    {employeeUser?._id && (
                                        <>
                                            <option className='text-sm' value="/employee-jobs">Dashboard</option>
                                            <option className='text-sm' value="/job-posts">Post a Job</option>
                                            <option className='text-sm' value="employeeLogout">Logout</option>

                                        </>
                                    )}

                                    {candidateUser?._id && (
                                        <>
                                            <option className='text-sm' value="/submittedApplications">Submitted Jobs</option>
                                            <option className='text-sm' value="/home">Browse Jobs</option>
                                            <option className='text-sm' value="candidateLogout">Logout</option>
                                        </>
                                    )}

                                    {adminUser?._id && (
                                        <>
                                        <option className='text-sm' value="/view-admin-jobs">View Analytics</option>
                                        <option className='text-sm' value="adminLogout">Logout</option>
                                        </>

                                    )}
                                </select>
                            ) : (
                                <select className='bg-[rgb(2,6,111)] w-24' onChange={handleAccountNavigation} defaultValue="">
                                    <option className='text-sm' value='' disabled>Login</option>
                                    <option className='text-sm' value='/candidate-login'>Candidate Login</option>
                                    <option className='text-sm' value='/employee-login'>Employee Login</option>
                                </select>
                            )}
                        </li>
                    </ul>




                    <ul className='flex md:hidden'>
                        <img onClick={showMenu} className='w-5 h-5' src='/icons8-menu-50 (1).png' alt='menu' />
                    </ul>
                </div>
            </div>

            {menu && (
                <MenuBar hideMenu={hideMenu} />
            )}
            <ToastContainer position="top-center" autoClose={3000} />

        </>
    )
}

export default Header
