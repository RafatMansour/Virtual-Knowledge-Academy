'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function check() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
          router.replace(`/login${next}`);
          return;
        }
        if (isMounted) setReady(true);
      } catch {
        router.replace('/login');
      }
    }
    check();
    return () => {
      isMounted = false;
    };
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-600 dark:text-slate-200">
        جاري التحقق من صلاحية الوصول...
      </div>
    );
  }

  return <>{children}</>;
}


