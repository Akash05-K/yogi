'use client';
import { Flower2, Globe2, ShieldCheck } from 'lucide-react';

import { Reveal } from '@/components/shared/reveal';
export function ApproachSection() {
  return (
    <section className="section container" id="approach">
      <Reveal className="center-heading">
        <div className="eyebrow">THE YOGI ASTRO APPROACH</div>
        <h2>
          Traditional wisdom.
          <br />
          <em>A personal, human touch.</em>
        </h2>
      </Reveal>
      <div className="approach-grid">
        <Reveal className="approach-card">
          <Globe2 />
          <h3>Speak from the heart.</h3>
          <p>
            Express yourself comfortably in Tamil, Telugu or English. Your language, your
            conversation.
          </p>
          <div className="language-pills">
            <span>தமிழ்</span>
            <span>తెలుగు</span>
            <span>English</span>
          </div>
        </Reveal>
        <Reveal className="approach-card photo-card">
          <img
            src="/images/celestial-desk.png"
            alt="Mystical astrologer's celestial desk"
            loading="lazy"
          />
          <div>
            <Flower2 />
            <h3>Rooted in simplicity.</h3>
            <p>Thoughtful, budget-friendly remedies that fit into everyday life.</p>
          </div>
        </Reveal>
        <Reveal className="approach-card">
          <ShieldCheck />
          <h3>Your story stays yours.</h3>
          <p>
            Personal conversations deserve care. Share your questions in a private, one-to-one
            consultation.
          </p>
          <div className="small-label">PERSONAL · RESPECTFUL · ONE-TO-ONE</div>
        </Reveal>
      </div>
    </section>
  );
}
