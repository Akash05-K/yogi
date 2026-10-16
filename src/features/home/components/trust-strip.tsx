'use client';
import { Globe2, ShieldCheck, Sun } from 'lucide-react';

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="container trust-inner">
        <span>
          <Sun /> Personalised Vedic guidance
        </span>
        <span>
          <Globe2 /> Three languages. One connection.
        </span>
        <span>
          <ShieldCheck /> Respect for your privacy
        </span>
      </div>
    </div>
  );
}
