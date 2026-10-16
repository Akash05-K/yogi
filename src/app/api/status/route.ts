import { bookingEnabled } from '@/lib/server/supabase';
export async function GET() {
  return Response.json(
    {
      booking: bookingEnabled(),
      ai:
        process.env.AI_ENABLED === 'true' &&
        !!process.env.GOOGLE_GENERATIVE_AI_API_KEY &&
        !!process.env.AI_MODEL,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
