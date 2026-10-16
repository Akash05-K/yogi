import { ArrowUpRight } from 'lucide-react';

export function MobileBookingBar() {
  return (
    <div className="mobile-book">
      <span>
        Find your next step.<small>Personalised online guidance</small>
      </span>
      <a href="#booking" className="button">
        Book now <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
