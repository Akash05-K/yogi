'use client';
import { CalendarDays, Check } from 'lucide-react';
import { BookingContactForm } from './booking-contact-form';
import { BookingPreferences } from './booking-preferences';

import { Reveal } from '@/components/shared/reveal';
import type { BookingController } from '../hooks/use-booking';
export function BookingForm({ booking }: { booking: BookingController }) {
  const { step, setStep, date, period } = booking;
  return (
    <Reveal className="booking-card">
      <div className="booking-title">
        <span className="icon-tile">
          <CalendarDays size={22} />
        </span>
        <div>
          <h3>Book your consultation</h3>
          <p>Your journey, at your convenience.</p>
        </div>
      </div>
      <div className="progress">
        <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>
          <span>{step === 2 ? <Check size={12} /> : 1}</span> Consultation
        </button>
        <div />
        <button
          className={step === 2 ? 'active' : ''}
          onClick={() => {
            if (date && period) setStep(2);
          }}
        >
          <span>2</span> Your details
        </button>
      </div>
      {step === 1 ? (
        <BookingPreferences booking={booking} />
      ) : (
        <BookingContactForm booking={booking} />
      )}
    </Reveal>
  );
}
