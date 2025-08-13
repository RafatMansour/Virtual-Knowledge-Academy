'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const ModeToggle: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme((prev: string) => (prev === 'dark' ? 'light' : 'dark'))}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] text-[#aa7fff] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <Sun className="absolute h-[1.2rem] w-[1.2rem] text-yellow-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
};

export { ModeToggle };
