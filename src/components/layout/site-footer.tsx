import { Brand } from './brand';
export function SiteFooter() {
  return (
    <footer className="container">
      <div className="footer-top">
        <Brand />
        <div>
          <a href="#services">Our services</a>
          <a href="#booking">Book a consultation</a>
          <a href="#faqs">FAQs</a>
        </div>
        <span>
          Ancient wisdom.
          <br />
          For your everyday life.
        </span>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Yogi Astro. All rights reserved.</span>
        <p>Astrological guidance offers perspective; outcomes are not guaranteed.</p>
      </div>
    </footer>
  );
}
