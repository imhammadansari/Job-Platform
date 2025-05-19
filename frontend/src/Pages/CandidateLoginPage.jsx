import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CandidateLoginPage = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const lognDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/candidate/candidateLogin', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                toast.success("Candidate LoggedIn Successfully");
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (error) {
            if (error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 402 || error.response?.status === 500) {
                toast.error("Email or Password incorrect");
            } else {
                toast.error("Something went wrong");
            }
            console.log(error.message);
        }
    }

    return (
        <>
                <Header />
            <div className='w-full h-screen flex'>
                {/* Left Side (Login Form) */}
                <div className='w-full lg:w-2/3 bg-white flex flex-col justify-start md:justify-center pt-10 md:pt-0 items-center'>
                    <h1 className='text-2xl pb-2 md:pb-4 lg:pb-8 text-center text-[rgb(2,6,111)]'>Candidate Login</h1>
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
                            <p>Don't have an account? <Link to='/candidate-signup' className='text-[rgb(2,6,111)]'>Signup</Link></p>
                            <button className='w-24 h-10 bg-[rgb(2,6,111)] text-white rounded-lg hover:bg-white hover:text-[rgb(2,6,111)] border border-[rgb(2,6,111)]'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side (Image) */}
                <div className='hidden lg:block w-1/3 h-full relative'>
                    <img
                        src='candidateLogin.jpg'
                        alt='Candidate Login'
                        className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/50 flex flex-col gap-1 items-center justify-center'>
                        <h1 className='text-white font-semibold px-4 text-2xl'>Ready to launch your career?</h1>
                        <h1 className='text-white px-4 text-center text-lg'>Your dream job is just a login away — start your journey now!</h1>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} />
        </>
    )
}

export default CandidateLoginPage;
