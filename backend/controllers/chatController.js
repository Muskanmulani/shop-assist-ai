import { getGeminiResponse } from "../services/geminiService.js";
import { createEmbedding } from "../services/embeddingService.js";
import { searchProducts } from "../services/lanceService.js";

export const getChat = async (req, res) => {
  try {
    const userMessage = req.body.message;
    const greetings = [
  "hi",
  "hello",
  "hey",
  "hii",
  "good morning",
  "good evening"
];

if (greetings.includes(userMessage.toLowerCase().trim())) {
  return res.json({
    success: true,
    reply:
      "👋 Hi! I'm ShopAssist AI. I can help you find laptops, smartphones, compare products, and recommend products based on your budget."
  });
}

    const queryVector = await createEmbedding(userMessage);

    const products = await searchProducts(queryVector);

const productContext = products.map((item) => ({
  name: item.name,
  brand: item.brand,
  category: item.category,
  price: item.price,
  rating: item.rating,
  stock: item.stock,
  description: item.description,
}));

    const prompt = `
You are ShopAssist AI, a shopping assistant.

User question:
${userMessage}

Relevant products:
${JSON.stringify(productContext)}

Answer the user using only the product information provided.
If the user asks about a product feature, use the description field.
If the information is not available, clearly say that it is not available.
Keep the answer helpful and conversational.
`;

    const aiReply = await getGeminiResponse(prompt);

    res.json({
      success: true,
      reply: aiReply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      reply: "Something went wrong.",
    });
  }
};