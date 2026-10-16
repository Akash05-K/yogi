'use client';
import { useEffect, useState } from 'react';
export interface ServiceStatus {
  ai: boolean;
}
export function useServiceStatus() {
  const [status, setStatus] = useState<ServiceStatus>({ ai: false });
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
