import { GoogleGenAI } from "@google/genai";
import { Gender, BodyShape, SkinTone, PoseType } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

export type GarmentInput = 
  | { type: 'upload'; base64: string }
  | { type: 'preset'; name: string; description: string; color: string }
  | { 
      type: 'combined'; 
      top: { name: string; description: string; color: string };
      bottom: { name: string; description: string; color: string };
    };

export type ModelInput = 
  | { type: 'specs'; gender: Gender; bodyShape: BodyShape; skinTone: SkinTone }
  | { type: 'image'; base64: string };

/**
 * Generates a virtual try-on image using Gemini.
 */
export const generateTryOn = async (
  garmentInput: GarmentInput,
  modelInput: ModelInput,
  pose: PoseType
): Promise<string> => {
  
  let prompt = `
    Generate a photorealistic, high-fashion full-body photograph.
  `;

  const parts: any[] = [];

  // 1. Handle Model Definition
  if (modelInput.type === 'image') {
    prompt += `
    TASK: Virtual Try-On.
    SUBJECT: The person in the FIRST image provided. 
    ACTION: Replace the clothing of the person in the FIRST image with the target attire described/shown below.
    POSE: The subject should be depicted in a ${pose} pose. If this differs from the original, generate the new pose while maintaining the subject's identity.
    CONSTRAINTS: 
    - PRESERVE the person's identity, face, body shape, and skin tone exactly.
    - If the requested pose is "Front View" or "Original", prefer preserving the original image structure.
    - Only modify the clothing area to fit the new garment naturally (folds, lighting, shadows).
    `;
    parts.push({
        inlineData: {
            mimeType: 'image/jpeg',
            data: modelInput.base64
        }
    });
  } else {
    prompt += `
    Subject: A ${modelInput.skinTone} skin tone, ${modelInput.gender} model with a ${modelInput.bodyShape} body type.
    Pose: The model is striking a ${pose} pose.
    Background: Clean, professional studio lighting, neutral background.
    `;
  }

  // 2. Handle Garment Definition
  if (garmentInput.type === 'preset') {
    prompt += `
    TARGET ATTIRE: The model is wearing a ${garmentInput.color} ${garmentInput.name}. 
    DETAILS: ${garmentInput.description}.
    
    SPECIAL INSTRUCTION FOR ALGERIAN TRADITIONAL WEAR:
    - If the item is a "Naili Dress" or "Robe Naili", it MUST feature the iconic "winged" frilled sleeves (ailes), multiple layers of ruffles (volants) cascading down the arms and chest, and a high-waisted silhouette often using flowing fabrics like silk, lace, or muslin. Ensure the traditional belt and jewelry (fibulae, headbands) are rendered authentically.
    - If the item is a "Karakou", ensure the velvet jacket features the characteristic gold "fetla" or "majboud" embroidery and is paired with "Sarouel Chelka" or "Sarouel Mdouwer".
    - Focus on ultra-high fidelity for gold embroidery, lace textures, and the specific architecture of the folds.
    `;
  } else if (garmentInput.type === 'combined') {
    prompt += `
    TARGET ATTIRE: The model is wearing a combined outfit.
    TOP: A ${garmentInput.top.color} ${garmentInput.top.name}. Description: ${garmentInput.top.description}.
    BOTTOM: A ${garmentInput.bottom.color} ${garmentInput.bottom.name}. Description: ${garmentInput.bottom.description}.
    INSTRUCTION: Ensure the top and bottom are styled together naturally. The top should be tucked in or worn over the bottom as appropriate for the style.
    `;
  } else {
    const imageIndex = modelInput.type === 'image' ? 'SECOND' : 'FIRST';
    prompt += `
    TARGET ATTIRE: The clothing item depicted in the ${imageIndex} image provided. 
    INSTRUCTION: Transfer the texture, style, and fabric of the garment in the ${imageIndex} image onto the subject.
    Ignore the background of the garment image.
    `;
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: garmentInput.base64
      }
    });
  }

  // Add system-like instruction at the beginning
  parts.unshift({ text: prompt + " Style: Authentic Algerian heritage fashion photography, ultra-high resolution, cinematic lighting, 8k." });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts
      }
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                return `data:image/png;base64,${base64EncodeString}`;
            }
        }
    }
    
    throw new Error("No image generated by the model.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};