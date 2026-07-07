import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { indexProducts } from "./scripts/indexProducts.js";
import { tableExists } from "./services/lanceService.js";

import homeRoutes from "./routes/homeRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

await connectDB();

const exists = await tableExists();

if (!exists) {
  console.log("LanceDB table not found. Indexing products...");
  await indexProducts();
} else {
  console.log("LanceDB already indexed. Skipping indexing.");
}

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", homeRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});