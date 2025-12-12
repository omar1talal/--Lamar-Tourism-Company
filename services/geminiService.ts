import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelAdvice = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the chat history for context
    const chat = ai.chats.create({
      model: model,
      history: history,
      config: {
        systemInstruction: "أنت مساعد ذكي لشركة 'لمار للسياحة'. دورك هو مساعدة المستخدمين في التخطيط لرحلاتهم، واقتراح وجهات سياحية، وإعطاء نصائح للسفر. كن ودوداً ومفيداً وتحدث باللغة العربية دائماً. لا تخرج عن سياق السياحة والسفر.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، أواجه مشكلة في الاتصال حالياً. يرجى المحاولة لاحقاً.";
  }
};
