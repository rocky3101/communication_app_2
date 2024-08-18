import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../stylesheets/index.css";
import useAuth from "../scripts/useAuth";

const EditUser = () => {
  useAuth();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const navigate = useNavigate();
  const userId = parseInt(searchParams.get("id"), 10);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    const userToEdit = storedUsers.find((user) => user.id === userId);
    
    if (userToEdit) {
      setUser(userToEdit);
    }
    setLoggedInUserEmail(loggedInUser.email);
  }, [userId]);

  const handleSave = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.id === userId ? { ...u, ...user } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // If the edited user is the logged-in user, update the loggedInUser data as well
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (loggedInUser.id === userId) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    navigate("/user-list");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container edit-form-container">
      <h3>Edit User Information</h3>
      <form className="edit-form" onSubmit={handleSave}>
        <div className="input-fields">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={user.fullName || ""}
            placeholder="Enter Fullname"
            onChange={handleChange}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="editEmail">Email</label>
          <input
            type="email"
            name="email"
            id="editEmail"
            value={user.email || ""}
            placeholder="Enter email"
            onChange={handleChange}
            disabled={user.email === loggedInUserEmail}
          />
        </div>
        <button className="edit-btn btn-primary btn" id="editUser" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUser;
