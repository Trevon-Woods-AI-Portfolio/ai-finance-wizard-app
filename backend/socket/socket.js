import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    },
});

export const getRecipientSocketID = (recipientID) => {
    return userSocketMap[recipientID];
};

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("user connnected", socket.id);
    const userID = socket.handshake.query.userID;

    if (userID != "undefined") {
        userSocketMap[userID] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userID];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { server, app };