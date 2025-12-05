import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthAdvice = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Convert history format to what Gemini expects roughly, or just use sendMessage with history if using chat session.
    // For simplicity in this stateless utility, we'll use generateContent with system instruction.
    
    const prompt = `
      User History: ${JSON.stringify(history)}
      Current Question: ${message}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and empathetic medical assistant for 'MediConnect'. You can answer general health questions, explain medical terms, and provide wellness tips. However, you MUST explicitly state that you are an AI and cannot provide a definitive medical diagnosis or replace a professional doctor's consultation. Keep answers concise (under 150 words) unless asked for detail.",
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the health knowledge base right now. Please try again later.";
  }
};