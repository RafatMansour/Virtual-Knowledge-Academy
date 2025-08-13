import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Protected from '@/components/Protected';
import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'لوحة التحكم - أكاديمية المعرفة الإفتراضية',
};

export default function DashboardPage() {
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <Protected>
          <DashboardClient />
        </Protected>
        <Footer />
      </div>
    </div>
  )
}
