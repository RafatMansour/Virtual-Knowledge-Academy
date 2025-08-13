'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import xCircle from '@/components/images/x-circle.svg';

const ResetPassword: React.FC = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email && typeof window !== 'undefined') {
      const emailInput = document.getElementById('reset-email');
      if (emailInput) emailInput.focus();
    }
  }, [email]);

  useEffect(() => {
    if (error && email) setError('');
  }, [email, error]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => {
        setSuccess('');
        setEmail('');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEmail('');
        setError('');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useLayoutEffect(() => {
    const active = document.activeElement;
    if (active && active.id === 'reset-email') setIsEmailFocused(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    setTimeout(() => {
      if (!email) {
        setError('يرجى إدخال البريد الإلكتروني.');
        setLoading(false);
        return;
      }
      setSuccess(
        'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من بريدك.',
      );
      setLoading(false);
    }, 900);
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen bg-gradient-to-t from-[#fcfcfc] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] transition-all duration-300 overflow-y-auto pt-20"
    >
      <div className="lg:w-4/6 lg:m-auto text-center lg:text-right">
        <div className="border border-gray-200 dark:border-[#443266] shadow w-full max-w-lg h-auto rounded-2xl px-8 mx-auto mb-10 pt-7 pb-8 bg-white dark:bg-[#382a55] transition-all duration-300 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center text-[#aa7fff] mb-5 dark:text-[#aa7fff] transition-colors duration-300 drop-shadow tracking-wide select-none">
            إعادة تعيين كلمة المرور
          </div>

          {error && (
            <div
              id="input-error"
              className="text-sm text-gray-600 mt-5 mb-4 text-center w-full"
              aria-live="polite"
              dir="rtl"
            >
              <div className="flex justify-between items-center bg-red-100 px-4 pt-3 pb-4 border border-solid border-red-400 rounded-md">
                <span>{error}</span>
                <span title="خطأ في البيانات">
                  <Image src={xCircle} alt="error" width={24} height={24} />
                </span>
              </div>
            </div>
          )}

          <form className="mt-6 w-full" autoComplete="off" onSubmit={handleSubmit}>
            <div className="text-right mb-6">
              <label
                htmlFor="reset-email"
                className="text-gray-900 dark:text-white text-sm font-bold"
              >
                البريد الإلكتروني
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  id="reset-email"
                  name="reset-email"
                  type="email"
                  autoComplete="off"
                  aria-invalid={!!error}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    error ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    error ? 'border-red-500' : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                    isEmailFocused ? (error ? '' : 'ring ring-[#aa7fff]') : ''
                  }`}
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  aria-label="البريد الإلكتروني"
                  aria-required="true"
                  tabIndex={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('reset-btn')?.focus();
                    }
                  }}
                />
              </div>
            </div>

            <div className="text-right mt-4">
              <button
                id="reset-btn"
                tabIndex={2}
                className="bg-[#aa7fff] w-full h-14 pb-2 text-white rounded-lg cursor-pointer font-bold shadow transition-all duration-300 hover:bg-[#8469d4] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aa7fff] dark:bg-[#443266] dark:hover:bg-[#aa7fff] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed text-lg tracking-wide"
                type="submit"
                aria-label="إرسال رابط إعادة التعيين"
                disabled={loading}
              >
                {loading ? '...جاري الإرسال' : 'إرسال رابط إعادة التعيين'}
              </button>
            </div>

            <div className="text-center mt-3">
              <div dir="rtl" className="text-base dark:text-white transition-colors duration-300">
                تذكرت كلمة المرور؟
                <a
                  tabIndex={3}
                  className="text-[#aa7fff] cursor-pointer"
                  href="/login"
                  aria-label="تسجيل الدخول"
                >
                  {' '}
                  تسجيل الدخول
                </a>
              </div>
            </div>
          </form>

          {success && (
            <div
              className="text-green-600 dark:text-green-400 text-center mt-4 font-bold transition-colors duration-300 text-md"
              role="status"
            >
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
