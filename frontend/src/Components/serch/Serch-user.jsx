import React from "react";
import { useState, useEffect } from "react";
import "./searchUser.css"
const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (search.length === 0) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5006/api/admin/users?search=${search}`,{
            
            method : "GET",
            headers: {
                "Content-Type": "application/json",
              },
              credentials : "include"
          }
        );
        const data = await response.json();
        if (!response) {
          throw new Error(data.message || "Error fetching users!");
        }
        setUser(data.user);
        setError("");
      } catch (err) {
        setError(error.message);
        setUser([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search]);

  return (
    <div className="search-user-container">
  <input
    type="text"
    placeholder="Search users..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-user-input"
  />

  {loading && <p className="search-user-loading">Loading...</p>}
  {error && <p className="search-user-error">Error...</p>}

  {user?.length > 0 ? (
    <div className="search-user-list">
      {user.map((user) => (
        <p key={user._id} className="search-user-item">
          <span className="search-user-name">{user.name}</span>, 
          <span className="search-user-email">{user.email}</span>
        </p>
      ))}
    </div>
  ) : (
    <p className="search-user-notfound">No users found!</p>
  )}
</div>

  );
};

export default SearchUser;
