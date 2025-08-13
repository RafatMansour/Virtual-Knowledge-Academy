'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/DarkModeToggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Logo from '@/components/images/Logo.png';

const headerRef = React.createRef<HTMLElement>();
const sections = [
  { label: 'المحتوى التعليمي', href: '/content' },
  { label: 'المسارات', href: '/tracks' },
  { label: 'الدورات', href: '/courses' },
  { label: 'الورشات', href: '/workshops' },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const pathname = usePathname();
  
  // Don't render header on login, signup, or reset-password pages
  const shouldHideHeader = pathname === '/login' || pathname === '/signup' || pathname === '/reset-password';
  
  if (shouldHideHeader) {
    return null;
  }
  
  // Check if we're on the root page to show simplified header
  const isRootPage = pathname === '/';
  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] backdrop-blur-md backdrop-filter bg-black/5 transition-all duration-300 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <nav
        ref={headerRef}
        className="dark:bg-[#382a55] z-[100] mx-auto flex h-16 w-full items-center justify-center bg-white sm:h-24 dark:text-white fixed inset-x-0 mt-5 max-w-[352px] rounded-xl px-6 lg:container sm:max-w-2xl lg:max-w-[69rem]"
      >
        <div className="flex w-full items-center justify-between sm:hidden">
          {mobileMenuOpen && (
            <div className="bg-white dark:bg-[#382a55] dark:text-white absolute inset-x-0 left-0 top-20 mx-auto grid w-full overflow-hidden rounded-xl transition-all duration-700 sm:top-28 grid-rows-[1fr] z-[110] border border-gray-100 dark:border-[#382a55] shadow-lg">
              <div className="min-h-0 w-full overflow-hidden">
                <div className="flex w-full flex-col items-center justify-center gap-6 py-3 text-slate-600 dark:text-white">
                  {!isRootPage && (
                    <>
                      <span className="hover:text-accent text-sm text-gray-400 dark:text-gray-300">
                        الانتقال الى
                      </span>
                      <div className="w-full">
                        <div
                          className="flex w-full items-center justify-center gap-1 cursor-pointer"
                          onClick={() => setSectionsOpen((v) => !v)}
                        >
                          <span className="dark:text-white">الأقسام التعليمية</span>
                          <span className="mt-2">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-all duration-300 ${
                                sectionsOpen ? '' : 'rotate-0'
                              }`}
                              height="16"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                          </span>
                        </div>
                        <div
                          className={`mt-1 grid w-full transition-all duration-300 ${
                            sectionsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div
                            className={`flex min-h-0 w-full flex-col items-center gap-2 overflow-hidden ${
                              sectionsOpen ? '' : 'h-0'
                            }`}
                          >
                            {sections.map((section, idx) => (
                              <Link
                                key={section.href + idx}
                                href={section.href}
                                className="hover:text-accent cursor-pointer py-1 text-base text-slate-400 dark:text-gray-200 dark:hover:text-white w-full text-center"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setSectionsOpen(false);
                                }}
                              >
                                {section.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {isRootPage ? (
                    <div className="mx-auto mt-0 flex w-2/3 flex-col items-center justify-center border-t-2 border-t-gray-50 dark:border-t-[#382a55] pt-3">
                      <div className="flex flex-col gap-2 w-full items-center">
                        <Link
                          href="/signup"
                          className="w-full"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setSectionsOpen(false);
                          }}
                        >
                          <Button
                            variant="default"
                            size="lg"
                            className="w-full px-6 h-10 text-sm text-white bg-[#aa7fff] border-none hover:bg-[#8469d4] focus:bg-[#8469d4] rounded-btn-custom justify-center disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="زر إنشاء حساب"
                          >
                            <span>إنشاء حساب</span>
                          </Button>
                        </Link>
                        <Link
                          href="/login"
                          className="w-full"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setSectionsOpen(false);
                          }}
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full px-6 h-10 text-sm bg-transparent border border-[#aa7fff] dark:border-[#aa7fff] text-[#aa7fff] hover:bg-[#aa7fff] dark:hover:bg-[#aa7fff] hover:text-white focus:bg-[#aa7fff] focus:text-white focus:border-0 rounded-btn-custom justify-center disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="زر تسجيل الدخول"
                          >
                            <span>تسجيل الدخول</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto mt-0 flex w-2/3 flex-col items-center justify-center border-t-2 border-t-gray-50 dark:border-t-[#382a55] pt-3">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 dark:text-gray-300">
                          سجل دخولك للوصول للمحتوى التعليمي
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="relative z-50 flex items-center justify-between w-[92px] h-[48px]">
            <button
              title="menu"
              type="button"
              className="text-gray-500 dark:text-white"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="فتح القائمة"
            >
              <div className="w-10 items-center bg-red-400" style={{ display: 'none' }}></div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={`absolute top-[10px] transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                }`}
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`absolute top-[10px] transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link
              href="/"
              className="absolute left-0 h-[40px] w-[40px] flex items-center justify-center ml-auto"
            >
              <Image
                src={Logo}
                alt="شعار الموقع"
                className="w-full h-full cursor-pointer"
                width={40}
                height={40}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="z-50 h-fit ltr:ml-auto rtl:mr-auto">
            <ModeToggle />
          </div>
        </div>
        <div className="hidden sm:flex mx-auto my-auto w-full items-center justify-between sm:max-w-6xl">
          <div className="flex w-full">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                aria-label="الشعار"
                className="flex h-full items-center justify-center"
              >
                <Image
                  src={Logo}
                  alt="أكاديمية المعرفة الإفتراضية"
                  className="h-auto w-11 cursor-pointer"
                  width={44}
                  height={44}
                  loading="lazy"
                />
              </Link>
              {!isRootPage && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <div className="relative hover:cursor-pointer" aria-label="القائمة التعليمية">
                      <div>
                        <div className="group relative flex w-full items-center gap-2 text-base select-none">
                          <div className="bg-accent group-hover:bg-[#aa7fff] absolute right-4 top-6 hidden h-1 w-12 rounded-lg group-hover:block"></div>
                          <span className="group-hover:text-[#aa7fff] dark:group-hover:text-[#aa7fff] ml-2 w-fit text-slate-800 dark:text-white font-semibold">
                            الأقسام التعليمية
                          </span>
                          <span className="group-hover:text-[#aa7fff] dark:group-hover:text-[#aa7fff] mt-2 text-slate-800 dark:text-white">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              height="16"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <div dir="rtl">
                    <DropdownMenuContent
                      align="start"
                      className="z-[200] min-w-[10rem] rtl:right-0 rtl:left-auto rtl:origin-top-right text-right dark:bg-[#382a55] bg-white/95 dark:backdrop-blur-md border-0 shadow-xl"
                      style={{ direction: 'rtl' }}
                    >
                      {sections.map((section, idx) => (
                        <DropdownMenuItem
                          key={section.href + idx}
                          asChild
                          className="transition-colors dark:hover:bg-white/20 hover:bg-[#aa7fff]/10 focus:bg-[#aa7fff]/20 rounded-md"
                        >
                          <Link href={section.href} className="w-full text-right font-medium">
                            {section.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-4">
            {isRootPage ? (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 h-10 text-sm bg-transparent border border-[#aa7fff] dark:border-[#aa7fff] text-[#aa7fff] hover:bg-[#aa7fff] dark:hover:bg-[#aa7fff] hover:text-white focus:bg-[#aa7fff] focus:text-white focus:border-0 rounded-btn-custom justify-center disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="زر تسجيل الدخول"
                  >
                    <span>تسجيل الدخول</span>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="default"
                    size="lg"
                    className="px-6 h-10 text-sm text-white bg-[#aa7fff] border-none hover:bg-[#8469d4] focus:bg-[#8469d4] rounded-btn-custom justify-center disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="زر إنشاء حساب"
                  >
                    <span>إنشاء حساب</span>
                  </Button>
                </Link>
              </>
            ) : null}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
export { headerRef };
