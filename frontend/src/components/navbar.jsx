import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
const Navbar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        const id = uuidV4();
        navigate(`/editor/${id}`);
    };
    return (
        <div className='text-white'>
            <nav className="flex justify-between items-center px-10 py-4 bg-[#1E201E]">
                <div>
                    <h2 className="text-2xl font-bold">CompileX</h2>
                </div>
                <ul className="flex gap-x-5 list-style-none">
                    <li className="hover:text-blue-400">
                        <Link to="/">Home</Link>
                    </li>
                    <li onClick={handleClick} className="hover:text-blue-400">
                        <Link>Code</Link>
                    </li>
                    <li className="hover:text-blue-400">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="hover:text-blue-400">
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <ul className="flex gap-x-3">
                    <li className="p-2 rounded bg-green-600">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="p-2 rounded bg-blue-600">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar