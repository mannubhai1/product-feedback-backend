import OpenAI from "openai";
import { config } from "../../config/config";

interface AnalysisResult {
  sentiment: "positive" | "negative" | "neutral";
  themes: string[];
  moduleTags: (
    | "form_builder"
    | "ai_scoring"
    | "ui_ux"
    | "dashboard"
    | "other"
  )[];
  confidence: number;
}

const client = new OpenAI({
  apiKey: config.openAIKey, // Use the value from config
});

export const analyzeFeedback = async (
  feedbackText: string
): Promise<AnalysisResult> => {
  const prompt = `
Analyze the following investor feedback and extract the following structured data as a JSON object:
- sentiment: "positive", "negative", or "neutral"
- themes: an array of key themes extracted from the feedback (e.g., "Scoring not aligned with thesis", "Form builder confusing", "Good UX", "Too generic outputs")
- moduleTags: an array of module tags relevant to the feedback. Options: form_builder, ai_scoring, ui_ux, dashboard, other.
- confidence: a number between 0 and 100 indicating the confidence level of the analysis.

Feedback: "${feedbackText}"

Return only the JSON.
  `;

  try {
    const response = await client.responses.create({
      model: "gpt-4o",
      input: prompt,
      temperature: 0.5,
    });

    let outputText: string = response.output_text.trim();

    // Remove markdown code fences if present
    if (outputText.startsWith("```json")) {
      outputText = outputText.slice(7);
    }
    if (outputText.endsWith("```")) {
      outputText = outputText.slice(0, -3);
    }
    outputText = outputText.trim();

    // console.log("Cleaned AI response:", outputText);

    const parsed: AnalysisResult = JSON.parse(outputText);
    return parsed;
  } catch (error: unknown) {
    console.error("failed to analyze feedback", error);
    throw new Error(`Failed to analyze feedback: ${(error as Error).message}`);
  }
};
