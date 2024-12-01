// import React from 'react';
// import { FaLongArrowAltRight } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';


// const Intro = () => {
//     const navigate = useNavigate()
//     const handleChange = () => {
//         navigate("/home")
//     }
//     return (
//         <div className="relative h-screen">
//             <div className='flex flex-col'>
//                 <div className='md:w-1/4 w-full'>
//                     <img
//                         src="https://www.fhoke.com/wp-content/uploads/2023/08/10-Best-Blog-Designs.webp"
//                         className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
//                         alt="Background"
//                     />
//                 </div>
//                 <div className='bg-green-500'>
//                     kln
//                 </div>
//             </div>


//             <div className="absolute inset-0 flex items-center justify-center" >
//                 <button
//                     className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm sm:text-base md:text-lg lg:text-xl hover:scale-105 transform transition-transform duration-300" onClick={handleChange}>
//                     Get Started
//                     <FaLongArrowAltRight />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Intro;


import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const navigate = useNavigate();

    const handleChange = () => {
        navigate("/home");
    };
    const animation = {
        animation: 'text-shadow-drop-tl 0.6s both',
    }
    const animation2 = {
       animation: 'tracking-in-expand-fwd-bottom 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
    }

    return (
        <div className="relative h-screen flex flex-col gap-2 md:flex-row">
            {/* Image Section (3/4) */}
            <div className="md:w-3/4 w-full relative">
                <img
                    src="https://www.fhoke.com/wp-content/uploads/2023/08/10-Best-Blog-Designs.webp"
                    className="w-full h-full object-cover blur-sm"
                    alt="Background"
                />
            </div>

            {/* Green Box Section (1/4) */}
            <div className="min-h-screen md:w-2/4 w-full bg-gradient-to-r from-green-500 to-yellow-400 h-screen flex flex-col gap-5 items-center justify-center">
                <p className="text-white text-[40px] font-bold px-5" style={animation} >Create Your Blogs and share it with the World<FaGlobeAmericas /></p>
                <div className="">
                    <button
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm sm:text-base md:text-lg lg:text-xl hover:scale-105 transform transition-transform duration-300"
                        onClick={handleChange} style={animation2}
                    >
                        Get Started
                        <FaLongArrowAltRight />
                    </button>
                </div>
            </div>

            {/* Button Section */}

        </div>
    );
};

export default Intro;
