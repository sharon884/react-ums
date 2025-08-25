"use client"
import { useNavigate } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-number">404</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-description">Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <div className="notfound-buttons">
          <button className="notfound-btn primary" onClick={handleGoHome}>
            Go Home
          </button>
          <button className="notfound-btn secondary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
