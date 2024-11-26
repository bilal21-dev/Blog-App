import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Dropdown = ({closeDropdown}) => {
    return (
        <div className='flex flex-col dropdown'>
            <ul className='flex flex-col gap-4 text-black'>
                <li >
                    <Link to='/login' className='hover:text-green-400 flex align-middle justify-center hover:scale-105 transform transition-transform duration-300' onClick={closeDropdown}>
                        Login
                    </Link>
                </li>
                <li >
                    <Link to='/signup' className='hover:text-green-400 flex align-middle justify-center hover:scale-105 transform transition-transform duration-300' onClick={closeDropdown}>
                        SignUp
                    </Link>
                </li>
                
            </ul>
        </div>
    )
}

export default Dropdown
