import React from 'react'

const Home = () => {
  return (
    <div className="home-container">
    <h1 className="home-title">Welcome to User Management System</h1>
    <p className="home-description">
      A secure and scalable authentication system powered by JWT and Redux.
      Manage users, update profiles, and experience smooth state management.
    </p>
    <ul className="home-features">
      <li>🔹 Secure authentication with JWT</li>
      <li>🔹 Redux for global state management</li>
      <li>🔹 User & Admin role management</li>
      <li>🔹 Profile updates and image uploads</li>
      <li>🔹 Admin dashboard for user control</li>
    </ul>
  </div>
  )
}

export default Home;
