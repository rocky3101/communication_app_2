import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import '../stylesheets/index.css';
import useAuth from '../scripts/useAuth';

const ChatList = () => {
  useAuth();
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(storedMessages);

    const fetchUserData = () => {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
      setUsername(loggedInUser.fullName || 'Anonymous');
    };


    fetchUserData();

    window.addEventListener("storage", fetchUserData);

    return () => {
      window.removeEventListener("storage", fetchUserData);
    };

    
  }, []);

  const handleInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() === '') {
      alert('Cannot send an empty message!');
      return;
    }

    const newMessage = {
      id: Number(new Date()),
      username: username,
      text: chatInput,
      time: new Date().toLocaleString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    setChatInput('');
  };

  const handleRefresh = () => {
    setMessages(JSON.parse(localStorage.getItem('chatMessages')) || []);
  };

  return (
    <>
      <Nav />
      <div className="container chatlist-container">
        <h3>Group Chat</h3>
        <div id="chatWindow" className="chat-window">
          {messages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <span className="chat-time">[{msg.time}]</span>
              <span className="chat-username">{msg.username}</span>: {msg.text}
            </div>
          ))}
        </div>
        <form id="chatForm" className="chat-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="username">
              <span className="input-group-text" id="loggedInUser">{username}</span>
            </div>
            <input
              type="text"
              id="chatInput"
              className="form-control"
              placeholder="Type a message..."
              value={chatInput}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary msg-send">Send</button>
            <button type="button" className="btn btn-primary msg-send" onClick={handleRefresh}>Refresh</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatList;
