import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import { server, app } from "./socket/socket.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5656;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/api/user", userRoutes)
// app.use("/api/result", resultsRoutes)




server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});