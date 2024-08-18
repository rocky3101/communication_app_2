import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/index.css";
import Nav from "./Nav";
import useAuth from "../scripts/useAuth";

const UserList = () => {
  useAuth();
  const [users, setUsers] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    setUsers(storedUsers);
    setLoggedInUserEmail(loggedInUser.email);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-user?id=${id}`);
  };

  return (
    <>
      <Nav />
      <div className="container userlist-container">
        <h2 className="text-start">Users</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn user-action me-3"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit</button>
                  <button
                    className="btn user-action"
                    onClick={() => handleDelete(user.id)}
                    disabled={user.email === loggedInUserEmail}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
