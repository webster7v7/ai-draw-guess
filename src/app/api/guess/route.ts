import { chatCompletion } from '@/lib/zhipu';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const messages = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please identify what is drawn in this image. Answer with just the name of the object in English or Chinese. Keep it very short (1-3 words). If it is abstract or unclear, describe what it looks like.'
          },
          {
            type: 'image_url',
            image_url: {
              url: image // data:image/png;base64,...
            }
          }
        ]
      }
    ];

    const result = await chatCompletion(messages);
    const guess = result.choices[0].message.content;

    return NextResponse.json({ guess });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
