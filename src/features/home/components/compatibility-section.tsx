'use client';
import { ArrowUpRight, HeartHandshake } from 'lucide-react';

import { Reveal } from '@/components/shared/reveal';
import type { Service } from '@/features/booking/types';
export function CompatibilitySection({
  onSelectService: setService,
}: {
  onSelectService: (service: Service) => void;
}) {
  return (
    <section className="compatibility-section" id="compatibility">
      <div className="container compatibility-grid">
        <Reveal className="marriage-image">
          <img
            src="/images/wedding.png"
            alt="An Indian bride and groom gently joining hands during a wedding ceremony"
            loading="lazy"
          />
          <div className="image-seal">
            <HeartHandshake size={28} />
            <span>
              TWO JOURNEYS.
              <br />
              ONE NEW BEGINNING.
            </span>
          </div>
        </Reveal>
        <Reveal className="compatibility-copy">
          <div className="eyebrow">THIRUMANA PORUTHAM</div>
          <h2>
            Before a shared future,
            <br />
            <em>a deeper connection.</em>
          </h2>
          <p>
            Marriage is a meaningful new chapter. Explore how your individual birth charts come
            together with a considered, multi-layered compatibility reading.
          </p>
          <div className="compat-list">
            {[
              [
                '01',
                'Comprehensive chart matching',
                'A detailed evaluation of both partners’ birth charts.',
              ],
              [
                '02',
                'Dosham & planetary periods',
                'Cevvai Dosham, Rahu–Ketu Dosham and Dasa Santhippu.',
              ],
              [
                '03',
                'Harmony & understanding',
                'Traditional perspectives on emotional connection and married life.',
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span aria-hidden="true">
                  <svg
                    width="26"
                    height="32"
                    viewBox="0 0 32 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    style={{ display: 'block' }}
                  >
                    {/* Flame */}
                    <path
                      d="M16 3C16 7 11.5 9 11.5 13a4.5 4.5 0 0 0 9 0C20.5 9 17 6 16 3Z"
                      fill="#D4AF62"
                      stroke="#A47B35"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                    <path d="M16 10c0 3-2 4-2 5a2 2 0 0 0 4 0c0-2-1-3-2-5Z" fill="#FFF2CC" />

                    {/* Brass bowl */}
                    <path
                      d="M4 20h24c-2 6-6.5 9-12 9S6 26 4 20Z"
                      fill="#B38A45"
                      fillOpacity="0.16"
                      stroke="#A47B35"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 20h26M8 23h16"
                      stroke="#C5A05B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    {/* Stem and pedestal */}
                    <path
                      d="M16 29v5M12 34h8M10 34l-3 3h18l-3-3"
                      stroke="#A47B35"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M10 37h12" stroke="#D4AF62" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <h4>{t}</h4>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#booking"
            className="button"
            onClick={() => setService('Marriage compatibility')}
          >
            Explore your compatibility <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
