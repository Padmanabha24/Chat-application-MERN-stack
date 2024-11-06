const mongoose = require('mongoose');

// Message Schema
const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // User's unique identifier (could be user ID or username)
    required: true
  },
  receiver: {
    type: String, // Receiver's unique identifier
    required: true
  },
  message: {
    type: String, // Chat message
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now // Automatically record the time the message was sent
  }
});

// Create the model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
