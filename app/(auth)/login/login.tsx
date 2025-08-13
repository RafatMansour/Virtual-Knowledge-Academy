'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import xCircle from '@/components/images/x-circle.svg';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

const Login: React.FC = () => {
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);

  useEffect(() => {
    if (!username && typeof window !== 'undefined') {
      const userInput = document.getElementById('username');
      if (userInput) userInput.focus();
    }
  }, [username]);

  useEffect(() => {
    if (error && (username || password)) setError('');
  }, [username, password, error]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUsername('');
        setPassword('');
        setError('');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useLayoutEffect(() => {
    const active = document.activeElement;
    if (active && active.id === 'username') setIsUserFocused(true);
    if (active && active.id === 'password') setIsPassFocused(true);
  }, []);

  const router = useRouter();

  const handleSubmitEnhanced = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setUserError(false);
    setPassError(false);
    setSuccess('');
    setLoading(true);

    if (!username && !password) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور.');
      setUserError(true);
      setPassError(true);
      setLoading(false);
      return;
    }
    if (!username) {
      setError('يرجى إدخال اسم المستخدم.');
      setUserError(true);
      setLoading(false);
      return;
    }
    if (!password) {
      setError('يرجى إدخال كلمة المرور.');
      setPassError(true);
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });
      if (signInError) {
        setError(signInError.message || 'اسم المستخدم أو كلمة المرور غير صحيح.');
        setLoading(false);
        return;
      }
      setSuccess('تم تسجيل الدخول بنجاح!')
      router.push('/dashboard')
    } catch {
      setError('تعذر الاتصال بالخادم. حاول مرة أخرى.')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen bg-gradient-to-t from-[#fcfcfc] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] transition-all duration-300 overflow-y-auto pt-20"
    >
      <div className="lg:w-4/6 lg:m-auto text-center lg:text-right">
        <div className="border border-gray-200 dark:border-[#443266] shadow w-full max-w-lg h-auto rounded-2xl px-8 mx-auto mb-10 pt-7 pb-8 bg-white dark:bg-[#382a55] transition-all duration-300 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center text-[#aa7fff] mb-5 dark:text-[#aa7fff] transition-colors duration-300 drop-shadow tracking-wide select-none">
            تسجيل الدخول
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

          <form className="mt-6 w-full" autoComplete="off" onSubmit={handleSubmitEnhanced}>
            <div className="text-right">
              <label htmlFor="username" className="text-gray-900 dark:text-white text-sm font-bold">
                اسم المستخدم أو البريد الإلكتروني
              </label>
              <div className="flex items-center w-full mt-2 mb-6" dir="rtl">
                <input
                  tabIndex={1}
                  id="username"
                  name="username"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  aria-invalid={!!error}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    userError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    userError ? 'border-red-500' : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 ${
                    isUserFocused ? (userError ? '' : 'ring ring-[#aa7fff]') : ''
                  } transition-all duration-200`}
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUserFocused(true)}
                  onBlur={() => setIsUserFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('password')?.focus();
                    }
                  }}
                />
              </div>
            </div>

            <div className="text-right">
              <label htmlFor="password" className="text-gray-900 dark:text-white text-sm font-bold">
                كلمة المرور
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  tabIndex={2}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  aria-invalid={false}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    passError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    passError ? 'border-red-500' : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 ${
                    isPassFocused ? (passError ? '' : 'ring ring-[#aa7fff]') : ''
                  } transition-all duration-200`}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPassFocused(true)}
                  onBlur={() => setIsPassFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('login-btn')?.focus();
                    }
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-1 focus:outline-none text-gray-400 hover:text-[#aa7fff] text-xs font-bold select-none"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                  title={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                >
                  {showPassword ? 'إخفاء' : 'عرض'}
                </button>
              </div>
            </div>

            <div className="text-right text-sm relative -top-4" dir="rtl">
              <div className="flex justify-between flex-wrap w-full">
                <div className="checkbox flex items-center">
                  <input
                    tabIndex={3}
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="form-checkbox accent-[#aa7fff] h-4 w-4 rounded border-gray-300 focus:ring-[#aa7fff] cursor-pointer"
                    style={{ accentColor: '#aa7fff' }}
                    title="تفعيل خيار تذكرني"
                  />
                  <label className="text-gray-600 dark:text-white mx-2"> تذكرني </label>
                </div>
                <div>
                  <a className="text-sm text-[#aa7fff]" tabIndex={5} href="/reset-password">
                    نسيت كلمة المرور؟
                  </a>
                </div>
              </div>
            </div>

            <div className="text-right mt-4">
              <input type="hidden" id="id-hidden-input" name="credentialId" />
              <button
                id="login-btn"
                tabIndex={4}
                className="bg-[#aa7fff] w-full h-14 pb-2 text-white rounded-lg cursor-pointer font-bold shadow transition-all duration-300 hover:bg-[#8469d4] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aa7fff] dark:bg-[#443266] dark:hover:bg-[#aa7fff] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed text-lg tracking-wide"
                type="submit"
                disabled={loading}
              >
                {loading ? '...جاري الدخول' : 'دخول'}
              </button>
            </div>

            <div className="text-center mt-3">
              <div dir="rtl">
                ليس لديك حساب؟
                <a tabIndex={6} className="text-[#aa7fff] cursor-pointer" href="/signup">
                  {' '}
                  إنشاء حساب
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

export default Login;
