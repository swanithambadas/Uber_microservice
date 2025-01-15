import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/Register.css"; // Import the updated CSS file

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Combine first name and last name into full name
      const fullName = `${firstName} ${lastName}`.trim();
      await registerUser({ name: fullName, email, password, role });
      navigate("/registration-success"); // Redirect to registration success page
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message); // Log the error
      setError(err.response?.data?.error || "Failed to register");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled selected>
            Role
          </option>
          <option value="rider">Rider</option>
          <option value="driver">Driver</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {/* Link to go back to login */}
      <div className="link-container">
        <p>
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Uber Microservice. All Rights Reserved.</p>
        <p>
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms-of-service" className="footer-link">
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Register;
