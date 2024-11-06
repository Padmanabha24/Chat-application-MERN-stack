const express=require('express')
const http=require("http")
const {Server}=require('socket.io')
const authRoutes=require('../app_routes/authRoutes')
const mongoose =require('mongoose')
const cors = require('cors');
const message=require("../models/Message");

const app=express();
const server=http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Your frontend URL
      methods: ['GET', 'POST']
    }
  });

app.use(cors());

app.use(express.json()); 

app.use("/", authRoutes);
 
mongoose.connect("mongodb://localhost:27017/chat-application")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });


app.get("/",(req,res)=>{     
    res.send("Server started")   
}) 

app.use("/",authRoutes);

app.get('/chatHistory', async (req, res) => {
    const { sender, receiver } = req.query;
  
    try {
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ]
      }).sort('timestamp');
  
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve chat history' });
    }
  });
   

// Listen for new socket.io connections  
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`); 

    socket.on('send_message', (data) => {
        // Broadcast the message to all connected clients
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


  server.listen(5000, () => {
    console.log('Server running on port 5000');
  });
