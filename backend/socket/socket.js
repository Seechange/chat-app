import { Server } from "socket.io";
import http from 'http'
import express from "express"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const userSocketMap = {}
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}
// khi có kêt nối từ client
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    //lấy userId từ query bên client
    const userId = socket.handshake.query.userId
    //map : {userId:socketId}
    if(userId != 'underfined') userSocketMap[userId] = socket.id
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))

    });
})


export { app, io, server }