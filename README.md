# منصة تعليمية - إعداد تسجيل الدخول/إنشاء الحساب

هذا المشروع يستخدم Next.js (App Router) مع واجهات تسجيل الدخول والتسجيل وجاهز للعمل مع Supabase/Postgres.

## المتطلبات
- Node.js 18+
- حساب Supabase (يوصى به)

## المتغيرات البيئية
انسخ القيم التالية إلى `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_ACCESS_SECRET=replace-with-strong-access-secret
JWT_REFRESH_SECRET=replace-with-strong-refresh-secret
```
في بيئة التطوير تضبط ملفات تعريف الارتباط تلقائياً على `secure: false`.

## تهيئة قاعدة البيانات
1. افتح لوح SQL في Supabase
2. الصق محتوى `db/schema.sql` وشغّله (يتضمن `create extension if not exists pgcrypto;`).

## التشغيل المحلي
```
npm install
npm run dev
```
الصفحات:
- تسجيل الدخول: `/login`
- إنشاء حساب: `/signup`
- لوحة التحكم (محمي): `/dashboard`

## واجهات API
- POST `/api/auth/signup` — `{ firstName, lastName, email, mobile, username, password }`
- POST `/api/auth/login` — `{ usernameOrEmail, password }`
- POST `/api/auth/logout`
- POST `/api/auth/refresh` — `{ refresh }`

## النشر
انشر على Vercel وأضف نفس المتغيرات البيئية في إعدادات المشروع.
