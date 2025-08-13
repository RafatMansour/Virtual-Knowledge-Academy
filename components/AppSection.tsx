'use client';

import React from 'react';
import Image from 'next/image';
import GooglePlay from '@/components/images/google-play.svg';
import AppStore from '@/components/images/app-store.svg';
import PhoneMockup from '@/components/images/PhoneMockup.svg';
import QRImage from '@/components/images/qr-code.svg';
import QRBackground from '@/components/images/qr-background.webp';
import QRBackgroundDark from '@/components/images/qr-background-dark.webp';

const AppSection: React.FC = () => {
  return (
    <>
      <div className="container mb-36 mt-36 pt-44 lg:mb-32 lg:mt-48 bg-[#fcfcfc] dark:bg-[#382a55] rounded-3xl duration-300">
        <div className="bg-gradient-to-r from-[#F4F7FF] to-[#F6F2FF] dark:from-[#443266] dark:to-[#443266] flex w-screen flex-col items-center justify-center py-2 text-center xl:flex-row xl:gap-40 xl:text-start">
          <div className="order-last w-2/4 text-slate-700 lg:w-1/4 lg:py-16 xl:order-first dark:text-white">
            <div className="py-1 text-xl font-bold lg:py-2 lg:text-5xl">
              تطبيق الموبايل
              <span className="ml-2 inline-block align-middle animate-bounce text-[#aa7fff] text-2xl lg:text-4xl">
                📱
              </span>
            </div>
            <div className="mt-4 text-xs font-medium opacity-60 lg:text-lg">
              يمكنك الوصول للمحتوى التعليمي بعدة طرق حتى يسهل عليك التعلم في أي وقت ومكان!
            </div>
            <div className="mt-6 flex justify-center lg:justify-start">
              <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  className="ml-[6px] h-auto w-auto max-w-[100px] lg:max-w-[150px] drop-shadow-md hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  src={GooglePlay}
                  alt="google play logo"
                  width={150}
                  height={50}
                />
              </a>
              <a href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  className="h-auto w-auto max-w-[100px] lg:max-w-[150px] drop-shadow-md hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  src={AppStore}
                  alt="app store logo"
                  width={150}
                  height={50}
                />
              </a>
            </div>
          </div>
          <div className="relative -mt-56 text-center lg:-mt-44">
            <div className="absolute inset-x-0 -bottom-16 z-20 mx-auto h-[600px] w-[300px] scale-[0.68] rounded-[2.2rem] border-[14px] border-gray-800 bg-gray-800 sm:bottom-0 sm:scale-[0.83] dark:border-gray-800 dark:bg-[#382a55]">
              <div className="absolute -left-[17px] top-[72px] h-[32px] w-[3px] rounded-l-lg bg-gray-800 dark:bg-gray-800"></div>
              <div className="absolute -left-[17px] top-[124px] h-[46px] w-[3px] rounded-l-lg bg-gray-800 dark:bg-gray-800"></div>
              <div className="absolute -left-[17px] top-[178px] h-[46px] w-[3px] rounded-l-lg bg-gray-800 dark:bg-gray-800"></div>
              <div className="absolute -right-[17px] top-[142px] h-[64px] w-[3px] rounded-r-lg bg-gray-800 dark:bg-gray-800"></div>
              <div className="absolute inset-x-0 -top-3 mx-auto h-6 w-20 rounded-3xl bg-gray-800 dark:bg-gray-800"></div>
              <div className="h-[572px] w-[272px] overflow-hidden rounded-[1.5rem] bg-white dark:bg-[#443266]"></div>
            </div>
            <Image
              className="relative z-10 drop-shadow-lg rounded-3xl transition-all duration-300"
              src={PhoneMockup}
              alt="تطبيق الموبايل"
              width={514}
              height={518}
            />
            <div className="bg-qr-dark absolute right-4 top-56 z-50 h-[160px] w-[160px] lg:right-0 lg:top-64 lg:h-[200px] lg:w-[200px] rounded-2xl">
              <Image
                loading="lazy"
                src={QRBackground}
                alt="qr background"
                className="h-full w-full object-cover dark:hidden rounded-2xl"
                width={200}
                height={200}
              />
              <Image
                loading="lazy"
                src={QRBackgroundDark}
                alt="qr background dark"
                className="h-full w-full object-cover hidden dark:block rounded-2xl"
                width={200}
                height={200}
              />
              <Image
                loading="lazy"
                src={QRImage}
                alt="one link QR"
                className="absolute left-1/2 top-1/2 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-[41px] lg:h-[165.92px] lg:w-[165.92px] shadow-lg"
                width={130}
                height={130}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSection;
