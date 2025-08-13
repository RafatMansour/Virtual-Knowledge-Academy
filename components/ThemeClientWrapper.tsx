'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';

interface ThemeClientWrapperProps {
  children: React.ReactNode;
}

const ThemeClientWrapper: React.FC<ThemeClientWrapperProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('system');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) {
        setTheme('dark');
      } else {
        setTheme('system');
      }
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};

export default ThemeClientWrapper;
