import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authslice"
import "./AdminLogin.css";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async  (e) => {
  e.preventDefault();
  setError("");
   try {
    const response = await fetch("http://localhost:5006/api/admin/login" , {
        method : "POST" ,
        headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
   
    if( !response.ok ) {
        throw new Error( data.message );
    }
    dispatch(login(data.user));
    alert(data.message);
    navigate("/admin-dashboard");
   }catch ( error ) {
    setError(error.message);
    alert(error.message);
   }
  }
  return (
    <div className="admin-login-container">
  <h2>Admin Login</h2>
  <form onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="admin-input"
    />
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="admin-input"
    />
    <button type="submit" className="admin-button">Login</button>
  </form>
</div>

  );
};

export default AdminLogin;