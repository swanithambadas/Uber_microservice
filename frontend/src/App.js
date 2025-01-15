import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RiderDashboard from "./components/RiderDashboard";
import RegistrationSuccess from "./components/RegistrationSuccess";
import "./App.css";

function App() {
    useEffect(() => {
        const fontLink = document.createElement("link");
        fontLink.href =
            "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);

        return () => {
            document.head.removeChild(fontLink);
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/signup" />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<RiderDashboard />} />
                    <Route path="/registration-success" element={<RegistrationSuccess />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
