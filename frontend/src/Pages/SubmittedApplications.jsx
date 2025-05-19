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
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;

    const getJobDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get('https://job-platform.up.railway.app/apply/viewCandidateLists');
            console.log("SubmittedApp", response.data);
            setJobDetails(response.data);
        } catch (error) {
            alert(error.data.message);
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

    if(loading) return <div className='p-4'>Loading...</div>

    
    return (
        <>
            <Header />

            <div className='w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-gray-200 flex flex-col items-center justify-center'>
                {jobDetails.length > 0 ? (
                    <div className='w-full px-2 sm:px-3 md:px-4 lg:px-4 py-2 md:py-4 overflow-x-auto bg-white'>
                        <div className='min-w-[1000px]'>
                        <div className='grid grid-cols-4 text-center'>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Name</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Email</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Number</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Applied For</h1>
                        </div>

                        {jobDetails?.map((job, index) => {
                            return (
                                    <div key={index} className='grid grid-cols-4 text-center'>
                                    <h1 className='border-l border-b p-2 border-black'>{job.name}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.email}</h1>
                                    <h1 className='border-b border-l border-black p-2'>{job.phoneNumber}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.jobId ? job.jobId.title : "N/A"}</h1>
  
                                </div>
                            )
                        })}

                        <div className='flex items-center justify-center'>
                            <button onClick={navigatebutton} className='w-24 cursor-pointer h-10 items-center justify-center rounded-md text-white flex bg-[rgb(2,6,111)] my-2'>Back</button>

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

