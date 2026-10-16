/* Server-side integration utilities. Connect to checkout only after the astrologer
   publishes fees and confirms an available slot; never accept a browser-set price. */
export async function createPaymentOrder(input: { bookingId: string; amountPaise: number }) {
  const id = process.env.RAZORPAY_KEY_ID,
    key = process.env.RAZORPAY_KEY_SECRET;
  if (!id || !key) throw new Error('Payments are not configured');
  if (!Number.isSafeInteger(input.amountPaise) || input.amountPaise <= 0)
    throw new Error('Invalid verified amount');
  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: 'Basic ' + btoa(id + ':' + key), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: 'INR',
      receipt: input.bookingId.slice(0, 40),
      notes: { booking_id: input.bookingId },
    }),
  });
  if (!response.ok) throw new Error('Payment provider could not create the order');
  return response.json() as Promise<{ id: string; amount: number; currency: string }>;
}
export async function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  const bytes = Uint8Array.from(signature.match(/.{2}/g)!, (h) => parseInt(h, 16));
  return crypto.subtle.verify('HMAC', key, bytes, encoder.encode(orderId + '|' + paymentId));
}
