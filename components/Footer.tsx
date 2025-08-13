'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/images/Logo.png';

const Footer: React.FC = () => {
  return (
    <>
      <section className="mb-auto">
        <div>
          <footer className="bg-[#f0f0fc] dark:bg-[#443266] mx-5 rounded-3xl py-5 text-slate-800 dark:text-slate-50 border-t border-slate-200 dark:border-[#2c2144] shadow-sm">
            <div className="mx-auto max-w-7xl px-5">
              <div className="flex flex-col items-center justify-between md:flex-row">
                <Link href="/">
                  <Image
                    height={38}
                    width={160}
                    src={Logo.src}
                    className="w-20"
                    alt="شعار الموقع"
                  />
                </Link>

                <div className="m-10 grid w-full grid-flow-row grid-cols-1 gap-4 text-center text-base font-normal sm:grid-cols-4 lg:gap-8">
                  <Link href="/privacy-policy" target="_blank">
                    سياسة الخصوصية
                  </Link>
                  <Link href="/faq" target="_blank">
                    الأسئلة الشائعة
                  </Link>
                  <Link href="/terms" target="_blank">
                    الأحكام والشروط
                  </Link>
                  <Link href="/contact" target="_blank">
                    تواصل معنا
                  </Link>
                </div>
              </div>
            </div>
          </footer>

          <p className="mb-5 mt-4 text-center dark:text-slate-200">
            جميع الحقوق محفوظة لأكاديمية المعرفة 2025 &copy;
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
