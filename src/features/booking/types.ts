export type Service = 'Horoscope consultation' | 'Marriage compatibility';
export interface BookingResult {
  reference?: string;
  preview?: boolean;
}
export interface ServiceStatus {
  booking: boolean;
  ai: boolean;
}
