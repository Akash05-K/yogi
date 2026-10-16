import { getChatGPTUser } from '@/lib/server/chatgpt-auth';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { CONSULTATION_GUIDE_PROMPT } from './system-prompt';
const usage = new Map<string, { count: number; reset: number }>();
export async function handleChatRequest(request: Request) {
  if (
    process.env.AI_ENABLED !== 'true' ||
    !process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    !process.env.AI_MODEL
  )
    return Response.json({ error: 'AI assistant is not configured.' }, { status: 503 });
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return new Response('Invalid origin', { status: 403 });
  const user = await getChatGPTUser();
  if (!user) return new Response('Sign in to use AI assistance.', { status: 401 });
  const key = user.userId;
  const now = Date.now();
  const previous = usage.get(key);
  const entry = previous && previous.reset > now ? previous : { count: 0, reset: now + 60000 };
  if (entry.count >= 8)
    return new Response('Please wait a minute before asking another question.', { status: 429 });
  entry.count++;
  usage.set(key, entry);
  if (usage.size > 1000) for (const [k, v] of usage) if (v.reset < now) usage.delete(k);
  try {
    const body = await request.text();
    if (body.length > 3000) return new Response('Question too long', { status: 413 });
    const { question } = JSON.parse(body);
    if (typeof question !== 'string' || !question.trim() || question.length > 500)
      return new Response('Invalid question', { status: 400 });
    const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
    const result = streamText({
      model: google(process.env.AI_MODEL),
      maxOutputTokens: 400,
      system: CONSULTATION_GUIDE_PROMPT,
      prompt: question,
    });
    return result.toTextStreamResponse();
  } catch {
    return new Response('The assistant is temporarily unavailable.', { status: 503 });
  }
}
