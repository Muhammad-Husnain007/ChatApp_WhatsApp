import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import Connection from './database/Connection.js';

// Import routes
import userRouter from './routes/user.route.js';
import contactRouter from './routes/contact.route.js';
import chatRouter from './routes/chat.route.js';
import messageRouter from './routes/message.route.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Set up routes
app.use("/api/v2/user", userRouter);
app.use("/api/v2/contact", contactRouter);
app.use("/api/v2/chat", chatRouter);
app.use("/api/v2/message", messageRouter);

// Root route
app.get('/', (req, res) => {
    res.send("Server is ready");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });

    socket.on("sendMessage", (message) => {
        io.emit('messageReceived', message); // Broadcast the message to all connected clients
    });

    socket.on("updateMessage", (updatedMessage) => {
        io.emit('messageUpdated', updatedMessage); // Broadcast the updated message
    });

    socket.on("deleteMessage", (messageId) => {
        io.emit('messageDeleted', messageId); // Broadcast the deleted message ID
    });
});

const port = process.env.PORT || 8000;

Connection().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(() => {
    console.log('Error in DB connect');
});

export { app, server };
