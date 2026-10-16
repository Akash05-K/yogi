'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { ASTROLOGER_WHATSAPP_NUMBER } from '../config';
import { bookingSchema } from '../schema';
import type { Service } from '../types';

type WhatsAppRequest = {
  message: string;
  url: string;
};

function todayInIndia() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? '';

  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function useBooking() {
  const [service, setService] = useState<Service>('Horoscope consultation');
  const [mode, setMode] = useState('Video call');
  const [language, setLanguage] = useState('Tamil');
  const [date, setDate] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [period, setPeriod] = useState('');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<WhatsAppRequest | null>(null);
  const [copied, setCopied] = useState(false);

  const configured = /^[1-9]\d{7,14}$/.test(ASTROLOGER_WHATSAPP_NUMBER);

  useEffect(() => {
    const today = todayInIndia();

    const list = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(`${today}T12:00:00Z`);
      day.setUTCDate(day.getUTCDate() + index + 1);
      return day.toISOString().slice(0, 10);
    });

    // Initialize date options after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(list);
    setDate(list[0]);
  }, []);

  function choose(selectedService: Service) {
    setService(selectedService);
    setStep(1);
    setError('');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.getElementById('booking')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }

  function detailsText() {
    return result?.message ?? '';
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setCopied(false);
    setResult(null);

    if (!configured) {
      setError('WhatsApp booking is not available yet.');
      return;
    }

    if (!consent) {
      setError('Please agree to the contact consent.');
      return;
    }

    const parsed = bookingSchema.safeParse({
      service,
      mode,
      language,
      date,
      period,
      name,
      email,
      phone,
      note,
      consent,
    });

    if (!parsed.success) {
      setError('Please check your name, email, phone number and consultation preferences.');
      return;
    }

    const data = parsed.data;
    const phoneDigits = data.phone.replace(/\D/g, '');

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError('Please enter a valid phone number, including the country code.');
      return;
    }

    const today = todayInIndia();
    const preferredDate = new Date(`${data.date}T12:00:00Z`);
    const latestDate = new Date(`${today}T12:00:00Z`);
    latestDate.setUTCFullYear(latestDate.getUTCFullYear() + 1);

    if (
      Number.isNaN(preferredDate.getTime()) ||
      preferredDate.toISOString().slice(0, 10) !== data.date ||
      data.date <= today ||
      preferredDate > latestDate
    ) {
      setError('Choose a future date within the next year.');
      setStep(1);
      return;
    }

    const message = [
      '*Yogi Astro — Consultation Request*',
      '',
      `Name: ${data.name}`,
      `Service: ${data.service}`,
      `Call mode: ${data.mode}`,
      `Language: ${data.language}`,
      `Preferred date: ${data.date}`,
      `Preferred time: ${data.period} (IST)`,
      `Email: ${data.email}`,
      `Phone / WhatsApp: ${data.phone}`,
      ...(data.note ? ['', `Question: ${data.note}`] : []),
      '',
      'Please confirm your availability, the exact time and consultation fee.',
      'I understand that this is a request and my appointment is not yet confirmed.',
    ].join('\n');

    setResult({
      message,
      url: `https://wa.me/${ASTROLOGER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    });
  }

  return {
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
    step,
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
    result,
    setResult,
    copied,
    setCopied,
    choose,
    detailsText,
    submit,
    configured,
  };
}

export type BookingController = ReturnType<typeof useBooking>;
