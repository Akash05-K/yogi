'use client';
import { MobileBookingBar } from '@/components/layout/mobile-booking-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { BookingSection } from '@/features/booking/components/booking-section';
import { BookingSummaryDialog } from '@/features/booking/components/booking-summary-dialog';
import { useBooking } from '@/features/booking/hooks/use-booking';
import { ConsultationGuide } from '@/features/consultation-guide/components/consultation-guide';
import { useServiceStatus } from '@/hooks/use-service-status';
import { MotionConfig } from 'motion/react';
import { ApproachSection } from './components/approach-section';
import { ClosingSection } from './components/closing-section';
import { CompatibilitySection } from './components/compatibility-section';
import { FaqSection } from './components/faq-section';
import { HeroSection } from './components/hero-section';
import { JourneySection } from './components/journey-section';
import { ServicesSection } from './components/services-section';
import { TrustStrip } from './components/trust-strip';
export function HomePage() {
  const status = useServiceStatus();
  const booking = useBooking();
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <TrustStrip />
        <ServicesSection onChoose={booking.choose} />
        <CompatibilitySection onSelectService={booking.setService} />
        <ApproachSection />
        <JourneySection />
        <BookingSection booking={booking} />
        <FaqSection />
        <ClosingSection />
      </main>
      <SiteFooter />
      <MobileBookingBar />
      <ConsultationGuide aiReady={status.ai} />
      <BookingSummaryDialog booking={booking} />
    </MotionConfig>
  );
}
