import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Header from '../Components/Header';

const JobDetails = () => {

    const { id } = useParams();
    const [jobs, setJobs] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchJobDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://job-platform.up.railway.app/jobs/viewJobs/${id}`);
            setJobs(response.data);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>

    return (
        <>
            <Header />
            <div className='w-full px-2 sm:px-3 md:px-6 lg:px-8 pt-2 sm:pt-3 md:pt-4 lg:pt-6 flex flex-col min-h-screen bg-gray-100'>
                <div className='flex flex-col w-full justify-normal md:justify-between md:flex-row items-center md:item-start py-2 sm:py-3 md:py-4 lg:py-6 bg-white px-2 sm:px-3 md:px-6 lg:px-8'>

                    <div className='flex flex-col w-full justify-center gap-2 md:border-l lg:px-10 border-black/20'>
                        <h1 className='sm:px-4 lg:px-0 font-medium text-2xl md:text-3xl'>{jobs.title}</h1>
                        <h1 className='sm:px-4 lg:px-0 text-base md:text-base text-[rgb(133,115,138)]'><span className='font-medium'>Job Type: </span>{jobs.type}</h1>
                        
                        <p className=' text-[rgb(133,115,138)] '><span className='font-medium'>Expected Salary:</span> {jobs.salary}</p>

                    </div>

                    <div className='flex flex-col w-full justify-center pt-2 md:pt-0 gap-2 md:items-end'>

                        <h1 className='sm:px-4 lg:px-0 text-base md:text-base text-[rgb(133,115,138)]'>
                            <span className='font-medium'>Deadline:</span> {jobs.deadline?.slice(0, 10)}</h1>
                        <h1 className='sm:px-4 lg:px-0 text-base md:text-base text-[rgb(133,115,138)]'>
                            <span className='font-medium'>Posted By: </span>{jobs?.employee?.name}</h1>
                        <Link to={`/apply/${jobs._id}`} className='w-[8rem] hover:bg-white hover:text-[rgb(2,6,111)] h-10 text-sm md:text-base text-center flex items-center justify-center rounded-md bg-[rgb(2,6,111)] font-medium text-white'>Apply for Job</Link>


                    </div>

                </div>

                <div className='py-4 px-2 sm:px-3 md:px-8 lg:px-16 gap-2 flex flex-col bg-white'>
                    <h1 className='px-2 font-medium text-md md:text-lg lg:text-2xl'>Description:</h1>
                    <p className='px-2'>{jobs.description}</p>
                </div>
                

            </div>
        </>
    )
}

export default JobDetails