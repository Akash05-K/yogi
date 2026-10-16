'use client';
import { ArrowUpRight, Globe2, Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Brand } from './brand';
export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="topbar">
        <span>A little clarity. A more intentional life.</span>
        <span>
          <Globe2 size={12} /> Online consultations, wherever you are
        </span>
      </div>
      <header>
        <div className="nav-wrap container">
          <Brand />
          <nav className={menu ? 'open' : ''} aria-label="Main navigation">
            {[
              ['Our services', 'services'],
              ['Marriage compatibility', 'compatibility'],
              ['Our approach', 'approach'],
              ['FAQs', 'faqs'],
            ].map(([label, id]) => (
              <a key={id} href={'#' + id} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#booking" className="button nav-cta">
            Book a consultation <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
