import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authslice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { persistor } from"../../redux/store.js"
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user; 
  const isAdmin = user?.role === "admin"; 

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Info
      </Link>

      {isAuthenticated ? (
        <>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>

          {isAdmin && (
            <>
              <Link to="/admin-dashboard" className="nav-link">
                Admin Dashboard
              </Link>
              <Link to="/admin-create-user" className="nav-link">
                Create
              </Link>
            </>
          )}

          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link
            to="/admin-login"
            className="nav-link admin-icon"
            onClick={() => console.log("Navigating to admin login")}
          >
            <FaUserShield size={20} />
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
