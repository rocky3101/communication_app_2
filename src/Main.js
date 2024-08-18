import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatList from './Components/ChatList';
import DocumentList from './Components/DocumentList';
import EditUser from './Components/EditUser';
import Login from './Components/Login';
import LoginSuccessful from './Components/LoginSuccessful';
import Register from './Components/Register';
import RegisterSuccessful from './Components/RegisterSuccessful';
import UserList from './Components/UserList';
import Welcome from './Components/Welcome';

function Main() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/chat-list" element={<ChatList />} />
          <Route path="/document-list" element={<DocumentList />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-successful" element={<LoginSuccessful />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-successful" element={<RegisterSuccessful />} />
          <Route path="/user-list" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
