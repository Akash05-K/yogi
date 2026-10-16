'use client';

import { Reveal } from '@/components/shared/reveal';
export function JourneySection() {
  return (
    <section className="journey-section">
      <div className="container journey-layout">
        <Reveal>
          <div className="eyebrow">A SIMPLE WAY TO BEGIN</div>
          <h2>
            Your next step
            <br />
            starts <em>right here.</em>
          </h2>
          <div className="journey-photo">
            <img
              src="/images/astrology-ritual.png"
              alt="Astrology ritual still life"
              loading="lazy"
            />
          </div>
        </Reveal>
        <div className="steps">
          {[
            [
              '01',
              'Choose your consultation',
              'Personal guidance or marriage compatibility? Pick what brings you here.',
            ],
            [
              '02',
              'Find a time to connect',
              'Share your preferred date, call mode and language. We’ll agree on an available time.',
            ],
            [
              '03',
              'Make space for clarity',
              'Have your birth details and questions ready for your personal audio or video consultation.',
            ],
          ].map(([n, t, p]) => (
            <Reveal className="step" key={n}>
              <span aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="#A47B35"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  style={{ display: 'block', flexShrink: 0 }}
                >
                  {/* Outer petals */}
                  <path
                    d="M16 25C8 26 3 21 3 14c6 0 11 4 13 11Z"
                    fill="#B38A45"
                    fillOpacity="0.12"
                  />
                  <path
                    d="M16 25c8 1 13-4 13-11-6 0-11 4-13 11Z"
                    fill="#B38A45"
                    fillOpacity="0.12"
                  />

                  {/* Upright side petals */}
                  <path
                    d="M16 25C9 23 6 17 8 8c6 3 9 9 8 17Z"
                    fill="#D4AF62"
                    fillOpacity="0.18"
                  />
                  <path
                    d="M16 25c7-2 10-8 8-17-6 3-9 9-8 17Z"
                    fill="#D4AF62"
                    fillOpacity="0.18"
                  />

                  {/* Central petal */}
                  <path
                    d="M16 3c-7 7-7 15 0 22 7-7 7-15 0-22Z"
                    fill="#D4AF62"
                    fillOpacity="0.28"
                  />
                  <path
                    d="M16 12v13"
                    stroke="#C5A05B"
                    strokeWidth="1"
                  />

                  {/* Base */}
                  <path
                    d="M10 28c4 1.5 8 1.5 12 0"
                    stroke="#C5A05B"
                  />
                </svg>
              </span>
              <div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
