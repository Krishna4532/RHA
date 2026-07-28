import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 text-foreground">
      <div className="max-w-xl rounded-[2rem] border border-border bg-background-soft p-10 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">The page you are looking for is unavailable.</h1>
        <p className="mt-5 text-lg leading-8 text-foreground-soft">
          The movement continues, but this route is missing. Return to the homepage to continue exploring.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go home
          </Link>
        </Button>
      </div>
    </main>
  );
}
