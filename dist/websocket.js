"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const PORT = 4000; // The port the WebSocket server will listen on
// Create an HTTP server
const httpServer = http_1.default.createServer();
// Initialize socket.io with the HTTP server
const io = new socket_io_1.Server(httpServer, {
    cors: {
        // origin: ["http://localhost:3000", "https://your-production-domain.com"],
        // methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true
        origin: "*"
    }
});
let users = [];
// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('user-session', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        console.log(users);
        //Sends the list of users to the client
        io.emit('user-active', users);
    });
    // Event listener for 'load' event
    socket.on('load', (user) => {
        console.log(user);
    });
    // Event listener for 'message' event
    socket.on('message', (text) => {
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
//# sourceMappingURL=websocket.js.map