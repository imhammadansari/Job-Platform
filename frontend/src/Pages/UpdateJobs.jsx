import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateJobs = () => {

  const navigate = useNavigate();
  const { id } = useParams();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState('');
  const [salary, setSalary] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');

    const successNotify = () => {
      toast.success('Job Updated Successfully', {
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
  
    const failedNotify = () => {
      toast.error('User must be loggedin!', {
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

  axios.defaults.withCredentials = true;


  const getJobDetails = async() => {
    try {
        const response = await axios.get(`https://job-platform.up.railway.app/jobs/viewJobs/${id}`);
            const responseData = response.data;
            console.log(responseData);
            if (responseData) {
                setTitle(responseData.title);
                setDescription(responseData.description);
                setType(responseData.type);
                setTags(responseData.tags);
                setSalary(responseData.salary);
                setDeadline(responseData.deadline?.slice(0, 10));
            } else {
                alert("Details not found");
            }
        } catch (error) {
            console.log(error.message);
            seterror(error.response.data.message || "Updates Failed");

        }
    }


  const updateJob = async(e) => {
    e.preventDefault();
    seterror('');

    try {
      const response = await axios.post(`https://job-platform.up.railway.app/jobs/updateJob/${id}`, {
        title,
        description,
        type,
        salary,
        tags,
        deadline
      }
        
      );

      if(response.status === 200){
        successNotify();
        setTimeout(() => window.location.reload(), 2000);

      }
    } catch (error) {
      if(error.response && error.response.status){
              if(error.response.status === 503){
                failedNotify();
              } else if(error.response.status === 500){
                toast.error("Failed to apply")
              } else{
                toast.error("Something went wrong. try latter");
              }
      
              console.log(error.message);
            }
          }
  }

  useEffect (() => {
    getJobDetails();
  }, [])


  return (
    <>
      <Header />
      <div className='w-full bg-gray-200 px-2 md:px-4 lg:px-16 py-4 md:py-2 items-start justify-start'>

        {/* For Desktop */}
        <form onSubmit={updateJob} className='hidden min-h-screen sm:flex flex-col px-4 gap-4 py-2 rounded-lg bg-white items-center justify-start'>
          <h1 className='text-center text-2xl text-[rgb(2,6,111)] pb-2'>Update a Job</h1>

          <div className='w-full flex flex-col gap-3 items-start'>

          {/* First Row */}
          <div className='flex gap-14 w-full items-center justify-center'>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Job Title:</h1>
              <input value={title} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setTitle(e.target.value)} type='text' required />
            </div>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Job Salary:</h1>
              <input value={salary} className='w-full rounded-md h-8 px-2 border border-black' onChange={(e) => setSalary(e.target.value)} type='number' required />
            </div>

          </div>

          {/* Second Row */}
          <div className='flex gap-14 w-full justify-start'>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Job Type:</h1>
              <select onChange={(e) => setType(e.target.value)} value={type} className='w-full rounded-md h-8 px-2 border border-black'>
                <option>Select Type</option>
                <option>Part Time</option>
                <option>Full Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div className='flex flex-col w-2/4 gap-1'>
              <h1 className='font-medium'>Tags</h1>
              <input value={tags} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setTags(e.target.value)} type='text' required />
            </div>

          </div>

          {/* Third Row */}

          <div className='flex gap-14 w-full justify-start'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job Deadline</h1>
              <input value={deadline} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setDeadline(e.target.value)} type='date' required />
            </div>

          </div>
          
          
          {/* Fourth Row */}

          <div className='flex gap-14 w-full justify-start'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job Description</h1>
              <textarea value={description} rows={6} className='rounded-md p-2 border border-black' onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

          </div>




          </div>
          

         

          <div className='flex gap-6'>

          <button type='submit' className='w-24 h-10 text-white bg-[rgb(2,6,111)] cursor-pointer rounded-md'>Update</button>
          <button onClick={() => navigate(`/employee-jobs`)} className='w-24 h-10 border cursor-pointer text-[rgb(2,6,111)] border-[rgb(2,6,111)] rounded-md'>Back</button>

          </div>          
        </form>
        
        
        
        {/* For Mobile */}
        <form onSubmit={updateJob} className='flex sm:hidden flex-col px-2 gap-4 py-2 rounded-lg bg-white items-center justify-center'>
          <h1 className='text-center text-xl text-[rgb(2,6,111)] pb-2'>Update a Job</h1>

          {/* First Row */}
          <div className='flex flex-col gap-2 w-full items-center justify-center'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job Title:</h1>
              <input value={title} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setTitle(e.target.value)} type='text' required />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job Salary:</h1>
              <input value={salary} className='w-full rounded-md h-8 px-2 border border-black' onChange={(e) => setSalary(e.target.value)} type='number' required />
            </div>

          </div>

          {/* Second Row */}
          <div className='flex flex-col gap-2 w-full items-center justify-center'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job Type:</h1>
              <select onChange={(e) => {setType(e.target.value)}} value={type} className='w-full rounded-md h-8 px-2 border border-black'>
                <option>Select Type</option>
                <option>Part Time</option>
                <option>Full Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Tags:</h1>
              <input value={tags} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setTags(e.target.value)} type='text' required />
            </div>

          </div>
          
          {/* Second Row */}
          <div className='flex flex-col gap-2 w-full items-center justify-center'>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job DeadLine:</h1>
                <input value={deadline} className='w-full rounded-md h-8 p-2 border border-black' onChange={(e) => setDeadline(e.target.value)} type='date' required />

            </div>

            <div className='flex flex-col w-full gap-1'>
              <h1 className='font-medium'>Job Description:</h1>
              <textarea value={description} rows={6} className='w-full rounded-md h-full border p-2 border-black' onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

          </div>


          <div className='flex gap-4'>
          <button type='submit' className='w-24 h-10 bg-[rgb(2,6,111)] cursor-pointer text-white rounded-md'>Update</button>
          <button onClick={() => navigate(`/employee-jobs`)} className='w-24 h-10 border cursor-pointer text-[rgb(2,6,111)] border-[rgb(2,6,111)] rounded-md'>Back</button>
          </div>
          
        </form>

      </div>
      <ToastContainer />
      
    </>
  )
}

export default UpdateJobs