'use client';
import { ArrowUpRight, Sun } from 'lucide-react';

export function ClosingSection() {
  return (
    <section className="closing">
      <div className="container">
        <Sun size={39} strokeWidth={1} />
        <h2>
          Your story is unique.
          <br />
          <em>Your guidance should be, too.</em>
        </h2>
        <a href="#booking" className="button cream">
          Begin your journey <ArrowUpRight size={18} />
        </a>
        <p>
          Tamil · Telugu · English <span>✦</span> Online, wherever you are.
        </p>
      </div>
    </section>
  );
}
