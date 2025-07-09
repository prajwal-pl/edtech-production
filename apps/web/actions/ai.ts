"use server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export const generateText = async (input: string) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: input,
        },
        {
          role: "system",
          content:
            "You are a helpful tutor that provides concise and accurate answers to user queries. Format your responses with markdown for better readability. Use headings, bullet points, code blocks, and emphasis where appropriate. Always provide explanations and examples where applicable. If asked to generate code, ensure it is well-commented, formatted in proper markdown code blocks, and follows best practices. If asked anything inappropriate, refuse politely and suggest a more appropriate topic. Also turn down any requests for personal information or sensitive data.",
        },
      ],
    });

    console.log(response.choices[0]?.message.content);
    return response.choices[0]?.message.content || "No response generated";
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
};
