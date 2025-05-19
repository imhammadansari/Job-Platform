import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmittedApplications = () => {

    const navigate = useNavigate();

    const [jobDetails, setJobDetails] = useState([]);
    const [loading, setLoading] = useState(false)

    axios.defaults.withCredentials = true;
    const getJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/jobs/viewEmployeeJobs');
            console.log(response.data);
            setJobDetails(response.data);
        } catch (error) {
            alert(error.data.message);
        } finally {
            setLoading(false);
        }
    }
    
    const deleteJob = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8000/jobs/deleteJob/${id}`);
            if(response.success === 200){
                toast.success("Job Deleted Successfully");
                setTimeout (() => getJobDetails(), 1500);

            }

        } catch (error) {
            if(error.response && error.response.status){
                toast.error(error.data.message);
            }

        } finally {
            setLoading(false);
        }
    }

    
    const navigatebutton = () => {
        navigate(`/home`)
    }

    useEffect(() => {
        getJobDetails();
    }, []);

    if(loading) return <div className='p-6'>Loading.....</div>

    return (
        <>
            <Header />

            <div className='w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-gray-200 flex flex-col items-center justify-center'>
                {jobDetails.length > 0 ? (
                    <div className='w-full px-2 sm:px-3 md:px-4 lg:px-4 py-2 md:py-4 overflow-x-auto bg-white'>
                        <div className='min-w-[600px]'>
                        <div className='grid grid-cols-5 text-center'>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Title</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Salary</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Type</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Deadline</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Action</h1>
                        </div>

                        {jobDetails?.map((job, index) => {
                            return (
                                    <Link to={`/applications-recieved/${job._id}`}>
                                        <div key={index} className='grid grid-cols-5 text-center'>
                                    <h1 className='border-l border-b p-2 border-black'>{job.title}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.salary}</h1>
                                    <h1 className='border-b border-l border-black p-2'>{job.type}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.deadline?.slice(0, 10)}</h1>
                                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 p-2 items-center justify-center border-b border-l'>
                                    <Link to={`/update-jobs/${job._id}`} className='p-1 w-24 md:w-20 h-8 rounded-md text-white bg-[rgb(2,6,111)]'>Update</Link>
                                    <button onClick={() => deleteJob(job._id)} className='p-1 w-24 md:w-20 h-8 rounded-md text-white bg-red-700'>Delete</button>

                                    
                                    </div>
                                </div>
                                    </Link>
                            )
                        })}

                        <div className='flex items-center justify-center'>
                            <button onClick={navigatebutton} className='w-24 cursor-pointer h-10 items-center justify-center flex rounded-md text-white bg-[rgb(2,6,111)] hover:bg-white hover:text-[rgb(2,6,111)] my-2'>Back</button>

                        </div>
                    </div>
                    </div>

                ) : (
                    <p>No Jobs Found</p>
                )}

            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    )
}

export default SubmittedApplications

