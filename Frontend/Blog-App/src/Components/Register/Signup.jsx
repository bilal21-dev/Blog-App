import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../AuthContext";


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setProfile, setRegister } = useAuth();
    const collectData = async (e) => {
        let user = localStorage.getItem("user");
        user = JSON.parse(user)
        e.preventDefault();
        let result = await axios.post('http://localhost:5000/signup', {
            name,
            email,
            password
        });
        result = result.data;
        if (result && result.result === "Enter Complete details") {
            alert("Enter Complete details")
        }
        else {
            localStorage.setItem("user", JSON.stringify(result));
            setRegister(true);
            localStorage.setItem("registry", true)
            setProfile(true)
            localStorage.setItem("profile", true)
            navigate(`/profile/${result._id}`);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white shadow-lg shadow-black rounded-lg p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-green-500 mb-6">Sign Up</h2>

                <form onSubmit={collectData}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter your username"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Confirm your password"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
