import { GoogleGenAI, Type } from "@google/genai";
import { ConceptResponse } from "../types";

// Initialize Gemini API client safely
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Error accessing process.env", e);
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateArchitecturalConcept = async (prompt: string): Promise<ConceptResponse | null> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data for preview.");
    return {
      title: "The Lagoon Respite",
      concept: "A sustainable floating structure on the Lagos Lagoon, utilizing recycled timber and raffia shading systems. The design mimics the root structure of mangroves to provide stability and natural filtration.",
      materials: ["Recycled Lagos Timber", "Laterite Earth", "Bamboo Composite", "Raffia Thatch"],
      features: ["Rainwater Harvesting Roof", "Passive Lagoon Cooling", "Floating Gardens", "Solar Weave Facade"]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a contemporary African architectural concept situated in Nigeria based on this inspiration: "${prompt}". 
      The design should blend modern sustainability with traditional Nigerian aesthetics (Yoruba, Igbo, or Hausa influences).
      Return a JSON object with a poetic title, a detailed concept description (approx 40 words), a list of 4 key materials, and 4 unique architectural features.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            concept: { type: Type.STRING },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "concept", "materials", "features"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ConceptResponse;
    }
    return null;
  } catch (error) {
    console.error("Error generating concept:", error);
    return null;
  }
};