import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditAdmin.css"
const EditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5006/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert("User updated successfully!");
      navigate("/admin-dashboard"); 
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-container">
    <h2 className="edit-user-title">Edit User</h2>
  
    {loading && <p className="edit-user-loading">Loading...</p>}
    {error && <p className="edit-user-error">{error}</p>}
  
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <label className="edit-user-label">
        Name:
        <input 
          type="text" 
          name="name" 
          value={user.name} 
          onChange={handleChange} 
          className="edit-user-input"
        />
      </label>
  
      <label className="edit-user-label">
        Email:
        <input 
          type="email" 
          name="email" 
          value={user.email} 
          onChange={handleChange} 
          className="edit-user-input"
        />
      </label>
  
      <label className="edit-user-label">
        Role:
        <select 
          name="role" 
          value={user.role} 
          onChange={handleChange} 
          className="edit-user-select"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>
  
      <button type="submit" className="edit-user-button">Update User</button>
    </form>
  </div>
  
  );
};

export default EditAdmin;
