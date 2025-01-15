import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await loginUser({ email, password }); // Call the API
      // Check if the response contains the token
      if (response && response.token) {
        localStorage.setItem("token", response.token); // Save token
        console.log("Login Successful");
        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        // Throw an error if the response structure is invalid
        throw new Error("Invalid response from the server");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.error || err.message); // Log the error
      setError("Failed to login");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Add links for Sign Up and Forgot Password */}
      <div className="link-container">
        <Link to="/signup">SignUp</Link>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Uber Microservice. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a> |{" "}
          <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
