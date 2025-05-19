import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminViewJobs = () => {

    const navigate = useNavigate();

    const [jobDetails, setJobDetails] = useState([]);
    const [users, setUsers] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;
    const getJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://job-platform.up.railway.app/jobs/viewJobsByAdmin');
            console.log(response.data);
            setJobDetails(response.data);
        } catch (error) {
            alert(error.data.message);
        } finally {
            setLoading(false);
        }
    }

    const allCandidates = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://job-platform.up.railway.app/candidate/viewAllCandidate');
            setUsers(response.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    const successNotify = (id) => {
        toast.success(`Job with id ${id} has been deleted`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    const totalJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://job-platform.up.railway.app/jobs/viewJobs');
            setAllJobs(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteJob = async (id) => {
        try {
            const response = await axios.post(`https://job-platform.up.railway.app/jobs/adminDeleteJobs/${id}`);
            if (response.status === 200) {
                successNotify(id);
                setTimeout(() => {
                    navigate('/view-admin-jobs');
                }, 5000);
            }
        } catch (error) {
            console.log(error.message);
        }

    }


    const navigatebutton = () => {
        navigate(`/home`)
    }

    useEffect(() => {
        getJobDetails();
        allCandidates();
        totalJobs();
    }, []);

    if(loading) return <div>Loading....</div>

    return (
        <>
            <Header />

            <div className='w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-gray-200 flex flex-col items-center justify-center'>
                {jobDetails.length > 0 ? (
                    <div className='w-full px-2 sm:px-3 md:px-4 lg:px-4 py-2 md:py-4 overflow-x-auto bg-white'>
                        <Link className='bg-[rgb(2,6,111)] text-white rounded-md p-2 hover:bg-white hover:text-[rgb(2,6,111)]' to={'/view-all-candidates'}>View All Users</Link>
                        <div className='flex gap-4 py-2'>
                            <h1><span className='font-medium'>Total Users:</span> {users.length}</h1>
                            <h1><span className='font-medium'>Total Jobs:</span> {allJobs.length}</h1>
                        </div>
                        <div className='min-w-auto'>
                            <div className='grid grid-cols-5 text-center'>
                                <h1 className='border-l font-medium border-b p-2 border-black'>Title</h1>
                                <h1 className='border-l font-medium border-b p-2 border-black'>Salary</h1>
                                <h1 className='border-l font-medium border-b p-2 border-black'>Type</h1>
                                <h1 className='border-l font-medium border-b p-2 border-black'>Deadline</h1>
                                <h1 className='border-l font-medium border-b p-2 border-black'>Action</h1>
                            </div>

                            {jobDetails?.map((job, index) => {
                                return (
                                    <div key={index} className='grid grid-cols-5 text-center'>
                                        <h1 className='border-l border-b p-2 border-black'>{job.title}</h1>
                                        <h1 className='border-l border-b p-2 border-black'>{job.salary}</h1>
                                        <h1 className='border-b border-l border-black p-2'>{job.type}</h1>
                                        <h1 className='border-l border-b p-2 border-black'>{job.deadline}</h1>
                                        <div className='flex flex-col md:flex-row gap-2 md:gap-4 p-2 items-center justify-center border-b border-l'>
                                            <button onClick={() => deleteJob(job._id)} className='p-1 cursor-pointer w-24 md:w-20 h-8 rounded-md text-white bg-red-700'>Delete</button>


                                        </div>
                                    </div>
                                )
                            })}

                            <div className='flex items-center justify-center'>
                                <button onClick={navigatebutton} className='w-24 cursor-pointer h-10 items-center justify-center flex rounded-md text-white hover:bg-white hover:text-[rgb(2,6,111)] bg-[rgb(2,6,111)] my-2'>Back</button>

                            </div>
                        </div>
                    </div>

                ) : (
                    <p>No Jobs Found</p>
                )}

            </div>
            <ToastContainer />

        </>
    )
}

export default AdminViewJobs

