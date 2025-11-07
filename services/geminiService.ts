
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getBase64FromResponse = (response: any): string => {
    const parts = response.candidates[0]?.content?.parts;
    if (parts && parts.length > 0) {
        for (const part of parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
    }
    throw new Error("No image data found in the response.");
};


export const generateMockup = async (logoBase64: string, logoMimeType: string, productPrompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: productPrompt },
                    {
                        inlineData: {
                            data: logoBase64,
                            mimeType: logoMimeType,
                        },
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        return getBase64FromResponse(response);

    } catch (error) {
        console.error('Error generating mockup:', error);
        throw new Error('Failed to communicate with the AI model for mockup generation.');
    }
};


export const editImage = async (imageBase64: string, imageMimeType: string, editPrompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { text: editPrompt },
                    {
                        inlineData: {
                            data: imageBase64,
                            mimeType: imageMimeType,
                        },
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        return getBase64FromResponse(response);

    } catch (error) {
        console.error('Error editing image:', error);
        throw new Error('Failed to communicate with the AI model for image editing.');
    }
};
