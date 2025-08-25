import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login  } from "../../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
import "./Login.css"
const API = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [ email , setEmail ] = useState("");
  const [ password , setPassword ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated  } = useSelector((state) => state.auth);
  

  const handleLogin =  async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/users/login` , {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify( { email , password}),
        credentials: "include",
      });
      const data = await response.json();
     
      if ( response.ok) {
        dispatch(login(data.user));
        const profileResponse = await fetch(`${API}/users/profile` , {
          method : "GET" ,
          credentials : "include"
        });

        const profiledata = await profileResponse.json();
        if ( profileResponse.ok ) {
          dispatch(login(profiledata.user));
          navigate("/profile");
        } 

      

      }else {
        alert(data.message)
      }
    } catch (error) {
      console.log("Login error",error);
      alert("something went wrong try again!");
    }

  };
  
  return (
    <div className="login-container">
    <h2 className="login-title">User Login</h2>
    <form className="login-form" onSubmit={handleLogin}>
      <input
        type="email"
        className="login-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="login-input"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  </div>
  
  );
};

export default Login;
