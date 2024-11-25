import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBlog } from "react-icons/fa6";
import Dropdown from './Dropdown';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <nav className="bg-black text-white p-4">
            <div className="flex justify-between items-center align-middle">
                <div className="text-xl font-bold text-green-500 flex gap-2 align-middle ">
                    <FaBlog />
                    <Link to="/">BLOGIFY</Link>
                </div>
                <ul className="hidden lg:flex space-x-6">
                    <li className='py-2'>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link
                            to="/contact"

                        >
                            Contact-US
                        </Link>
                    </li>
                    <li className="bg-green-500 text-white rounded-md px-5 py-2 hover:bg-green-600 hover:transform transition-transform duration-300" onClick={() => setDropdown((prev) => !prev)}>
                        Register
                    </li>
                </ul>
            </div>
            {
                dropdown &&
                <Dropdown />
            }
        </nav>
    );
};

export default Navbar;
