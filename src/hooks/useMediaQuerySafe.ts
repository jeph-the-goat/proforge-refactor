'use client'

import { useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export function useMediaQuerySafe(query: string): boolean {
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery(query);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return false;
  }

  return matches;
}
