'use client';
import { ChevronDown } from 'lucide-react';

import { Reveal } from '@/components/shared/reveal';
import { faqs } from '../data/content';
export function FaqSection() {
  return (
    <section className="faq-section" id="faqs">
      <div className="container faq-grid">
        <Reveal className="faq-intro">
          <div className="eyebrow">BEFORE WE CONNECT</div>
          <h2>
            A few things
            <br />
            <em>you may wonder.</em>
          </h2>
          <p>A little preparation makes your consultation more meaningful.</p>
        </Reveal>
        <div>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                <span>
                  <small aria-hidden="true" style={{ display: 'flex', flexShrink: 0 }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      focusable="false"
                      style={{ display: 'block' }}
                    >
                      {/* Fine diagonal rays */}
                      <path
                        d="m8 8 4 4m8 8 4 4M24 8l-4 4m-8 8-4 4"
                        stroke="#C5A05B"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />

                      {/* Four-point celestial star */}
                      <path
                        d="M16 3l3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5L16 3Z"
                        fill="#D4AF62"
                        fillOpacity="0.22"
                        stroke="#A47B35"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />

                      {/* Gold centre */}
                      <path
                        d="m16 11 5 5-5 5-5-5 5-5Z"
                        fill="#C5A05B"
                      />
                      <circle cx="16" cy="16" r="1.5" fill="#FFF2CC" />
                    </svg>
                  </small>
                  {q}
                </span>
                <ChevronDown size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
