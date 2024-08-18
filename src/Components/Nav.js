import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import "../stylesheets/index.css";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/welcome?loggedOut=true'); 
  };

  return (
    <div className="header-menus">
      <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/chat-list">Group Chat</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/user-list">Manage Users</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/document-list">Manage Documents</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/welcome?loggedOut=true" onClick={handleLogout}>Logout</NavLink>
    </div>
  );
};

export default Nav;
