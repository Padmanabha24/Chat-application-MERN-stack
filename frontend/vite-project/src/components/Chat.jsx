import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Point this to your backend server

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
//   const [userId] = useState(Math.random().toString(36).substring(2, 15));     // Unique user ID for this instance
  const [username, setUsername] = useState('');

  // Fetch the username when the component mounts
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Login');
        setUsername(response.data.username);
        console.log(username) 
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { message, sender: username }); // Send message with username
      setMessages((prevMessages) => [...prevMessages]); // Add to messages with username
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <p>Username: {username}</p>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === username ? 'sent' : 'received'}>
            <strong>{msg.sender}</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
