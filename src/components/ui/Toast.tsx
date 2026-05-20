'use client';
import { useUIStore } from '@/store/ui.store';

export function Toast() {
  const { toastMsg, toastVisible } = useUIStore();
  return (
    <div className={`toast ${toastVisible ? 'show' : ''}`} aria-live="polite">
      {toastMsg}
    </div>
  );
}
