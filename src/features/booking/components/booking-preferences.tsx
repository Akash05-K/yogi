'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, HeartHandshake, Moon, ShieldCheck, Stars, Sun } from 'lucide-react';
import type { BookingController } from '../hooks/use-booking';
import type { Service } from '../types';
import { DayLabel } from './day-label';
export function BookingPreferences({ booking }: { booking: BookingController }) {
  const {
    service,
    setService,
    mode,
    setMode,
    language,
    setLanguage,
    date,
    setDate,
    days,
    period,
    setPeriod,

    setStep,
  } = booking;

  return (
    <div className="booking-step">
      <fieldset>
        <legend>What would you like guidance on?</legend>
        <div className="service-options">
          {(['Horoscope consultation', 'Marriage compatibility'] as Service[]).map((s, i) => (
            <button
              key={s}
              aria-pressed={service === s}
              className={service === s ? 'selected' : ''}
              onClick={() => setService(s)}
            >
              {i === 0 ? <Stars size={22} /> : <HeartHandshake size={22} />}
              <span>{s}</span>
              <span className="radio-dot" />
            </button>
          ))}
        </div>
      </fieldset>
      <div className="field-row">
        <label>
          Consultation mode
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Video call</option>
            <option>Audio call</option>
          </select>
        </label>
        <label>
          Preferred language
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>English</option>
          </select>
        </label>
      </div>
      <fieldset>
        <legend>
          Choose a preferred date <span>IST · UTC +05:30</span>
        </legend>
        <div className="day-grid">
          {days.slice(0, 5).map((d) => (
            <button
              key={d}
              aria-pressed={date === d}
              className={date === d ? 'selected' : ''}
              onClick={() => setDate(d)}
            >
              <DayLabel date={d} />
            </button>
          ))}
        </div>
        <label className="other-date">
          Or choose another date
          <input
            aria-label="Preferred date"
            type="date"
            value={date}
            min={days[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Preferred time of day</legend>
        <div className="time-options">
          {[
            ['Morning', Sun],
            ['Afternoon', Sun],
            ['Evening', Moon],
          ].map(([t, I]) => {
            const Icon = I as typeof Sun;
            return (
              <button
                key={t as string}
                className={period === t ? 'selected' : ''}
                aria-pressed={period === t}
                onClick={() => setPeriod(t as string)}
              >
                <Icon size={15} />
                {t as string}
              </button>
            );
          })}
        </div>
        <small className="field-help">
          This is a preference. Your exact time will be confirmed by the team.
        </small>
      </fieldset>
      <Button
        className="button full"
        disabled={!date || !period || date < days[0]}
        onClick={() => setStep(2)}
      >
        Continue to your details <ArrowRight size={17} />
      </Button>
      <p className="secure-note">
        <ShieldCheck size={13} /> No payment required to prepare a request.
      </p>
    </div>
  );
}
