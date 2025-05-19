import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FIlterMenu = ({ alljobs, setAllJobs, jobs, setJobs, hideFilterMenu }) => {

    const [miniSalary, setMiniSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(99999999);
    const [jobType, setJobType] = useState('');

    const fetchJobs = async () => {
            try {
            const response = await axios.get('http://localhost:8000/jobs/viewJobs');
            setJobs(response.data);
            setAllJobs(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }

    const filtersJobs = (type = jobType, min = miniSalary, max = maxSalary) => {
    const filteredJobs = jobs.filter(job => {
        const salaryMatch = job.salary >= min && job.salary <= max;
        const jobTypeMatch = !type || job.type.toLowerCase() === type.toLowerCase();

        return salaryMatch && jobTypeMatch;
    });

    setAllJobs(filteredJobs);
};


    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            <div className='inset-0 fixed z-50 overflow-hidden'>
                <div className='inset-0 bg-black/20 absolute'></div>

                <div className='flex flex-col w-2/3 h-full relative bg-white'>
                    <h1 onClick={hideFilterMenu} className='px-4'>Close</h1>
                    <form onSubmit={filtersJobs} className='px-4 py-4 w-full'>

                        <div className='w-full'>
                            <h1 className='font-medium'>Salary Range</h1>
                            <div className='flex gap-2'>
                                <input className='border border-black/20 w-1/2 p-1' type='number' name='miniSalary'
                                    onChange={(e) => {
    setMiniSalary(e.target.value);
    filtersJobs(e.target.value); // Call filter function instantly
  }} placeholder='min salary' />
                                <input className='border border-black/20 w-1/2 p-1' type='number' name='maxSalary'
                                    onChange={(e) => {
    setMaxSalary(e.target.value);
    filtersJobs(e.target.value); // Call filter function instantly
  }} placeholder='max salary' />
                            </div>
                        </div>

                        <div className='w-full'>
                            <h1 className='pt-4 font-medium'>Condition</h1>

                            <div className='flex gap-2'>

                                <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Part Time"} value='Part Time' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); // Call filter function instantly
  }}/>
                    <p className='text-sm lg:text-base'>Part Time</p>
                    </div>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Full Time"} value='Full Time' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); // Call filter function instantly
  }}/>
                    <p className='text-sm lg:text-base'>Full Time</p>
                    </div>

                    </div>

                    <div className='flex gap-2'>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Contract"} value='Contract' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); // Call filter function instantly
  }}/>
                    <p className='text-sm lg:text-base'>Contract</p>
                    </div>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Internship"} value='Internship' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); // Call filter function instantly
  }}/>
                    <p className='text-sm lg:text-base'>Internship</p>
                    </div>

                            </div>

                        </div>

                            {/* <button type='submit' className='w-20 h-10 text-[rgb(2,6,111)] border rounded-md mt-2 cursor-pointer'>Search</button> */}
                    </form>

                </div>
            </div>
        </>
    )
}

export default FIlterMenu