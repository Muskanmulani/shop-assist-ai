import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import products from "../data/products.json" with { type: "json" };

dotenv.config();

await connectDB();

try {
  await Product.deleteMany();

  await Product.insertMany(products);

  console.log("✅ Products seeded successfully!");

  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}