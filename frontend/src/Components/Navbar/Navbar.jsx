import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <h2 className='my-logo'>my app</h2>
            <ul className='navbar-links'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>

        </div>
    )
}

export default Navbar;