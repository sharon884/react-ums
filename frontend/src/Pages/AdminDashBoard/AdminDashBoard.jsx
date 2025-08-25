import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/slices/adminSlices";
import { useNavigate } from "react-router-dom";
import "./AdminDashBoard.css";
const API = import.meta.env.VITE_API_BASE_URL;

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      dispatch(fetchUsers({ currentPage, usersPerPage }));
    }
  }, [dispatch, user, navigate, currentPage]);

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you wnat to delete this user!")) return;
    try {
      const response = await fetch(
        `${API}/admin/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert(" user deleted successfully !");
      dispatch(fetchUsers({ currentPage, usersPerPage }));
    } catch (error) {
      console.log("error deleting user!");
      alert(data.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <button onClick={()=>navigate("/serch-user")}>serch user </button>
      <h2 className="admin-dashboard-title">Admin Dashboard - User List</h2>
      
      {loading && <p className="admin-loading">Loading users...</p>}
      {error && <p className="admin-error">{error}</p>}

      <table className="admin-user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="admin-edit-btn"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="admin-delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="pagination-button prev-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button next-button"
          onClick={handleNextPage}
          disabled={currentPage >= (totalPages || 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default AdminDashBoard;
