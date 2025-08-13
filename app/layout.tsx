import './globals.css';
import ThemeClientWrapper from '@/components/ThemeClientWrapper';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="ar" dir="rtl" suppressHydrationWarning>
        <body className="overflow-x-hidden">
          <ThemeClientWrapper>
            {children}
            <Analytics />
          </ThemeClientWrapper>
        </body>
      </html>
    </>
  );
}
