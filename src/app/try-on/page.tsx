import { Suspense } from 'react';
import TryOnClient from './TryOnClient';

export default function TryOnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-offwhite flex items-center justify-center">
        <div className="spinner" />
      </div>
    }>
      <TryOnClient />
    </Suspense>
  );
}