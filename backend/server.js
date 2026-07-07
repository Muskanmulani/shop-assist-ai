import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

import homeRoutes from "./routes/homeRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

app.use("/", homeRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});