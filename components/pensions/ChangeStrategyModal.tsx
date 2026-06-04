'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ChangeStrategyModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChangeStrategyModal({ open, onClose }: ChangeStrategyModalProps) {
  const [redirected, setRedirected] = useState(false);

  function handleContinue() {
    window.open('https://latvija.lv', '_blank', 'noopener,noreferrer');
    setRedirected(true);
  }

  function handleClose() {
    setRedirected(false);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary mx-auto mb-3">
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
          <DialogTitle className="text-center text-lg">Continue to official service</DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed">
            Klara does not change your pension plan directly. To complete the actual pension plan
            change, you will be redirected to the official Latvian e-service.
          </DialogDescription>
        </DialogHeader>

        {redirected ? (
          <p className="text-center text-sm text-muted-foreground bg-secondary rounded-xl px-4 py-3 mt-2">
            Redirect opened in a new tab. Real changes must be completed on the official service.
          </p>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            <Button variant="outline" onClick={handleClose} className="h-11">
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              className="h-11 font-semibold"
            >
              Continue to official service
              <ExternalLink className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
