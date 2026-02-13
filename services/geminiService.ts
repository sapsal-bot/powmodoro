
import { generateLocalPraise } from "../data/praiseData"; // Import local praise generator

// API_KEY_ERROR_FLAG is no longer needed as we are not calling Gemini API for praise
// export const API_KEY_ERROR_FLAG = "API_KEY_NEEDS_ATTENTION";

export const getExtravagantPraise = async (sessionNumber: number): Promise<string> => {
  // Directly return a locally generated praise message.
  // This eliminates network calls and AI processing time for praise messages.
  return generateLocalPraise(sessionNumber);
};
