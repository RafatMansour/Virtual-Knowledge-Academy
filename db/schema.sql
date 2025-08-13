-- Users table
-- Enable pgcrypto for gen_random_uuid on vanilla Postgres
create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text unique not null,
  mobile text,
  username text unique not null,
  password_hash text not null,
  role text not null default 'student' check (role in ('student','instructor','admin')),
  created_at timestamptz not null default now()
);

-- Courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  level text check (level in ('foundation','advanced','workshop')),
  is_mandatory boolean not null default false,
  created_at timestamptz not null default now()
);

-- Lessons table
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  content_type text not null check (content_type in ('video','pdf','interactive')),
  content_url text not null,
  order_index int not null default 0,
  duration_minutes int,
  created_at timestamptz not null default now()
);
create index if not exists lessons_by_course_idx on public.lessons(course_id, order_index);

-- Enrollments table
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'active' check (status in ('active','completed','cancelled')),
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- Progress per lesson
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  is_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

-- Educational content per course (for articles/notes with embedded images)
create table if not exists public.educational_contents (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null default 'Educational Content',
  body_md text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (course_id)
);

