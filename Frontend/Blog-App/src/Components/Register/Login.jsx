import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setProfile, setRegister } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });
      console.log(response);
    
      
      // const userData = response.data;
      const { user, token } = response.data
      console.log("outside");
      if (user && user._id) {
        console.log("inside");
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem("token", token);
        setRegister(true);
        localStorage.setItem("registry", true);
        setProfile(true);
        localStorage.setItem("profile", true);
        navigate(`/profile/${user._id}`);
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert("Please enter both email and password");
            break;
          case 401:
            alert("Invalid email or password");
            break;
          case 404:
            alert("User not found");
            break;
          default:
            alert("Login failed. Please try again.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }

  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-200">
      <div className="bg-white shadow-sm shadow-black rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Login</h2>
        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
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
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-900 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-900 hover:underline">
              Forgot Password?
            </a>
          </div>


          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-950 transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to='/signup' className="text-blue-900 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
