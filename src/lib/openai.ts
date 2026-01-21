import OpenAI from 'openai';

const API_KEY = process.env.OPENAI_API_KEY || '';

if (!API_KEY) {
  console.warn('OPENAI_API_KEY is not configured. Image generation will not work.');
}

const openai = new OpenAI({
  apiKey: API_KEY,
});

export interface ImageGenerationOptions {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
}

export async function generateImage({
  prompt,
  size = '512x512',
  quality = 'standard',
  style = 'natural',
}: ImageGenerationOptions) {
  if (!API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured. Please add it to .env.local');
  }

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
      quality,
      style,
      response_format: 'url',
    });

    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error('No image URL returned from DALL-E');
    }

    return {
      url: imageUrl,
      revisedPrompt: response.data?.[0]?.revised_prompt,
    };
  } catch (error: any) {
    console.error('OpenAI Image Generation Error:', error);
    throw new Error(`Image generation failed: ${error.message}`);
  }
}
