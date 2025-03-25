import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slices/adminSlices";
import "./AdminCreateUser.css"
const AdminCreateUser = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(userData));
    alert("user added sucessfully!");
  };

  return (
    <div className="create-user-container">
    <h2 className="create-user-title">Create New User</h2>
    <form onSubmit={handleSubmit} className="create-user-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="create-user-input"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="create-user-input"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="create-user-input"
        onChange={handleChange}
        required
      />
      <select name="role" className="create-user-select" onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="create-user-button" disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
    {error && <p className="create-user-error">{error}</p>}
  </div>
  
  );
};

export default AdminCreateUser;
