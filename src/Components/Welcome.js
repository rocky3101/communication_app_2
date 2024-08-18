import React from "react";
import { Link, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheets/index.css";

const WelcomePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const logoutMessage = queryParams.get('loggedOut') === 'true';

  return (
    <div className="container welcome-page">
      <h2>Welcome to Users module</h2>
      <h3>Existing User</h3>
      <Link to='/Login'>Login</Link>
      <h3>New Users</h3>
      <Link to='/Register'>Register</Link>
      {logoutMessage && (
        <div className="mt-4">
          You have been logged out.
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
