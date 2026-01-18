import { chatCompletion } from '@/lib/zhipu';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // We ask GLM-4V-Flash to generate SVG code
    const messages = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Please write a valid SVG code string to draw a simple cartoon version of: "${prompt}". 
            Return ONLY the raw SVG string starting with <svg and ending with </svg>. 
            Do not include markdown code blocks (like \`\`\`xml). 
            Make it colorful and simple.`
          }
        ]
      }
    ];

    const result = await chatCompletion(messages);
    let svg = result.choices[0].message.content;
    
    // Cleanup if the model adds markdown
    svg = svg.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();
    // Ensure it starts with <svg
    const svgStart = svg.indexOf('<svg');
    const svgEnd = svg.indexOf('</svg>');
    
    if (svgStart !== -1 && svgEnd !== -1) {
        svg = svg.substring(svgStart, svgEnd + 6);
    }

    return NextResponse.json({ svg });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
