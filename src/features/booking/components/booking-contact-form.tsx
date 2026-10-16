'use client';

import { ArrowUpRight, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { BookingController } from '../hooks/use-booking';

export function BookingContactForm({ booking }: { booking: BookingController }) {
  const {
    service,
    mode,
    language,
    date,
    period,
    setStep,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    note,
    setNote,
    consent,
    setConsent,
    error,
    submit,
    configured,
  } = booking;

  return (
    <form className="booking-step" onSubmit={submit}>
      <div className="selection-summary">
        <span>
          {service}
          <small>
            {date} · {period} (IST) · {mode} · {language}
          </small>
        </span>
        <button type="button" onClick={() => setStep(1)}>
          Edit
        </button>
      </div>

      <label>
        Your full name
        <input
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <div className="field-row">
        <label>
          Email address
          <input
            required
            type="email"
            maxLength={150}
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Phone / WhatsApp
          <input
            required
            type="tel"
            minLength={7}
            maxLength={24}
            autoComplete="tel"
            placeholder="+91 …"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
      </div>

      <label>
        What would you like to discuss? <span className="optional">Optional</span>
        <textarea
          rows={3}
          maxLength={1000}
          placeholder="A brief note about your questions. Please keep sensitive details for your consultation."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      <p className="field-help">
        Have your birth date, time and place ready for your consultation. For compatibility, prepare
        both partners’ details.
      </p>

      <label className="consent">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          I agree to share these details with the astrologer through WhatsApp and be contacted about
          this request. My preferred date is subject to availability.
        </span>
      </label>

      <p className="field-help">
        Review your request, then open WhatsApp and tap Send to share it with the astrologer.
      </p>

      {!configured && (
        <div className="preview-notice">
          WhatsApp booking is not available yet. Please try again later.
        </div>
      )}

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <Button className="button full" disabled={!configured} type="submit">
        Review WhatsApp request
        <ArrowUpRight size={18} />
      </Button>

      <p className="secure-note">
        <ShieldCheck size={13} />
        Your appointment is confirmed only after the astrologer responds.
      </p>
    </form>
  );
}
