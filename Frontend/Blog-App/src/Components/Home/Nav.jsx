import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <nav className="bg-black text-white p-4 m-2 rounded-2xl">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="text-xl font-bold text-green-500 flex gap-2 items-center">
                        <FaBlog />
                        <Link to="/">BLOGIFY</Link>
                    </div>

                    {/* Menu Items */}
                    <ul className="hidden lg:flex space-x-6">
                        <li className="py-2 text-green-500 hover:text-white transition-colors duration-200 text-lg">
                            <Link to="/about">About</Link>
                        </li>
                        <li className="py-2 text-green-500 hover:text-white transition-colors duration-200 text-lg">
                            <Link to="/contact">Contact-US</Link>
                        </li>
                        {profile ? (
                            <li className="px-5 py-2 text-3xl text-green-500 hover:text-white transition-colors duration-200">
                                <Link to="/profile">
                                    <CgProfile />
                                </Link>
                            </li>
                        ) : (
                            <li
                                className="bg-green-500 text-white rounded-2xl px-5 py-2 hover:bg-green-600 transform transition-transform duration-300"
                                onClick={() => setDropdown((prev) => !prev)}
                            >
                                Register
                            </li>
                        )}
                    </ul>
                </div>

                {/* Mobile View */}
                <ul className="flex flex-col gap-4 mt-4 bg-black p-4 rounded-md shadow-lg lg:hidden">
                    <li className="py-2 text-green-500 hover:text-white transition-colors duration-200 text-lg">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="py-2 text-green-500 hover:text-white transition-colors duration-200 text-lg">
                        <Link to="/contact">Contact-US</Link>
                    </li>
                    {profile ? (
                        <li className="px-5 py-2 text-3xl text-green-500 hover:text-white transition-colors duration-200">
                            <Link to="/profile">
                                <CgProfile />
                            </Link>
                        </li>
                    ) : (
                        <li
                            className="bg-green-500 text-white rounded-2xl px-5 py-2 hover:bg-green-600 transform transition-transform duration-300"
                            onClick={() => setDropdown((prev) => !prev)}
                        >
                            Register
                        </li>
                    )}
                </ul>

                {/* Dropdown */}
                {dropdown && <Dropdown closeDropdown={closeDropdown} />}
            </nav>
        </div>

    );
};

export default Navbar;