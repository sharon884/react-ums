import React from "react";
import { useState } from "react"
import  {useDispatch } from "react-redux";
import { login,setUser } from "../../redux/slices/authslice.js";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
const API = import.meta.env.VITE_API_BASE_URL;
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch (`${API}/users/signup` , {
        method : "Post",
        headers : { "Content-Type": "application/json" },
        body :  JSON.stringify({ name, email, password ,role:"user" }),
        credentials : "include",
      });
      const data = await response.json();
      if ( response.ok ) {
        //  dispatch(setUser(data.user));
         dispatch(login(data.user));
         navigate("/profile");
      }else {
        alert(data.message);
      }
    } catch ( error ) {
      console.error( "signup error:".error)
      alert(error)
    }
  }
  return (
    <div className="signup-container">
  <h2 className="signup-title">Signup</h2>
  <form onSubmit={handleSignup} className="signup-form">
    <input
      type="text"
      onChange={(e) => setName(e.target.value)}
      value={name}
      placeholder="Enter your name"
      className="signup-input"
      required
    />
    <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      placeholder="Enter your email"
      className="signup-input"
      required
    />
    <input
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      placeholder="Enter your password"
      className="signup-input"
      required
    />
    <button type="submit" className="signup-button">Signup</button>
  </form>
</div>

  );
};

export default Signup;