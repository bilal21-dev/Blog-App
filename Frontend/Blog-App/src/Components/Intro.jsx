import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Intro = () => {
    const navigate = useNavigate()
    const handleChange = () => {
        navigate("/home")
    }
    return (
        <div className="relative h-screen">
            <img
                src="https://www.fhoke.com/wp-content/uploads/2023/08/10-Best-Blog-Designs.webp"
                className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
                alt="Background"
            />
            <div className="absolute inset-0 flex items-center justify-center" >
                <button
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm sm:text-base md:text-lg lg:text-xl hover:scale-105 transform transition-transform duration-300" onClick={handleChange}>
                    Get Started
                    <FaLongArrowAltRight />
                </button>
            </div>
        </div>
    );
};

export default Intro;
