import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AdminLoginPage = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const lognDetails = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://job-platform.up.railway.app/admin/adminLogin', {
            email: email,
            password: password
        });

        if(response.status === 200){
            toast.success("Admin LoggedIn Successfully!");
            setTimeout(() => navigate('/view-admin-jobs'), 2000);
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
    <div className='w-full bg-gray-200 flex flex-col items-center h-screen justify-start'>
      <Header />
        <div className='w-full sm:w-1/2 md:w-2/4 lg:w-2/6 rounded-md bg-white py-6 flex flex-col justify-center items-center'>
        <h1 className='text-2xl pb-2 text-center text-[rgb(2,6,111)]'>Admin Login</h1>
        <form className='flex flex-col' onSubmit={lognDetails}>
            <h1>Email:</h1>
            <input className='border-black border rounded-sm px-1 w-[20rem] h-8 text-black py-1' type='email' required value={email} onChange={(e) => setemail(e.target.value)} />
            <h1 className='pt-4'>Password:</h1>
            <input className='border-black border rounded-sm px-1 w-[20rem] h-8 text-black py-1' type='password' value={password} onChange={(e) => setpassword(e.target.value)} />

            <div className='flex flex-col gap-2 items-center justify-center mt-3'>
                {/* <p>Don't have an account? <Link to='/candidate-signup' className='text-[rgb(2,6,111)]'>Signup</Link></p> */}
            <button className='w-24 h-10 bg-[rgb(2,6,111)] text-white hover:bg-white hover:text-[rgb(2,6,111)] cursor-pointer rounded-lg'>Login</button>
            </div>
       
       
        </form>


        </div>

    </div>
    <ToastContainer position="top-center" autoClose={3000} />
    
    </>
  )
}

export default AdminLoginPage