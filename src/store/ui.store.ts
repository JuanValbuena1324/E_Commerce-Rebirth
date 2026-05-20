// src/store/ui.store.ts
import { create } from 'zustand';
import type { ViewMode } from '@/types';

interface UIState {
  viewMode: ViewMode;
  filterOpen: boolean;
  toastMsg: string;
  toastVisible: boolean;
  setViewMode: (v: ViewMode) => void;
  toggleFilter: () => void;
  showToast: (msg: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  viewMode: 3,
  filterOpen: false,
  toastMsg: '',
  toastVisible: false,

  setViewMode: (v) => set({ viewMode: v }),

  toggleFilter: () => set((s) => ({ filterOpen: !s.filterOpen })),

  showToast: (msg) => {
    set({ toastMsg: msg, toastVisible: true });
    setTimeout(() => set({ toastVisible: false }), 2800);
  },
}));
