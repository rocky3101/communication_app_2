import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import '../stylesheets/index.css';
import useAuth from "../scripts/useAuth";

const LoginSuccess = () => {
  useAuth();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};

    const user = storedUsers.find((user) => user.email === loggedInUser.email);

    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  return (
    <div>
      <Nav />
      <div className="container">
        <h2>Login Successful</h2>
        <p>
          <b>Welcome!</b> <span id="user-info">{userEmail}</span>
        </p>
      </div>
    </div>
  );
};

export default LoginSuccess;
