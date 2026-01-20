import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type GenerateTextParams = {
  prompt: string;
  model: string;
  instructions?: string;
  temperature?: number;
  maxTokens?: number;
  previousResponseId?: string;
};

type GenerateTextResponse = {
  id: string;
  text: string;
};

export const llmClient = {
  async generateText({
    model,
    prompt,
    instructions,
    temperature = 0.2,
    maxTokens = 300,
    previousResponseId,
  }: GenerateTextParams): Promise<GenerateTextResponse> {
    const response = await client.responses.create({
      model,
      instructions,
      input: prompt,
      temperature,
      max_output_tokens: maxTokens,
      previous_response_id: previousResponseId,
    });
    return {
      id: response.id,
      text: response.output_text,
    };
  },
};
