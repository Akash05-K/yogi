'use client';
import type { ServiceStatus } from '@/features/booking/types';
import { useEffect, useState } from 'react';
export function useServiceStatus() {
  const [status, setStatus] = useState<ServiceStatus>({ booking: false, ai: false });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json() as Promise<ServiceStatus>)
      .then(setStatus)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { ...status, loading };
}
