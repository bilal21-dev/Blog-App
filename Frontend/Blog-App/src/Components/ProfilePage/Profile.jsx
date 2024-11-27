import React from 'react';
import { FaRegFaceAngry } from "react-icons/fa6";
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    user = user.name.charAt(0).toUpperCase() + user.name.slice(1)
    const { setProfile, setRegister } = useAuth();
    const navigate = useNavigate();

    const handleChange = () => {
        localStorage.clear();
        setProfile(false);
        setRegister(false);
        navigate("/home");


    }
    return (
        <div className="bg-white min-h-screen">
            {/* Outer container */}
            <div className="flex flex-col gap-4 md:flex-row outer px-3 py-2 ">
                <div className="bg-slate-100 md:w-1/4 w-full p-4 min-h-screen rounded-md shadow-lg shadow-black flex flex-col">
                    <div className='flex align-middle text-center items-center justify-center text-[200px]'>
                        <FaRegFaceAngry />
                    </div>
                    <h1 className='text-4xl mt-6 text-center font-medium'>{user}</h1>
                    <button className='bg-red-600 text-white px-5 py-2 text-lg rounded-md justify-center align-middle items-center mt-4 hover:bg-red-800 hover: transition-colors duration-300' onClick={handleChange}>Logout</button>
                </div>
                <div className="bg-slate-100 md:w-3/4 w-full p-4 rounded-md shadow-lg shadow-black">
                    <p>2nd Div: 3/4 width</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
