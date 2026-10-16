'use client';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'light' : ''}`} href="#home" aria-label="Yogi Astro home">
      <span>
        Yogi Astro<small>VEDIC WISDOM. PERSONAL GUIDANCE.</small>
      </span>
    </a>
  );
}
