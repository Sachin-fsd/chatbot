import { groqReply } from '@/utils/groq-ai';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const reply = await groqReply(messages);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}