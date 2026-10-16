'use client';

import { useState } from 'react';
import { Copy, MessageCircle, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { BookingController } from '../hooks/use-booking';

export function BookingSummaryDialog({
  booking,
}: {
  booking: BookingController;
}) {
  const {
    service,
    mode,
    language,
    date,
    period,
    name,
    result,
    setResult,
    copied,
    setCopied,
    detailsText,
  } = booking;

  const [copyError, setCopyError] = useState('');

  function closeDialog() {
    setResult(null);
    setCopied(false);
    setCopyError('');
  }

  async function copyRequest() {
    setCopyError('');

    try {
      await navigator.clipboard.writeText(detailsText());
      setCopied(true);
    } catch {
      setCopied(false);
      setCopyError(
        'Copying is unavailable in this browser. Use Open WhatsApp to continue.',
      );
    }
  }

  return (
    <Dialog
      open={!!result}
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      <DialogContent className="request-dialog">
        <DialogHeader>
          <span className="result-icon">
            <MessageCircle />
          </span>

          <DialogTitle>Your consultation request is ready</DialogTitle>

          <DialogDescription>
            Open WhatsApp below, then tap Send to share your request.
            Nothing has been sent yet. Your appointment is confirmed
            only after the astrologer replies.
          </DialogDescription>
        </DialogHeader>

        <dl>
          {[
            ['Service', service],
            ['Preferred date', date],
            ['Time preference', `${period} (IST)`],
            ['Consultation', `${mode} · ${language}`],
            ['Name', name.trim()],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        {result && (
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button full"
          >
            <MessageCircle size={18} />
            Open WhatsApp
          </a>
        )}

        <Button
          type="button"
          className="button full"
          onClick={copyRequest}
        >
          <Copy size={16} />
          {copied ? 'Copied to clipboard' : 'Copy request details'}
        </Button>

        {copyError && (
          <p className="error" role="alert">
            {copyError}
          </p>
        )}

        <button
          type="button"
          className="text-link centered"
          onClick={closeDialog}
        >
          <RotateCcw size={14} />
          Back to request
        </button>
      </DialogContent>
    </Dialog>
  );
}