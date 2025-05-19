import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAllCandidates = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);


    axios.defaults.withCredentials = true;

    const allCandidates = async() => {
        try {
            const response = await axios.get('https://job-platform.up.railway.app/candidate/viewAllCandidate');
            setUsers(response.data);
        } catch (error) {
            
        }
    }


    const deleteUser = async(id) => {
         try {
            toast.dismiss();
            const response = await axios.post(`https://job-platform.up.railway.app/candidate/deleteCandidates/${id}`);
            if(response.status === 200){
                toast.success(`Candidate with id ${id} has been deleted`);
                setTimeout(() => navigate('/view-admin-jobs'), 2000);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    
    const updateStatus = async(userId, userStatus) => {
        try {
                toast.dismiss();

            const newStatus = userStatus === 'Blocked' ? 'UnBlock' : 'Blocked';
            const response = await axios.post(`https://job-platform.up.railway.app/candidate/updateStatus/${userId}`, {
                id: userId,
                status: newStatus
            })
            if(response.status === 200){
                toast.success("Status Updated Successfully");
                setTimeout(() => allCandidates(), 2000);
            }
        } catch (error) {
            console.log(error.message);
            
        }
    }

    const navigatebutton = () => {
        navigate(`/view-admin-jobs`)
    }

    useEffect(() => {
        allCandidates();
    }, []);

    return (
        <>
            <Header />

            <div className='w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4 bg-gray-200 flex flex-col items-center justify-center'>
                {users.length > 0 ? (
                    <div className='w-full px-2 sm:px-3 md:px-4 lg:px-4 py-2 md:py-4 overflow-x-auto bg-white'>
 
                        <div className='min-w-[1000px]'>
                        <div className='grid grid-cols-3 text-center'>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Name</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Email</h1>
                            <h1 className='border-l font-medium border-b p-2 border-black'>Action</h1>
                        </div>

                        {users?.map((user, index) => {
                            return (
                                        <div key={index} className='grid grid-cols-3 text-center'>
                                    <h1 className='border-l border-b p-2 border-black'>{user.name}</h1>
                                    <h1 className='border-l border-b p-2 border-black'>{user.email}</h1>
                                    <div className='flex flex-col md:flex-row gap-2 md:gap-4 p-2 items-center justify-center border-b border-l'>
                                    <button onClick={() => deleteUser(user._id)} className='p-1 cursor-pointer w-24 md:w-20 h-8 rounded-md text-white bg-red-700'>Delete</button>
                                    {user.status === 'UnBlock' ? (
                                        <button onClick={() => updateStatus(user._id, user.status)} className='w-28 h-8 bg-red-600 rounded-md text-sm cursor-pointer'>Block a User</button>
                                    ) : (
                                        <button onClick={() => updateStatus(user._id, user.status)} className='w-28 h-8 bg-green-600 text-sm rounded-md cursor-pointer'>UnBlock a User</button>

                                    )}
                                    
                                    </div>
                                </div>
                            )
                        })}

                        <div className='flex items-center justify-center'>
                            <button onClick={navigatebutton} className='w-24 cursor-pointer h-10 items-center justify-center flex rounded-md text-white bg-[rgb(2,6,111)] my-2'>Back</button>

                        </div>
                    </div>
                    </div>

                ) : (
                    <p>No Candidates Found</p>
                )}

            </div>
           <ToastContainer 
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    style={{ 
        width: "90%", 
        maxWidth: "400px", 
        fontSize: "14px",
        zIndex: 9999 
    }}
/>
        </>
    )
}

export default ViewAllCandidates

