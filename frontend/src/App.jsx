import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Pages/Home/home.jsx"
import Login from './Pages/Login/Login.jsx';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';
import Signup from "./Pages/Signup/Signup.jsx" 
import { useEffect } from 'react';
import { setUser } from './redux/slices/authslice.js';
import { useDispatch } from 'react-redux';
import Upload from './Components/uploadImages/upload.jsx';
import Edit from './Components/EditProfile/Edit.jsx';
import AdminDashBoard from './Pages/AdminDashBoard/AdminDashBoard.jsx';
import AdminLogin from './Components/AdminLogin/AdminLogin.jsx';
import EditUser from './Components/EditAccessadmin/EditAdmin.jsx';
import Serchuser from './Components/serch/Serch-user.jsx';
import AdminProtectedRoute from './routes/AdminProtectedRoutes.jsx';
import AdminCreateUser from './Pages/createUser/AdminCreateUser.jsx';

function App() {

//  const dispatch = useDispatch();
//  useEffect (() => {

//   const fetchProfile = async () => {
//   try {
//     const response = await fetch("http://localhost:5006/api/users/profile" , {
//       method : "GET" ,
//       credentials : "include",
//     })
//     const data = await response.json();
    
//     if ( response.ok ) {
//       dispatch(setUser(data.user));
//     }
//   }catch ( error ) {
//     console.error("error fetching profile error!");
//   }
//   }
//   fetchProfile(); 
//  },[dispatch])

  return (
    <BrowserRouter>
     <Navbar/>
     <br />
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<ProtectedRoute/>}>
        <Route path="/profile" element={<Dashboard />} />
        <Route path='/upload-img' element={<Upload/>} />
        <Route path='/edit-profile' element={<Edit/>} />
        </Route>
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-dashboard' element={<AdminDashBoard/>} />
       
        <Route path='/edit-user/:id' element={<EditUser/>} />
        <Route path='/serch-user' element={<Serchuser/>} />
        <Route path='/admin-create-user' element={<AdminCreateUser/>} />
     
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
