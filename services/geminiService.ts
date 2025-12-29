import { GoogleGenAI, Type } from "@google/genai";
import { PosterConfig } from "../types";

// Note: API Key is handled by the window.aistudio flow in the UI component or via process.env.API_KEY if available.
// We initialize a temporary client here, but re-initialize in functions to ensure key is fresh.

const SYSTEM_INSTRUCTION = `
Role: You are a Senior Visual Design Director & AI Prompt Engineer. Your goal is to produce extremely professional, commercial-grade product poster prompts where the product looks perfectly integrated into the scene.

Operational Strategy:
1. IMAGE ANALYSIS (Priority): If an image is provided, you must FIRST analyze it to identify the MAIN SUBJECT. Ignore the background. Extract details about its shape, material, color, and key features.
2. ENVIRONMENTAL INTEGRATION (CRITICAL): The product MUST NOT look like a cutout. It must be immersed in the environment.
   - Lighting Interaction: The product is illuminated BY the environment's light sources (e.g., in "Neon City", the product has pink/blue rim lights; in "Golden Hour", it has warm highlights).
   - Material Interaction: The product's surfaces must reflect the environment's colors and textures.
   - Color Harmony: The product's shadow and highlight tones must match the environment's palette.
3. MAPPING: You will receive specific selections for Style, Layout, and Environment. You must strictly map these to the definitions below.
4. VISIBILITY CONSTRAINT: Typography must NEVER obscure the core features of the product.

STRICT DEFINITION MAPPINGS (Do not deviate):

[LAYOUTS]
- "Hero Center": Subject perfectly centered, taking up 50% of frame. Text strictly above or below.
- "Off-Center Right": Subject on right vertical third. Text aligned left. Editorial look.
- "Off-Center Left": Subject on left vertical third. Text aligned right.
- "Diagonal Dynamic": Camera tilted 30 degrees. Subject creates a diagonal line. Text matches the angle.
- "Levitation": Subject floating in mid-air. Drop shadow far below to indicate height. Dynamic floating props.
- "Macro Detail": Extreme close-up on the texture/material of the product. Crop is tight.
- "Knolling": Top-down view (flat lay). Product and related items arranged in a clean, organized 90-degree grid.
- "Framed Window": View looking through a physical aperture (arch, window, hole) with product inside/beyond it.
- "Symmetrical Reflection": Subject on a reflective surface (mirror/water) creating a perfect vertical symmetry.
- "Overlapping Depth": Foreground elements (blurred) and background elements layer around the sharp product.
- "Pattern Repetition": The product is repeated multiple times in the background to create a wallpaper texture, with one "Hero" version in front.
- "Rule of Thirds": Subject placed specifically on the intersection points of the 3x3 grid. Cinematic balance.

[ENVIRONMENTS]
- "Studio Softbox": Infinite white or grey cyclorama. Soft, diffuse lighting. No hard shadows.
- "Golden Hour": Warm, orange/gold directional sunlight. Long shadows. Lens flare wrapping around subject.
- "Neon City": Cyberpunk street scene. Wet pavement reflections. Strong Blue and Pink rim lights on the subject.
- "Volumetric Fog": Dark environment with beams of light (God rays) cutting through haze and illuminating the subject.
- "Tropical Jungle": Monstera leaves, dappled sunlight filtering through greenery onto the product.
- "Underwater": Submerged look. Caustics (light lines) projected onto the subject. Bubbles. Blue cast.
- "Cosmic Space": Starfield background. Nebulas. High contrast lighting reflecting on the subject.
- "Liquid Splash": High-speed photography. Water, milk, or paint splashing dynamically around and interacting with the subject.
- "Concrete Brutalist": Raw grey concrete walls. Hard, architectural shadows cast by the subject. Minimalist.
- "Podium Stage": Subject on a velvet or marble pedestal. Spotlights focused on product. Dark background.
- "Abstract Glass": Surrounded by prisms, glass shards, and chromatic aberration effects refracting the subject.
- "Arctic Ice": Glacial environment. Ice crystals. Cold blue/white color palette reflected on the subject.

Constraints:
- Forbidden: Vague adjectives (e.g., Beautiful).
- Strict adherence: Do not misspell user text.
- ABSOLUTE RULE: The product must be the topmost layer. Typography is always secondary.
- INTEGRATION RULE: Never describe the product as "isolated" unless the style is "Minimalism". The product must physically react to the light and color of the scene.

Output Format:
ONLY output the structured prompt string in this exact format:
"Subject: [Detailed Description from Image Analysis, explicitly describing how the environment's light and color hits it]. Environment: [Strict mapping of user Env]. Composition: [Strict mapping of user Layout]. Typography: [Text/Font/Pos]. Style Modifiers: [Strict mapping of user Style]. Quality: 8k, photorealistic, highly detailed, commercial photography, blending subject and background."
`;

// Helper to parse base64 data URL
const parseBase64 = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) return null;
  return { mimeType: match[1], data: match[2] };
};

export const refinePromptWithGemini = async (config: PosterConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const textMessage = `
    Product Description (User Input): ${config.productDescription || "Use the image to determine the product."}
    
    [STRICT PARAMETERS]
    Style Selected: ${config.style}
    Layout Selected: ${config.layout}
    Environment Selected: ${config.environment}
    
    Text to Display: "${config.textOverlay}"
    
    INSTRUCTION: Look at the provided image (if any). Identify the main subject. CRITICAL: Rewrite the subject description so it describes the subject AS IF IT IS LIT BY the selected Environment (e.g., if Neon City, describe the subject having neon rim lights).
  `;

  const contents: any = [{ text: textMessage }];

  if (config.referenceImage) {
    const parsed = parseBase64(config.referenceImage);
    if (parsed) {
      contents.push({
        inlineData: {
          mimeType: parsed.mimeType,
          data: parsed.data
        }
      });
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: contents },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6, // Slightly higher to allow creative integration of lighting
      },
    });

    return response.text || "Failed to generate prompt.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw new Error("Failed to refine prompt logic.");
  }
};

export const generatePosterImage = async (refinedPrompt: string, referenceImage: string | null): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const contents: any = [{ text: refinedPrompt }];

  if (referenceImage) {
    const parsed = parseBase64(referenceImage);
    if (parsed) {
      contents.push({
        inlineData: {
          mimeType: parsed.mimeType,
          data: parsed.data
        }
      });
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: contents,
      },
      config: {
        imageConfig: {
            aspectRatio: "3:4", 
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};