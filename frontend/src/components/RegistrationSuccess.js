import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationSuccess.css";

const RegistrationSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigate]);

    return (
        <div className="success-container">
            <div className="success-icon">
                <div className="circle">
                    <div className="check"></div>
                </div>
            </div>
            <h2>Registration Successful!</h2>
            <p>You will be redirected to the Login page shortly...</p>
            <div className="dots-animation">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
