import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeeLoginPage = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const lognDetails = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/employee/employeeLogin', {
                email: email,
                password: password
            });

            if(response.status === 200){
                toast.success("Employee LoggedIn Successfully");
                setTimeout(() => navigate('/employee-jobs'), 1500);
            }
        } catch (error) {
            if (error.response && error.response.status) {
                        if (error.response.status === 400 || error.response.status === 401 || error.response.status === 402) {
                            toast.error("Email or Password incorrect"); 
                        } else {
                            toast.error("Something went wrong");
                        }
                    } else {
                        toast.error("Network Error");
                    }
            
                    console.log(error.message);
                }


    }
  return (
    <>
                <Header />
            <div className='w-full h-screen flex'>

                {/* Right Side (Image) */}
                <div className='hidden lg:block w-1/3 h-full relative'>
                    <img
                        src='employeeLogin.jpg'
                        alt='Candidate Login'
                        className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/50 flex flex-col gap-1 items-center justify-center'>
                        <h1 className='text-white font-semibold px-4 text-2xl'>Looking to hire top talent?</h1>
                        <h1 className='text-white px-4 text-center text-lg'>Connect with the minds that move your mission forward.</h1>
                    </div>
                </div> 
                {/* Left Side (Login Form) */}
                <div className='w-full lg:w-2/3 bg-white flex flex-col justify-start md:justify-center pt-10 md:pt-0 items-center'>
                    <h1 className='text-2xl pb-2 md:pb-4 lg:pb-8 text-center text-[rgb(2,6,111)]'>Employee Login</h1>
                    <form className='flex flex-col' onSubmit={lognDetails}>
                        <label>Email:</label>
                        <input
                            className='border-b border-black px-2 w-[20rem] h-8 text-black py-1'
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <label className='pt-4'>Password:</label>
                        <input
                            className='border-b border-black px-2 w-[20rem] h-8 text-black py-1'
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <div className='flex flex-col gap-2 items-center justify-center mt-4'>
                            <p>Don't have an account? <Link to='/employee-signup' className='text-[rgb(2,6,111)]'>Signup</Link></p>
                            <button className='w-24 h-10 bg-[rgb(2,6,111)] text-white rounded-lg hover:bg-white hover:text-[rgb(2,6,111)] border border-[rgb(2,6,111)]'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>

            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </>
  )
}

export default EmployeeLoginPage