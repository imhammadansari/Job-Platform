import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ApplicationsRecieved = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [jobDetails, setJobDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;
    const getJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://job-platform.up.railway.app/apply/applicationsRecieved/${id}`);
            console.log(response.data);
            setJobDetails(response.data);
        } catch (error) {
            alert(error.data.message);
        } finally {
            setLoading(false);
        }
    }

    
    const navigatebutton = () => {
        navigate(`/employee-jobs`)
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
                        <h1 className='text-center font-medium text-lg py-2'>Applications Recieved against the Job <span className='font-bold'>{id}</span></h1>
                        <div className='min-w-[1300px]'>
                        <div className='grid grid-cols-7 text-center'>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Job Title</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Salary</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Job Type</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Applied By</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Candidate Number</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Candidate Email</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Resume</h1>
                        </div>

                        {jobDetails?.map((job, index) => {
                            return (
                                    <div key={index} className='grid grid-cols-7 text-center'>
                                    <h1 className='border-l border-b p-2 border-black'>{job.jobId.title}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.jobId.salary}</h1>
                                    <h1 className='border-b border-l border-black p-2'>{job.jobId.type}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.name}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.phoneNumber}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{job.email}</h1>
                                    <a
              href={`https://job-platform.up.railway.app/apply/downloadResume/${job._id}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline border-l border-b p-2 border-black'
            >
              Download
            </a>

                                </div>
                            )
                        })}

                        <div className='flex items-center justify-center'>
                            <button onClick={navigatebutton} className='w-24 hover:bg-white hover:text-[rgb(2,6,111)] cursor-pointer h-10 items-center justify-center flex rounded-md text-white bg-[rgb(2,6,111)] my-2'>Back</button>

                        </div>
                    </div>
                    </div>

                ) : (
                    <p>No Submitted Application Against This Job</p>
                )}

            </div>
        </>
    )
}

export default ApplicationsRecieved

