'use client';

import { useAppStore } from '@/lib/store';
import { useEffect } from 'react';

export default function DirectionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { language } = useAppStore();

  useEffect(() => {
    // User requested LTR layout for Arabic as well
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return <>{children}</>;
}
