import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import Product from "../models/product.js";

const { createEmbedding } = await import("../services/embeddingService.js");
const { addProducts } = await import("../services/lanceService.js");

async function indexProducts() {
  await connectDB();

  const products = await Product.find();

  const data = [];

  for (const product of products) {
    const text = `
      ${product.name}
      ${product.brand}
      ${product.category}
      ₹${product.price}
      ${product.description}
    `;

    const vector = await createEmbedding(text);

    data.push({
      id: product._id.toString(),
      text,
      vector,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      description: product.description,
    });

    console.log(`Embedded: ${product.name}`);
  }

  await addProducts(data);

  console.log("✅ All MongoDB products indexed into LanceDB!");
}

export { indexProducts };

