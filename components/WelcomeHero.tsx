'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';

const WelcomeHero: React.FC = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] bg-cover bg-right-top bg-no-repeat pt-32 sm:pb-20 sm:pt-24 transition-colors duration-300">
        <div className="container mx-auto flex w-full items-center justify-center sm:max-w-[69rem]">
          <div className="w-full py-10 sm:py-28">
            <div className="flex flex-col justify-center gap-5 p-5 sm:gap-24 sm:py-10 lg:flex-row">
              <div className="order-1 flex w-full flex-col justify-center gap-5 transition-all duration-500 lg:-order-1 lg:w-1/3 opacity-100">
                <h1 className="text-5xl font-extrabold text-white sm:text-5xl mb-2 drop-shadow-md transition-all duration-300">
                  أكاديمية المعرفة الإفتراضية
                </h1>
                <p className="text-base leading-8 text-white/90 sm:mt-2 sm:text-2xl transition-all duration-300">
                  منصة تعليمية متكاملة تقدم دورات تقنية عالية الجودة
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:mt-5">
                  <Link
                    className="w-fit justify-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#aa7fff] rounded-2xl transition-all duration-300 group relative overflow-hidden"
                    href="/signup"
                    tabIndex={0}
                  >
                    <Button
                      className="bg-[#443266] dark:bg-[#aa7fff] shadow-button relative rounded-2xl px-8 py-3 text-base font-bold text-white transition-colors duration-300 hover:bg-[#412955] dark:hover:bg-[#8469d4] focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:ring-offset-2 group-hover:scale-105 group-active:scale-95 z-10"
                      variant="default"
                      size="lg"
                      asChild
                    >
                      <span className="relative z-20 tracking-wide">إنشاء حساب</span>
                    </Button>
                    <div className="bg-button-hover-gradient pointer-events-none absolute inset-0 z-0 h-full rounded-2xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </Link>
                  <Link
                    className="w-fit justify-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#aa7fff] rounded-2xl transition-all duration-300 group relative overflow-hidden"
                    href="/login"
                    tabIndex={0}
                  >
                    <Button
                      className="bg-transparent border-2 border-white shadow-button relative rounded-2xl px-8 py-3 text-base font-bold text-white transition-colors duration-300 hover:bg-white hover:text-[#aa7fff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 group-hover:scale-105 group-active:scale-95 z-10"
                      variant="outline"
                      size="lg"
                      asChild
                    >
                      <span className="relative z-20 tracking-wide">تسجيل الدخول</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mb-10 h-56 w-auto sm:mb-0 sm:h-96 lg:w-2/3 flex items-center justify-center">
                <div dir="ltr" className="w-full flex justify-center">
                  <Card />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeHero;
