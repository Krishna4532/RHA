"use client";

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 text-foreground">
      <div className="max-w-xl rounded-[2rem] border border-border bg-background-soft p-10 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="mt-6 font-display text-4xl text-foreground sm:text-5xl">Something went wrong.</h1>
        <p className="mt-5 text-lg leading-8 text-foreground-soft">
          The experience paused unexpectedly. Please retry, and if the issue continues, refresh the page.
        </p>
        <Button className="mt-8" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  );
}
