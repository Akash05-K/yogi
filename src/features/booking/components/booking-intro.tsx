import { Check } from 'lucide-react';

import { Reveal } from '@/components/shared/reveal';
export function BookingIntro() {
  return (
    <Reveal className="booking-intro">
      <div className="eyebrow">LET’S CONNECT</div>
      <h2>
        A little guidance.
        <br />
        <em>A new perspective.</em>
      </h2>
      <p>
        Set aside a moment for yourself. Tell us what you’re looking for, and take the first step
        towards a personal consultation.
      </p>
      <div className="booking-points">
        <span>
          <Check size={17} /> One-to-one, personalised conversation
        </span>
        <span>
          <Check size={17} /> Join from the comfort of your home
        </span>
        <span>
          <Check size={17} /> Consultation fee shared before confirmation
        </span>
      </div>
    </Reveal>
  );
}
