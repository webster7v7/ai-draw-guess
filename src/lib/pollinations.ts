/**
 * Pollinations.ai - Free AI Image Generation
 * No API key required, completely free
 */

export interface ImageGenerationOptions {
  prompt: string;
  width?: number;
  height?: number;
  seed?: number;
  model?: 'flux' | 'turbo' | 'sd';
  enhance?: boolean;
}

export async function generateImage({
  prompt,
  width = 512,
  height = 512,
  seed = Math.floor(Math.random() * 1000000),
  model = 'flux',
  enhance = true,
}: ImageGenerationOptions): Promise<{ url: string }> {
  try {
    // Build URL with parameters
    const baseUrl = 'https://pollinations.ai/p';
    const params = new URLSearchParams({
      width: width.toString(),
      height: height.toString(),
      seed: seed.toString(),
      model: model,
      ...(enhance && { enhance: 'true' }),
    });

    const url = `${baseUrl}/${encodeURIComponent(prompt)}?${params.toString()}`;

    // Pollinations.ai returns the image directly
    // We return the URL for the frontend to display
    return {
      url,
    };
  } catch (error: any) {
    console.error('Pollinations.ai Error:', error);
    throw new Error(`Image generation failed: ${error.message}`);
  }
}
