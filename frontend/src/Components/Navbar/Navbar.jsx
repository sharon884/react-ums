import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authslice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

const  Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }
  return (
    <nav className="navbar">
    <Link to="/" className="nav-link">Home</Link>
    {isAuthenticated ? (
      <>
        <Link to="/profile" className="nav-link">Profile</Link>
        <button onClick={handleLogout} className="nav-button">Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/signup" className="nav-link">Signup</Link>
      </>
    )}
  </nav>
  
  );
};

export default Navbar
