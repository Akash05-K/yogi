'use client';
import { ArrowRight, ArrowUpRight, Video } from 'lucide-react';

import { Reveal } from '@/components/shared/reveal';
import { Wheel } from './zodiac-wheel';
export function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero container">
        <Reveal className="hero-copy">
          <div className="eyebrow">ANCIENT WISDOM. A CLEARER TOMORROW.</div>
          <h1>
            Discover your
            <br />
            true path.
            <br />
            <em>Move with clarity.</em>
          </h1>
          <p>
            Life brings questions. Vedic wisdom brings perspective. Explore personalised guidance
            for your journey with Yogi Astro.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="button">
              Book a consultation <ArrowUpRight size={18} />
            </a>
            <a href="#services" className="text-link">
              Explore our services <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <Video size={17} /> Audio & video calls
            </span>
            <i />
            <span>Tamil · Telugu · English</span>
          </div>
        </Reveal>
        <Reveal className="hero-art" delay={0.15}>
          <div className="hero-orbit">
            <Wheel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
