import { Server, Socket } from 'socket.io';
import http from 'http';

const PORT = 4000;  // The port the WebSocket server will listen on

// Create an HTTP server
const httpServer = http.createServer();

// Initialize socket.io with the HTTP server
const io = new Server(httpServer, {
  cors: {
    // origin: ["http://localhost:3000", "https://your-production-domain.com"],
    // methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
    origin: "*"
  }
});

interface User {
  id: string;
  name: string;
  socketID: string;
}

let users: User[] = [];

// Handle WebSocket connections
io.on('connection', (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('user-session', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    console.log(users);
    //Sends the list of users to the client
    io.emit('user-active', users);
  });

  // Event listener for 'load' event
  socket.on('load', (user: User) => {
    console.log(user);
  });

  // Event listener for 'message' event
  socket.on('message', (text: string) => {
    console.log(text);
  });

  // Event listener for 'disconnect' event
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

// Start the WebSocket server on the specified port
httpServer.listen(PORT, () => {
  console.log(`WebSocket server listening on ${PORT}`);
});
