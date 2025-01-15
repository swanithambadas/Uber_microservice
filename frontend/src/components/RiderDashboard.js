import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RiderDashboard.css";
import defaultProfilePic from "../assets/default-profile.png"; // Import a default placeholder image

const Dashboard = () => {
  const navigate = useNavigate();
  const userProfilePic = localStorage.getItem("profilePic"); // Assume profile picture URL is stored in localStorage

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, Rider!</h1>
        <div className="dashboard-header-actions">
          <div
            className="profile-pic-container"
            onClick={() => navigate("/profile")} // Navigate to profile page on click
          >
            <img
              src={userProfilePic || defaultProfilePic} // Show uploaded picture or default
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="dashboard-main">
        {/* Left Section: Map */}
        <div className="dashboard-map">
          <h2>Book a Ride</h2>
          <div className="map-placeholder">
            <p>Map goes here (Google Maps or OpenStreetMap integration)</p>
          </div>
          <form className="ride-booking-form">
            <input type="text" placeholder="Pickup Location" required />
            <input type="text" placeholder="Drop-off Location" required />
            <button type="submit">Book Ride</button>
          </form>
        </div>

        {/* Right Section: Ride Status */}
        <div className="dashboard-ride-status">
          <h2>Current Ride Status</h2>
          <div className="ride-status-card">
            <p>No ride in progress</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <Link to="/help" className="footer-link">
          Help
        </Link>
        <span className="footer-separator">|</span>
        <Link to="/terms-of-service" className="footer-link">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
};

export default Dashboard;
