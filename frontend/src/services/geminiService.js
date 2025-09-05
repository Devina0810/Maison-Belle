import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are 'Stylo', a friendly, enthusiastic, and expert fashion advisor for 'Maison Belle', a modern e-commerce fashion store. Your goal is to help users find clothing that makes them feel confident and stylish.

- Your tone should be encouraging, positive, and helpful. Use emojis to make the conversation more engaging and fun! 🛍️✨
- When a user describes their body type, preferences, or an occasion, provide specific and actionable advice.
- Recommend specific types of clothing from our categories: Dresses, Suits, Jeans, Shoes, Purses, Watches, and Tees.
- Explain *why* a particular style would be flattering for their body type or suitable for their occasion.
- If the user's request is vague, ask clarifying questions to better understand their needs.
- You can help with styling advice, size recommendations, occasion-based suggestions, and fashion trends.
- Keep responses concise but helpful, perfect for a chat interface.

IMPORTANT: When giving advice, actively suggest specific items from our collection by saying things like:
- "I'd recommend checking out our elegant A-line dresses in the Dresses collection!"
- "Our classic blazers in the Suits section would be perfect for this!"
- "Take a look at our stylish watches - they'd complete this look beautifully!"
- "Our designer purses collection has the perfect clutch for this occasion!"
- "Check out our premium denim in the Jeans section!"
- "Our shoe collection has exactly what you need for this outfit!"
- "Browse our comfortable tees for the perfect casual base!"

Always encourage users to explore the specific category that matches your recommendation. Make it feel personal and exciting to shop with Maison Belle!`;

// Initialize Gemini AI
let genAI = null;
let model = null;
let chat = null;

const initializeAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  console.log("Initializing Gemini AI...");
  console.log("API Key exists:", !!apiKey);
  console.log("API Key length:", apiKey ? apiKey.length : 0);
  
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.warn("Gemini API key not found. Using fallback responses.");
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });
    
    chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });
    
    console.log("Gemini AI initialized successfully!");
    return true;
  } catch (error) {
    console.error("Error initializing Gemini AI:", error);
    return false;
  }
};

export async function sendMessage(message) {
  console.log("Sending message:", message);
  
  // Initialize AI if not already done
  if (!chat && !initializeAI()) {
    console.log("Using fallback response - AI not initialized");
    return getEnhancedFallbackResponse(message);
  }

  try {
    console.log("Sending to Gemini AI...");
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    console.log("Gemini response:", text);
    return text || "I'm here to help with your fashion questions! 👗✨";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return getEnhancedFallbackResponse(message);
  }
}

// Enhanced fallback responses with more specific advice
function getEnhancedFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Specific color and style combinations
  if (lowerMessage.includes('green dress') && (lowerMessage.includes('black') || lowerMessage.includes('blue'))) {
    return "With a green dress, I'd recommend black heels! 🖤 Black is a classic choice that creates elegant contrast and works for both day and evening. Blue might clash unless it's a very specific shade. Black heels will make your green dress pop beautifully! ✨👠";
  }
  
  if (lowerMessage.includes('what color') && lowerMessage.includes('shoes')) {
    return "Great question about shoe colors! 👠 Tell me more about your outfit - what color is your dress/outfit and what's the occasion? This will help me give you the perfect shoe color recommendation! ✨";
  }
  
  if (lowerMessage.includes('dress') && lowerMessage.includes('shoes')) {
    return "Pairing shoes with dresses is an art! 👗✨ For formal dresses, go with heels in black, nude, or metallics. For casual dresses, try sandals, sneakers, or ankle boots. What style dress are you working with? 💕";
  }
  
  if (lowerMessage.includes('dress') || lowerMessage.includes('formal')) {
    return "For dresses, consider the occasion! 👗 A-line dresses flatter most body types, bodycon for curves, and maxi dresses for elegance. What's the event you're dressing for? ✨";
  } else if (lowerMessage.includes('suit') || lowerMessage.includes('professional')) {
    return "Suits are power pieces! 💼 A well-tailored blazer in navy, black, or grey is versatile. Pair with matching pants or mix with different bottoms. What's your style preference - classic or modern? ✨";
  } else if (lowerMessage.includes('casual') || lowerMessage.includes('jeans')) {
    return "Casual chic is effortless! 👖 High-waisted jeans are universally flattering, straight-leg for classic look, or wide-leg for trendy vibes. Pair with fitted tops for balance! What's your body type? �";
  } else if (lowerMessage.includes('shoes') || lowerMessage.includes('heels') || lowerMessage.includes('footwear')) {
    return "Shoes complete every look! 👠 The key is matching the shoe style to your outfit's formality. Tell me about your outfit and the occasion - I'll help you choose the perfect pair! ✨";
  } else if (lowerMessage.includes('color') || lowerMessage.includes('match')) {
    return "Color coordination is key to great style! 🎨 I'd love to help you match colors perfectly. What pieces are you trying to coordinate? Tell me the colors you're working with! ✨";
  } else if (lowerMessage.includes('accessory') || lowerMessage.includes('purse') || lowerMessage.includes('watch')) {
    return "Accessories make the outfit! 👜⌚ The rule is: let one statement piece shine. If you have a bold purse, keep jewelry minimal. What's your main outfit like? I'll help you accessorize! ✨";
  } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    return "Hello gorgeous! 💕 I'm Stylo, your personal fashion advisor! I'm here to help you create stunning looks. What styling challenge can I help you solve today? Ask me about colors, occasions, body types, or anything fashion! 🛍️✨";
  } else {
    return "I'm here to give you personalized fashion advice! 💕 Ask me specific questions like: 'What shoes go with my red dress?' or 'How do I style jeans for work?' The more details you give me, the better advice I can offer! 🛍️✨";
  }
}
