'use client';
import { ArrowUpRight } from 'lucide-react';

import { Reveal } from '@/components/shared/reveal';
import type { Service } from '@/features/booking/types';
import { services } from '../data/content';
export function ServicesSection({ onChoose: choose }: { onChoose: (service: Service) => void }) {
  return (
    <section className="section container" id="services">
      <Reveal className="section-heading">
        <div>
          <div className="eyebrow">OUR CONSULTATIONS</div>
          <h2>
            For the questions
            <br />
            that <em>matter to you.</em>
          </h2>
        </div>
      </Reveal>
      <div className="services-layout">
        <Reveal className="services-photo">
          <img
            src="/images/temple.webp"
            alt="Sunlight falling through a carved South Indian temple corridor"
            loading="lazy"
          />
          <div>
            <span>WISDOM THAT MEETS YOU WHERE YOU ARE</span>
            <h3>
              A deeper understanding.
              <br />A grounded next step.
            </h3>
          </div>
        </Reveal>
        <div className="service-grid">
          {services.map((s, i) => (
            <Reveal className="service-card" key={s.name} delay={i * 0.06}>
              <div className="service-top">
                <s.icon strokeWidth={1.3} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <button
                className="service-link"
                onClick={() => choose('Horoscope consultation')}
                aria-label={`Book ${s.name}`}
              >
                {s.label}
                <ArrowUpRight size={18} />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
