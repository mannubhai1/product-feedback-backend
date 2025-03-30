import OpenAI from "openai";

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
  apiKey: process.env.OPENAI_API_KEY,
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
    });

    const outputText: string = response.output_text;
    const trimmedOutput: string = outputText.trim();
    const parsed: AnalysisResult = JSON.parse(trimmedOutput);
    return parsed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("failed to analyze feedback", error.message);
      throw new Error(`Failed to analyze feedback: ${error.message}`);
    }
    throw new Error("Failed to analyze feedback");
  }
};
