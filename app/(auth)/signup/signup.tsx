'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import xCircle from '@/components/images/x-circle.svg';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabaseClient';

const Signup: React.FC = () => {
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isMobileFocused, setIsMobileFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  useEffect(() => {
    if (!firstName && typeof window !== 'undefined') {
      const firstNameInput = document.getElementById('firstName');
      if (firstNameInput) firstNameInput.focus();
    }
  }, [firstName]);

  useEffect(() => {
    const active = document.activeElement;
    if (active && active.id === 'username') setIsUsernameFocused(true);
    if (active && active.id === 'password') setIsPassFocused(true);
    if (active && active.id === 'confirmPassword') setIsConfirmFocused(true);
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setMobileError(false);
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setSuccess('');
    setLoading(true);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      setError('يرجى ملء جميع الحقول.');
      setFirstNameError(!firstName);
      setLastNameError(!lastName);
      setEmailError(!email || !isValidEmail(email));
      setMobileError(!mobile);
      setUsernameError(!username);
      setPasswordError(!password);
      setConfirmPasswordError(!confirmPassword);
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      setEmailError(true);
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل.');
      setPasswordError(true);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      setPasswordError(true);
      setConfirmPasswordError(true);
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            mobile,
            username,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message || 'حدث خطأ أثناء إنشاء الحساب.');
        setLoading(false);
        return;
      }

      // If email confirmations are enabled, session may be null until verification
      if (!data.session) {
        setSuccess('تم إنشاء الحساب. يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.');
        setLoading(false);
        return;
      }

      setSuccess('تم إنشاء الحساب بنجاح!');
      router.push('/dashboard');
    } catch (err) {
      setError('تعذر الاتصال بالخادم. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-start min-h-screen bg-gradient-to-t from-[#fcfcfc] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] transition-all duration-300 overflow-y-auto pt-20"
    >
      <div className="lg:w-4/6 lg:m-auto text-center lg:text-right">
        <div className="border border-gray-200 dark:border-[#443266] shadow w-full max-w-lg h-auto rounded-2xl px-8 mx-auto mb-10 pt-7 pb-8 bg-white dark:bg-[#382a55] transition-all duration-300 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-center text-[#aa7fff] mb-5 dark:text-[#aa7fff] transition-colors duration-300 drop-shadow tracking-wide select-none">
            إنشاء حساب
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="text-gray-900 dark:text-white text-sm font-bold"
                >
                  الاسم الأول
                </label>
                <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                  <input
                    tabIndex={1}
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="off"
                    aria-invalid={!!error}
                    maxLength={32}
                    className={`dark:text-black w-full border ${
                      firstNameError ? 'border-red-500' : 'border-gray-200'
                    } bg-white focus:outline-none focus:${
                      firstNameError
                        ? 'border-red-500'
                        : isFirstNameFocused
                        ? 'border-[#aa7fff]'
                        : 'border-gray-200'
                    } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                      isFirstNameFocused && !firstNameError ? 'ring ring-[#aa7fff]' : ''
                    }`}
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setIsFirstNameFocused(true)}
                    onBlur={() => setIsFirstNameFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById('lastName')?.focus();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="text-gray-900 dark:text-white text-sm font-bold"
                >
                  الاسم الأخير
                </label>
                <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                  <input
                    tabIndex={2}
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="off"
                    aria-invalid={!!error}
                    maxLength={32}
                    className={`dark:text-black w-full border ${
                      lastNameError ? 'border-red-500' : 'border-gray-200'
                    } bg-white focus:outline-none focus:${
                      lastNameError
                        ? 'border-red-500'
                        : isLastNameFocused
                        ? 'border-[#aa7fff]'
                        : 'border-gray-200'
                    } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                      isLastNameFocused && !lastNameError ? 'ring ring-[#aa7fff]' : ''
                    }`}
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => setIsLastNameFocused(true)}
                    onBlur={() => setIsLastNameFocused(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById('email')?.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="text-gray-900 dark:text-white text-sm font-bold">
                البريد الإلكتروني
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  tabIndex={3}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  aria-invalid={!!error}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    emailError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    emailError ? 'border-red-500' : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 ${
                    isEmailFocused ? (emailError ? '' : 'ring ring-[#aa7fff]') : ''
                  } transition-all duration-200`}
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('mobile')?.focus();
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="mobile" className="text-gray-900 dark:text-white text-sm font-bold">
                رقم الجوال
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  tabIndex={4}
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="off"
                  aria-invalid={!!error}
                  maxLength={16}
                  className={`dark:text-black w-full border ${
                    mobileError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    mobileError
                      ? 'border-red-500'
                      : isMobileFocused
                      ? 'border-[#aa7fff]'
                      : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                    isMobileFocused && !mobileError ? 'ring ring-[#aa7fff]' : ''
                  }`}
                  placeholder=""
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onFocus={() => setIsMobileFocused(true)}
                  onBlur={() => setIsMobileFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('username')?.focus();
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="username" className="text-gray-900 dark:text-white text-sm font-bold">
                اسم المستخدم
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  tabIndex={5}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  aria-invalid={!!error}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    usernameError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    usernameError
                      ? 'border-red-500'
                      : isUsernameFocused
                      ? 'border-[#aa7fff]'
                      : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                    isUsernameFocused && !usernameError ? 'ring ring-[#aa7fff]' : ''
                  }`}
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('password')?.focus();
                    }
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="text-gray-900 dark:text-white text-sm font-bold">
                كلمة المرور
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  tabIndex={6}
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  aria-invalid={false}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    passwordError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    passwordError
                      ? 'border-red-500'
                      : isPassFocused
                      ? 'border-[#aa7fff]'
                      : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                    isPassFocused && !passwordError ? 'ring ring-[#aa7fff]' : ''
                  }`}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPassFocused(true)}
                  onBlur={() => setIsPassFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('confirmPassword')?.focus();
                    }
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-1 focus:outline-none text-gray-400 hover:text-[#aa7fff] text-xs font-bold select-none"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  title={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                >
                  {showPassword ? 'إخفاء' : 'عرض'}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="text-gray-900 dark:text-white text-sm font-bold"
              >
                تأكيد كلمة المرور
              </label>
              <div className="flex items-center w-full mt-2 mb-6 relative" dir="rtl">
                <input
                  tabIndex={7}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="off"
                  aria-invalid={false}
                  maxLength={64}
                  className={`dark:text-black w-full border ${
                    confirmPasswordError ? 'border-red-500' : 'border-gray-200'
                  } bg-white focus:outline-none focus:${
                    confirmPasswordError
                      ? 'border-red-500'
                      : isConfirmFocused
                      ? 'border-[#aa7fff]'
                      : 'border-gray-200'
                  } focus:shadow-none px-4 py-3 rounded-lg h-12 transition-all duration-200 ${
                    isConfirmFocused && !confirmPasswordError ? 'ring ring-[#aa7fff]' : ''
                  }`}
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setIsConfirmFocused(true)}
                  onBlur={() => setIsConfirmFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('signup-btn')?.focus();
                    }
                  }}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-1 focus:outline-none text-gray-400 hover:text-[#aa7fff] text-xs font-bold select-none"
                  aria-label={showConfirm ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  title={showConfirm ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
                >
                  {showConfirm ? 'إخفاء' : 'عرض'}
                </button>
              </div>
            </div>

            <div className="text-right text-xs text-gray-600 dark:text-gray-300 mb-6 leading-6">
              بالتسجيل أقر بأني قرأت
              <a
                href="/terms-and-condition"
                target="_blank"
                className="text-[#aa7fff] underline mx-1"
              >
                شروط الاستخدام
              </a>
              و
              <a href="/privacy-policy" target="_blank" className="text-[#aa7fff] underline mx-1">
                سياسة الخصوصية
              </a>
              وأوافق عليها
            </div>

            <div className="text-right mt-4">
              <button
                id="signup-btn"
                tabIndex={8}
                className="bg-[#aa7fff] w-full h-14 pb-2 text-white rounded-lg cursor-pointer font-bold shadow transition-all duration-300 hover:bg-[#8469d4] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#aa7fff] dark:bg-[#443266] dark:hover:bg-[#aa7fff] dark:text-white disabled:opacity-60 disabled:cursor-not-allowed text-lg tracking-wide"
                type="submit"
                disabled={loading}
              >
                {loading ? '...جاري التسجيل' : 'إنشاء حساب'}
              </button>
            </div>

            <div className="text-center mt-3">
              <div dir="rtl">
                لديك حساب؟
                <a tabIndex={9} className="text-[#aa7fff] cursor-pointer" href="/login">
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

export default Signup;
