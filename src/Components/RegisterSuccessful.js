import React from "react";
import { Link } from 'react-router-dom';
import useAuth from "../scripts/useAuth";

const RegisterSuccessful = () => {
  useAuth();
  return (
    <div className="container register-success-container">
      <h2>Registration Successful</h2>
      <p>Thank you for your registration</p>
      <Link to="/Welcome">Click to return to home page</Link>
    </div>
  );
};

export default RegisterSuccessful;
