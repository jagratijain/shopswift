import React, { useState } from "react";
import { getFashionAdvice } from "@/services/GeminiService";



const FashionAdvisor = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Common fashion queries for quick selection
    const suggestedQueries = [
      "What should I wear to a wedding?",
      "Outfit ideas for a job interview",
      "Casual Friday outfit suggestions",
      "What colors are trending this season?",
      "How to style a basic white shirt?"
    ];
  
    // Remove this function since you're using the imported getFashionAdvice instead
    // const askFashionAI = async (prompt) => { ... };
  
    const handleSuggestedQuery = (suggestedQuery) => {
      setQuery(suggestedQuery);
      handleSubmit({ preventDefault: () => {} }, suggestedQuery);
    };
  
    const handleSubmit = async (e, customQuery = null) => {
      e.preventDefault();
      const queryToUse = customQuery || query;
      
      if (queryToUse.trim()) {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await getFashionAdvice(queryToUse);
          setResponse(response);
        } catch (err) {
          setError("Sorry, I couldn't process your request. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Fashion AI Advisor</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Ask me anything about outfits, styles, or fashion advice for any occasion!
      </p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((suggestedQuery, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuery(suggestedQuery)}
              className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full hover:bg-purple-200 transition"
            >
              {suggestedQuery}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about outfit ideas, styles, or fashion tips..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition disabled:bg-purple-300"
          >
            {isLoading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {response && (
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-900 mb-2">Fashion Advice:</h3>
          <p className="text-gray-700 whitespace-pre-line">{response}</p>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        Powered by Google Gemini AI
      </div>
    </div>
  );
};

export default FashionAdvisor;