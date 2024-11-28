import React, { useEffect } from 'react';
import { FaRegFaceAngry } from "react-icons/fa6";
import { useAuth } from '../AuthContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaRegHeart, FaRegComment, FaShareSquare } from "react-icons/fa";
import axios from 'axios';

const Profile = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    user = user.name.charAt(0).toUpperCase() + user.name.slice(1)
    const { setProfile, setRegister, myblogs, setMyblogs } = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    const handleChange = () => {
        localStorage.clear();
        setProfile(false);
        setRegister(false);
        navigate("/home");
    }
    useEffect(() => {
        fetchMyBlogs();
    }, [])
    const fetchMyBlogs = async () => {
        // try {
        const response = await axios.get(`http://localhost:5000/profile/${params.id}`);
        setMyblogs(response.data);
        // setLoading(false);
        // } catch (err) {
        // setError(err.message || "Failed to fetch blogs");
        // setLoading(false);
        // }
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myblogs.map((blog, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md shadow-black overflow-hidden border border-gray-200"
                            >
                                {/* Caption Section */}
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
                                </div>

                                {/* Image Section */}
                                {blog.image ? (
                                    <img
                                        src={`http://localhost:5000/${blog.image}`}
                                        alt={blog.title}
                                        className="w-full h-64 object-cover"
                                    />
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/400x250"
                                        alt="Placeholder"
                                        className="w-full h-64 object-cover"
                                    />
                                )}

                                {/* Action Row */}
                                <div className="p-6 flex justify-around items-center border-t">
                                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                                        <FaRegHeart />
                                        <span>Like</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                                        <FaRegComment />
                                        <span>Comment</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-gray-600 hover:text-purple-500">
                                        <FaShareSquare />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
