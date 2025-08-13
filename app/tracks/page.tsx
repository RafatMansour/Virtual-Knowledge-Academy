import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import TracksClient from './TracksClient';
import type { Track, Level, Media } from '@/types/tracks';
import Protected from '@/components/Protected'

export const metadata = {
  title: 'المسارات - أكاديمية المعرفة الإفتراضية',
};

type DbLevel = Omit<Level, 'media'> & { media: unknown[] | null };
type DbTrack = Omit<Track, 'levels'> & { levels?: DbLevel[] };

async function fetchTracksWithLevels(): Promise<Track[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('tracks')
    .select('id, name, description, created_at, levels(id, name, description, order_num, media)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to fetch tracks:', error.message);
    return [];
  }
  const tracks: Track[] = (data as DbTrack[] | null || []).map((t) => {
    const normalizedLevels: Level[] = (t.levels || []).map((lvl) => ({
      id: lvl.id,
      name: lvl.name,
      description: lvl.description,
      order_num: lvl.order_num,
      media: Array.isArray(lvl.media)
        ? (lvl.media as unknown[]).map((m: any): Media => ({
            url: String(m?.url || ''),
            type: m?.type ? String(m.type) : undefined,
            title: m?.title ? String(m.title) : undefined,
          }))
        : null,
    }));
    normalizedLevels.sort((a, b) => (a.order_num ?? Number.MAX_SAFE_INTEGER) - (b.order_num ?? Number.MAX_SAFE_INTEGER));
    return {
      id: t.id,
      name: t.name,
      description: t.description,
      created_at: t.created_at,
      levels: normalizedLevels,
    };
  });
  return tracks;
}

export default async function TracksPage() {
  const tracks = await fetchTracksWithLevels();
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
          <div className="container mx-auto sm:max-w-[69rem] px-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">المسارات</h1>
            <p className="mt-3 text-white/90 text-base sm:text-xl">ابدأ مسارك التعليمي خطوة بخطوة.</p>
          </div>
        </section>
        <Protected>
          <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
            <TracksClient tracks={tracks} />
          </section>
        </Protected>
        <Footer />
      </div>
    </div>
  );
}



