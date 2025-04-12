// utils/groq-ai/groq-utils.ts
import groq from './groq-client'; // Import the initialized client

export const groqReply = async (messages) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": messages,
      "model": "qwen-qwq-32b",
      "temperature": 0.6,
      "max_completion_tokens": 32768,
      "top_p": 0.95,
      "stream": true,
      "stop": null
    });

    let fullResponse = '';
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      // Consider logging or other server-side handling here if needed
      fullResponse += content;
    }
    return fullResponse;
  } catch (error) {
    console.error("Error in groqReply:", error);
    throw error; // Re-throw the error for the API route to handle
  }
};