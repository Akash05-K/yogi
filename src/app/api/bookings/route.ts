import { handleBookingRequest } from '@/features/booking/server/handle-booking-request';
export async function POST(request: Request) {
  return handleBookingRequest(request);
}
