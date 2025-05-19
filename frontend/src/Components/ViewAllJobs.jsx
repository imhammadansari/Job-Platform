import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FIlterMenu from './FilterMenu';


const ViewAllJobs = ({searchJobs}) => {
    console.log("Search Jobs", searchJobs)
    

    const [allJobs, setAllJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [miniSalary, setMiniSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(99999999);
    const [jobType, setJobType] = useState('');
    const [filter, setFilter] = useState(false);



    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://job-platform.up.railway.app/jobs/viewJobs');
            setJobs(response.data);
            setAllJobs(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    const showFilterMenu = () => {
        setFilter(!filter);
    }

    const hideFilterMenu = () => {
        setFilter(false);
    }

const filtersJobs = (type = jobType, min = miniSalary, max = maxSalary) => {
  const filteredJobs = jobs.filter(job => {
    const jobSalary = job.salary;

    const salaryMatch =
      (!min || jobSalary >= Number(min)) &&
      (!max || jobSalary <= Number(max));

    const jobTypeMatch = !type || job.type.toLowerCase() === type.toLowerCase();

    return salaryMatch && jobTypeMatch;
  });

  setAllJobs(filteredJobs);
};



    useEffect(() => {
    if (searchJobs && searchJobs.length > 0) {
        setJobs(searchJobs);
        setAllJobs(searchJobs);
    } else {
        fetchJobs(); 
    }
}, [searchJobs]);



    if (loading) return <div>Loading...</div>

    return (
        <>
            <div className='flex w-full min-h-screen gap-4 bg-gray-100 px-2 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-6 jobs-center justify-center'>

                <div className=' flex flex-col md:flex-row w-full'>

                <div className='hidden md:flex flex-col md:w-1/4 xl:w-1/5 mt-1 mr-1 bg-white rounded-xl'>
                
                <form onSubmit={filtersJobs} className='px-4 py-4'>

                    <div>
                    <h1 className='font-medium'>Salary Range</h1>
                    <div className='flex gap-2'>
                    <input className='border border-black/20 w-1/2 p-1' type='number' name='miniSalary' 
                    onChange={(e) => {
  const value = e.target.value;
  setMiniSalary(value);
  filtersJobs();
}}
 placeholder='min salary' />
                    <input className='border border-black/20 w-1/2 p-1' type='number' name='maxSalary'
                    onChange={(e) => {
  const value = e.target.value;
  setMiniSalary(value);
  filtersJobs();
}}
 placeholder='max salary' />
                    </div>
                    </div>
                    
                    <div className='w-full'>
                    <h1 className='pt-4 font-medium'>Job Type</h1>

                    <div className='flex gap-2'>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Part Time"} value='Part Time' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value);
  }}/>
                    <p className='text-sm lg:text-base'>Part Time</p>
                    </div>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Full Time"} value='Full Time' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); 
  }}/>
                    <p className='text-sm lg:text-base'>Full Time</p>
                    </div>

                    </div>

                    <div className='flex gap-2'>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Contract"} value='Contract' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); 
  }}/>
                    <p className='text-sm lg:text-base'>Contract</p>
                    </div>

                    <div className='flex gap-1'>
                    <input type='radio' checked={jobType === "Internship"} value='Internship' name='jobType' onChange={(e) => {
    setJobType(e.target.value);
    filtersJobs(e.target.value); 
  }}/>
                    <p className='text-sm lg:text-base'>Internship</p>
                    </div>

                    </div>

                    </div>
                    
                </form>


                </div>

                {filter && (
                        <FIlterMenu hideFilterMenu={hideFilterMenu} alljobs={allJobs} setAllJobs={setAllJobs} jobs={jobs} setJobs={setJobs}/>

                )}

                <div className='flex flex-col w-full'>
                <h1 className='px-2 flex md:hidden' onClick={showFilterMenu}>Filter</h1>
                    {allJobs.length > 0 ? (
                        allJobs?.map((job, index) => {
                            return (
                                <Link to={`/job-details/${job._id}`} key={index}>
                                    <div className='flex w-full md:jobs-start flex-col md:flex-row gap-5 md:gap-10 px-2 sm:px-3 md:px-4 lg:px-6 py-4 sm:py-3 md:py-4 lg:py-6 border-4 shadow-lg mb-6 rounded-xl bg-white border-gray-100'>
                                        
    
                                        <div className='flex flex-col md:flex-row w-full md:justify-between'>
    
                                            <div className='flex flex-col md:justify-center w-full'>
                                                <h1 className='font-medium text-2xl md:text-xl'>{job.title}</h1>
                                                <div className='hidden md:flex flex-col w-full md:flex-row gap-3 md:gap-8 pt-2 md:pt-3 text-[rgb(133,115,138)]'>
    
                                                    <div className='flex gap-2 justify-center jobs-center'>
                                                        <p className='text-sm lg:text-base'>{job.type}</p>
                                                    </div>
    
                                                    <div className='flex gap-2 justify-center jobs-center'>
                                                        <p className='text-sm lg:text-base'>DeadLine: {job.deadline?.slice(0, 10)}</p>
                                                    </div>

                                                </div>
    
                                                {/* for mobile */}
    
                                                <div className='flex md:hidden flex-col w-full gap-3 pt-2 text-[rgb(133,115,138)]'>
    
                                                    <div className='flex flex-col'>
    
                                                    <div className='flex gap-2'>
                                                        <p>Job Type: {job.type}</p>
                                                    </div>
    
                                                    <div className='flex gap-2'>
                                                        <p>Deadline: {job.deadline?.slice(0, 10)}</p>
                                                    </div>
    
                                                    </div>
    
                                                </div>
    
                                            </div>
    
                                            <div className='flex jobs-center md:hidden xl:flex pt-2'>
                                                <button className='w-20 h-8 text-sm md:text-base md:w-24 hover:bg-white hover:text-[rgb(2,6,111)] md:h-10 rounded-md text-white bg-[rgb(2,6,111)] font-medium'>Apply</button>
                                            </div>
                                        </div>
    
                                    </div>
                                </Link>
                            )
                        })
                    ) : (
                        <div className='px-2'>No Jobs Found</div>
                    )}

                </div>


                </div>
            </div>
        </>
    )
}

export default ViewAllJobs      