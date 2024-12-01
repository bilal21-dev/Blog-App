
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBlog } from "react-icons/fa6";
import Dropdown from './Dropdown';
import { useAuth } from '../AuthContext';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const { profile } = useAuth();
    let user = localStorage.getItem("user");
    user = JSON.parse(user)

    const closeDropdown = () => {
        setDropdown(true);
    };

    return (
        <div className="bg-gradient-to-r from-green-400 to-yellow-300 m-0 pt-2 ">
            <nav className="bg-black text-green-500 p-4 rounded-2xl mx-4 z-[999]">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    {/* Logo Section */}
                    <div className="text-xl font-bold text-yellow-400 flex gap-2 items-center justify-center lg:justify-start">
                        <FaBlog />
                        <Link to="/">BLOGIFY</Link>
                    </div>

                    {/* Menu Items */}
                    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-center">
                        <li className="py-1 md:py-2 text-yellow-400 hover:text-green-400 transition-colors duration-200 font-medium">
                            <NavLink to="/home" className={(e) => (e.isActive ? "text-green-400" : "")}>
                                Home
                            </NavLink>
                        </li>
                        <li className="py-1 md:py-2 text-yellow-400 hover:text-green-400 transition-colors duration-200 font-medium">
                            <NavLink to="/about" className={(e) => (e.isActive ? "text-green-400" : "")}>About</NavLink>
                        </li>
                        <li className="py-1 md:py-2 text-yellow-400 hover:text-green-400 transition-colors duration-200 font-medium">
                            <NavLink to="/contact" className={(e) => (e.isActive ? "text-green-400" : "")}>Contact-US</NavLink>
                        </li>
                        {profile ? (
                            <li className="px-4 md:px-5 py-1 md:py-2 text-2xl md:text-3xl text-yellow-400 hover:text-green-400 transition-colors duration-200">
                                <Link to={`/profile/${user._id}`} className={(e) => (e.isActive ? "text-green-400" : "")}>
                                    <CgProfile />
                                </Link>
                            </li>
                        ) : (
                            <li
                                className="text-yellow-400 font-medium rounded-lg px-3 md:px-5 py-1 md:py-2 hover:bg-white hover:text-green-500 transition-colors duration-200 relative"
                                onClick={() => setDropdown((prev) => !prev)}
                            >
                                Register
                                {dropdown && <Dropdown closeDropdown={closeDropdown} />}
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
