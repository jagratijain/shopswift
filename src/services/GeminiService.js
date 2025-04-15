import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vite's environment variable format to access the API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getFashionAdvice = async (userQuery) => {
  try {
    // Initialize the Generative AI client with the API key
    const genAI = new GoogleGenerativeAI(apiKey);

    // Get the generative model (Gemini Pro)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

    // System prompt for the AI model
    const systemPrompt = "You are a helpful fashion advisor for ShopSwift clothing store. " +
      "Provide concise, practical advice about outfits, styles, and fashion trends. " +
      "Focus on suggesting product categories we might sell like shirts, dresses, pants, " +
      "accessories, etc. Keep responses helpful, positive, and under 150 words. " +
      "Don't mention specific brands.";

    // Combine system prompt with user query
    const fullPrompt = `${systemPrompt}\n\nCustomer question: ${userQuery}`;

    // Generate content using the model
    const result = await model.generateContent(fullPrompt);

    // Assuming the result is an object containing a 'response' with 'text'
    // You might need to check the response structure depending on Gemini API's format
    return result.response ? result.response.text : "No response from AI.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get fashion advice");
  }
};
