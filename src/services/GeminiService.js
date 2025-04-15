export const getFashionAdvice = async (userQuery) => {
  try {
    // Use Vite's environment variable format to access the API key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // API endpoint for Gemini
    const endpoint = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent";
    
    // System prompt for the AI model
    const systemPrompt = "You are a helpful fashion advisor for ShopSwift clothing store. " +
      "Provide concise, practical advice about outfits, styles, and fashion trends. " +
      "Focus on suggesting product categories we might sell like shirts, dresses, pants, " +
      "accessories, etc. Keep responses helpful, positive, and under 150 words. " +
      "Don't mention specific brands.";
    
    // Combine system prompt with user query
    const fullPrompt = `${systemPrompt}\n\nCustomer question: ${userQuery}`;
    
    // Prepare request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };
    
    // Make the API call using fetch
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    // Check if response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }
    
    // Parse response
    const data = await response.json();
    
    // Extract text from response based on Gemini API structure
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get fashion advice");
  }
};