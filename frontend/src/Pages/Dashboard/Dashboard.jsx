import React from 'react'
import { useSelector } from 'react-redux';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_API_BASE_URL;
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if ( !user ) {
    return <p>....loading</p>
  }
  return (
    <div className="dashboard-container">
    <h2 className="dashboard-title">Profile</h2>
    
    <div className="dashboard-info">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      
      {user.profileImage && (
        <div className="profile-image-container">
          <img src={`${API}/${user.profileImage}`} alt="Profile" className="profile-image" />
        </div>
      )}
    </div>
    
    <div className="dashboard-buttons">
      <button onClick={() => navigate("/edit-profile")} className="dashboard-button">
        Edit Profile
      </button>
      <button onClick={() => navigate("/upload-img")} className="dashboard-button">
        Upload Image
      </button>
    </div>
  </div>
  
  )
}

export default Dashboard
