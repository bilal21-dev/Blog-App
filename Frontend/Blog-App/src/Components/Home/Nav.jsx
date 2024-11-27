
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBlog } from "react-icons/fa6";
import Dropdown from './Dropdown';
import { useAuth } from '../AuthContext';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const { profile } = useAuth();

    const closeDropdown = () => {
        setDropdown(false);
    };

    return (
        <div>
            <nav className="bg-green-500 text-white p-4 m-2 rounded-2xl">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                    {/* Logo Section */}
                    <div className="text-xl font-bold text-white flex gap-2 items-center justify-center lg:justify-start">
                        <FaBlog />
                        <Link to="/">BLOGIFY</Link>
                    </div>

                    {/* Menu Items */}
                    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-6 items-center">
                        <li className="py-1 md:py-2 text-white hover:text-yellow-300 transition-colors duration-200 font-medium">
                            <NavLink to="/home" className={(e) => (e.isActive ? "text-yellow-300" : "")}>Home</NavLink>
                        </li>
                        <li className="py-1 md:py-2 text-white hover:text-yellow-300 transition-colors duration-200 font-medium">
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li className="py-1 md:py-2 text-white hover:text-yellow-300 transition-colors duration-200 font-medium">
                            <NavLink to="/contact">Contact-US</NavLink>
                        </li>
                        {profile ? (
                            <li className="px-4 md:px-5 py-1 md:py-2 text-2xl md:text-3xl text-white hover:text-yellow-300 transition-colors duration-200">
                                <Link to="/profile">
                                    <CgProfile />
                                </Link>
                            </li>
                        ) : (
                            <li
                                className="text-white font-medium rounded-lg px-3 md:px-5 py-1 md:py-2 hover:bg-white hover:text-green-500 transition-colors duration-200 relative"
                                onClick={() => setDropdown((prev) => !prev)}
                            >
                                Register
                               

                            </li>
                        )}
                    </ul>
                </div>
                {/* Dropdown */}
                {dropdown && <Dropdown closeDropdown={closeDropdown} />}
            </nav>
        </div>
    );
};

export default Navbar;
