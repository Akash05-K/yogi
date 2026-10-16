import type { BookingController } from '../hooks/use-booking';
import { BookingForm } from './booking-form';
import { BookingIntro } from './booking-intro';
export function BookingSection({ booking }: { booking: BookingController }) {
  return (
    <section className="section container booking-grid" id="booking">
      <BookingIntro />
      <BookingForm booking={booking} />
    </section>
  );
}
