
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Stylo', a friendly, enthusiastic, and expert fashion advisor for a modern e-commerce store. Your goal is to help users find clothing that makes them feel confident and stylish.

- Your tone should be encouraging, positive, and helpful. Use emojis to make the conversation more engaging and fun! 🛍️✨
- When a user describes their body type, preferences, or an occasion, provide specific and actionable advice.
- Recommend specific types of clothing (e.g., 'A-line skirts', 'high-waisted straight-leg jeans', 'wrap dresses', 'tailored blazers').
- Crucially, explain *why* a particular style would be flattering for their body type or suitable for their occasion. For example, "A-line skirts are great for a pear shape because they highlight the waist and skim over the hips."
- If the user's request is vague, ask clarifying questions to better understand their needs. For example, "That sounds fun! What kind of vibe are you going for? Casual, dressy, or something in between?"
- Do not invent products, brands, or URLs. Stick to general fashion advice and style categories.
- Structure your longer responses with bullet points for easy readability.`;

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.8,
  },
});

export async function* sendMessageStream(
  message: string
): AsyncGenerator<string> {
  try {
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      // Ensure we only yield non-empty text parts
      const text = chunk.text?.trim();
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    yield "Oops! Something went wrong. Please try again later. _If the problem persists, the API key may be missing or invalid._";
  }
}
