import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
// Socket.io
import http from 'http';
import { Server } from 'socket.io';
import SocketSetup from './middlewares/socket.middleware.js';

app.use(cors({
    origion: process.env.CORS_ORIGION,
    credentials: true
}));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.set('socketio', io);

SocketSetup(io);

            // Import Routes
import userRouter from './routes/user.route.js'
import contactRouter from './routes/contact.route.js'
import chatRouter from './routes/chat.route.js'
import messageRouter from './routes/message.route.js'

app.use("/api/v2/user", userRouter)
app.use("/api/v2/contact", contactRouter)
app.use("/api/v2/chat", chatRouter)
app.use("/api/v2/message", messageRouter)
// app.use("/api/v2/group", groupRouter)
// app.use("/api/v2/user-message", usermessageRouter)
// app.use("/api/v2/group-message", groupMessageRouter)



export { app }