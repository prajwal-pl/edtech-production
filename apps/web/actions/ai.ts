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

/**
 * Generates diagnostic content with structured JSON output
 * This function is specifically designed for diagnostic assessments with
 * question generation and answer evaluation capabilities
 */
export const generateDiagnosticContent = async (input: {
  mode: "generate_questions" | "evaluate_answers";
  subject: string;
  level: string;
  topics?: string[];
  count?: number;
  userAnswers?: Array<{ questionId: string; question: string; answer: string }>;
}) => {
  try {
    const {
      mode,
      subject,
      level,
      topics = [],
      count = 5,
      userAnswers = [],
    } = input;

    let prompt = "";
    let systemMessage = "";

    if (mode === "generate_questions") {
      prompt = `
Generate ${count} multiple-choice assessment questions for a diagnostic test on ${subject} at ${level} level.
${topics.length > 0 ? `Focus on these specific topics: ${topics.join(", ")}` : ""}

Each question should test a different concept or skill. For each question, provide:
1. A unique questionId
2. The question text
3. Four answer options (A, B, C, D format)
4. The correct answer option (as an index 0-3 or letter A-D)
5. The difficulty level (beginner, intermediate, advanced)
6. A detailed explanation of the answer
7. Keywords or concepts being tested

Format the response as a valid JSON array of question objects.
`;

      systemMessage = `
You are a diagnostic assessment generator specialized in creating educational assessments.
Always return your response as a valid, parseable JSON array with the following structure:
[
  {
    "questionId": "unique-id-string",
    "question": "The full question text",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": 0,
    "difficulty": "beginner|intermediate|advanced",
    "explanation": "Detailed explanation of why this is the correct answer",
    "concepts": ["concept1", "concept2"]
  },
  ...
]
The correctAnswer should be the index (0-3) of the correct option in the options array.
Do not include any text outside of the JSON structure. Ensure your JSON is valid and can be parsed.
`;
    } else if (mode === "evaluate_answers") {
      if (!userAnswers || userAnswers.length === 0) {
        throw new Error("User answers must be provided for evaluation mode");
      }

      prompt = `
Evaluate the following answers for a diagnostic assessment on ${subject} at ${level} level:

${JSON.stringify(userAnswers, null, 2)}

For each answer, provide:
1. Whether the answer is correct, partially correct, or incorrect
2. A score from 0-100
3. Detailed feedback explaining the evaluation
4. Recommendations for improvement
5. Suggested resources or topics to study

Format the response as a valid JSON object.
`;

      systemMessage = `
You are a diagnostic assessment evaluator specialized in educational feedback.
Always return your response as a valid, parseable JSON object with the following structure:
{
  "overallScore": 85,
  "skillLevel": "beginner|intermediate|advanced",
  "feedback": "Overall assessment of the user's knowledge and skills",
  "strengths": ["strength1", "strength2"],
  "areasForImprovement": ["area1", "area2"],
  "recommendations": "Detailed recommendations for further study",
  "evaluations": [
    {
      "questionId": "unique-id-string",
      "status": "correct|partially_correct|incorrect",
      "score": 80,
      "feedback": "Specific feedback on this answer",
      "improvement": "Suggestion for improvement"
    },
    ...
  ]
}
Do not include any text outside of the JSON structure. Ensure your JSON is valid and can be parsed.
`;
    } else {
      throw new Error(
        "Invalid mode specified for diagnostic content generation"
      );
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "system",
          content: systemMessage,
        },
      ],
      // Use 'json_object' for evaluation, but the questions are an array
      response_format:
        mode === "evaluate_answers" ? { type: "json_object" } : undefined,
    });
    console.log(response.choices[0]?.message.content || "{}");
    const content = response.choices[0]?.message.content || "{}";

    try {
      // Parse the content to ensure it's valid JSON
      const parsedContent = JSON.parse(content);
      return parsedContent;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.log("Raw response:", content);
      throw new Error("Failed to parse diagnostic content as JSON");
    }
  } catch (error) {
    console.error("Error generating diagnostic content:", error);
    throw new Error("Failed to generate diagnostic content");
  }
};
