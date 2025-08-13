'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Enrollment = {
  id: string;
  course_id: string;
  courses?: { title?: string };
};

type Progress = {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
};

export default function DashboardClient() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [enrollmentsRes, progressRes] = await Promise.all([
          fetch('/api/enrollments'),
          fetch('/api/progress')
        ]);

        if (!enrollmentsRes.ok || !progressRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [enrollmentsData, progressData] = await Promise.all([
          enrollmentsRes.json(),
          progressRes.json()
        ]);

        setEnrollments(enrollmentsData.enrollments || []);
        setProgress(progressData.progress || []);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-600 dark:text-slate-200">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
        <div className="container mx-auto sm:max-w-[69rem] px-5">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">لوحة التحكم</h1>
          <p className="mt-3 text-white/90 text-base sm:text-xl">تابع تقدمك التعليمي وإنجازاتك</p>
        </div>
      </section>
      
      <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid gap-6 sm:grid-cols-3">
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-200">الدورات المسجلة</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{enrollments?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-xl flex items-center justify-center">
                  <span className="text-[#aa7fff] text-xl">📚</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-200">الدروس المكتملة</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{progress?.length || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-green-500 text-xl">✅</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-200">نسبة الإنجاز</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">
                    {enrollments?.length ? Math.round((progress?.length || 0) / (enrollments.length * 10) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-blue-500 text-xl">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">الدورات المسجلة</h2>
              <div className="space-y-4">
                {enrollments?.map((enrollment) => (
                  <div key={enrollment.id} className="border border-slate-200 dark:border-[#2c2144] rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white">
                          {(enrollment.courses as any)?.title || `دورة ${enrollment.course_id}`}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-200 mt-1">
                          انضم في {new Date().toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                      <Link 
                        href={`/courses/${enrollment.course_id}`}
                        className="bg-[#aa7fff] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#8469d4] transition-colors duration-300"
                      >
                        متابعة التعلم
                      </Link>
                    </div>
                  </div>
                ))}
                {!enrollments?.length && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-[#382a55] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-slate-400 text-2xl">📚</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-200 mb-4">لم تسجل في أي دورة بعد</p>
                    <Link 
                      href="/courses"
                      className="bg-[#aa7fff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8469d4] transition-colors duration-300 inline-block"
                    >
                      تصفح الدورات
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">إجراءات سريعة</h3>
              <div className="space-y-3">
                <Link 
                  href="/courses"
                  className="block w-full bg-[#aa7fff]/10 text-[#aa7fff] px-4 py-3 rounded-lg text-center font-semibold hover:bg-[#aa7fff] hover:text-white transition-colors duration-300"
                >
                  تصفح الدورات
                </Link>
                <Link 
                  href="/tracks"
                  className="block w-full bg-[#aa7fff]/10 text-[#aa7fff] px-4 py-3 rounded-lg text-center font-semibold hover:bg-[#aa7fff] hover:text-white transition-colors duration-300"
                >
                  استكشف المسارات
                </Link>
                <Link 
                  href="/content"
                  className="block w-full bg-[#aa7fff]/10 text-[#aa7fff] px-4 py-3 rounded-lg text-center font-semibold hover:bg-[#aa7fff] hover:text-white transition-colors duration-300"
                >
                  المحتوى التعليمي
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 rounded-2xl p-6 border border-[#aa7fff]/20">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">تسجيل الخروج</h3>
              <p className="text-sm text-slate-600 dark:text-slate-200 mb-4">
                انقر هنا لتسجيل الخروج من حسابك
              </p>
              <form action="/api/auth/logout" method="post">
                <button 
                  type="submit"
                  className="w-full bg-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
                >
                  تسجيل الخروج
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
