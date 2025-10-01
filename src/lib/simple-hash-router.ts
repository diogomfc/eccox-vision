// src/lib/simple-hash-router.ts
"use client";

import { useCallback } from "react";

export function useElectronHashRouter() {
  const push = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  const back = useCallback(() => {
    window.history.back();
  }, []);

  const pathname = typeof window !== 'undefined' ? window.location.hash.slice(1) || '/' : '/';

  return {
    push,
    back,
    pathname
  };
}