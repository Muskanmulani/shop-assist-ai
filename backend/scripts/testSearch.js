import dotenv from "dotenv";

dotenv.config();

const { createEmbedding } = await import("../services/embeddingService.js");
const { searchProducts } = await import("../services/lanceService.js");

const query = "best gaming laptop";

const vector = await createEmbedding(query);

const results = await searchProducts(vector);

console.log(
  results.map((item) => ({
    name: item.name,
    category: item.category,
    price: item.price,
  }))
);