import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='left'>
                <nav>
                    <ul>
                        <NavLink to='/' className="link"><a href="/home">Home</a></NavLink>
                        <NavLink to='/code' className="link"><a href="/code">Code</a></NavLink>
                        <NavLink to='/share' className="link"><a href="/services">Share</a></NavLink>
                        <NavLink to="/About" className="link"><a href="/contact" >About us</a></NavLink>
                    </ul>
                </nav>
            </div>
            <div className="right">
                <button className='login'>Login</button>
                <button className='signup'>Sign Up</button>
            </div>
        </div>
    );
}

export default Navbar;
