import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Protected from '@/components/Protected';

export const metadata = {
  title: 'الورشات - أكاديمية المعرفة الإفتراضية',
};

const WorkshopsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <Protected>
          <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
            <div className="container mx-auto sm:max-w-[69rem] px-5">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">الورشات</h1>
              <p className="mt-3 text-white/90 text-base sm:text-xl">ورش عمل تطبيقية لاحتراف المهارات الرقمية.</p>
            </div>
          </section>
          <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
            <p className="text-slate-700 dark:text-slate-100">قريباً...</p>
          </section>
        </Protected>
        <Footer />
      </div>
    </div>
  );
};

export default WorkshopsPage;


