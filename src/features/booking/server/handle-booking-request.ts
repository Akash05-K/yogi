import { bookingEnabled, database } from '@/lib/server/supabase';
import { bookingSchema } from '../schema';
export async function handleBookingRequest(request: Request) {
  if (!bookingEnabled())
    return Response.json(
      { error: 'Online booking requests are not available yet.' },
      { status: 503 },
    );
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return Response.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const body = await request.text();
    if (body.length > 6000)
      return Response.json({ error: 'Request is too large.' }, { status: 413 });
    const parsed = bookingSchema.safeParse(JSON.parse(body));
    if (!parsed.success)
      return Response.json(
        { error: 'Please check your contact details and appointment preferences.' },
        { status: 400 },
      );
    const d = parsed.data;
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const end = new Date();
    end.setFullYear(end.getFullYear() + 1);
    const preferred = new Date(d.date + 'T12:00:00Z');
    if (
      Number.isNaN(preferred.getTime()) ||
      preferred.toISOString().slice(0, 10) !== d.date ||
      d.date <= today ||
      preferred > end
    )
      return Response.json(
        { error: 'Choose a valid future date within the next year.' },
        { status: 400 },
      );
    const { data, error } = await database().rpc('submit_consultation_request', {
      p_service: d.service,
      p_mode: d.mode,
      p_language: d.language,
      p_date: d.date,
      p_period: d.period,
      p_name: d.name,
      p_email: d.email.toLowerCase(),
      p_phone: d.phone,
      p_note: d.note,
    });
    if (error)
      return Response.json(
        {
          error: error.message.includes('request_limit')
            ? 'You have already submitted a request recently. Please wait before trying again.'
            : 'We could not save your request. Please try again later.',
        },
        { status: error.message.includes('request_limit') ? 429 : 503 },
      );
    return Response.json({ reference: data, status: 'requested' }, { status: 201 });
  } catch {
    return Response.json(
      { error: 'Unable to process your request. Please check the form and try again.' },
      { status: 400 },
    );
  }
}
