import { GoogleGenAI, Type } from "@google/genai";
import { ChunkPair } from "../types";

export const generateGameChunks = async (topic: string, difficulty: string): Promise<ChunkPair[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Adjust complexity based on difficulty
  let promptContext = "";
  let count = 8;

  switch (difficulty) {
    case 'easy':
      promptContext = "Use simple, everyday vocabulary. Short chunks.";
      count = 6;
      break;
    case 'medium':
      promptContext = "Use standard conversational phrases. Medium length chunks.";
      count = 8;
      break;
    case 'hard':
      promptContext = "Use complex or formal vocabulary appropriate for the topic. Detailed chunks.";
      count = 10;
      break;
  }

  const prompt = `
    Generate ${count} pairs of Japanese and English text chunks based on the topic: "${topic}".
    ${promptContext}
    
    Rules:
    1. These should be "chunks" (phrase fragments), not necessarily complete sentences, but they must map 1-to-1 in meaning.
    2. Example: "私は" -> "I", "駅に行きます" -> "go to the station".
    3. Ensure the Japanese is natural.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              japanese: {
                type: Type.STRING,
                description: "The Japanese chunk text"
              },
              english: {
                type: Type.STRING,
                description: "The English translation chunk"
              }
            },
            required: ["japanese", "english"]
          }
        }
      }
    });

    const rawData = JSON.parse(response.text || "[]");
    
    // Add IDs
    return rawData.map((item: any, index: number) => ({
      id: `pair-${index}-${Date.now()}`,
      japanese: item.japanese,
      english: item.english
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate game content. Please try again.");
  }
};