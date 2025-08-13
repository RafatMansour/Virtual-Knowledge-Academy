import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'سياسة الخصوصية - أكاديمية المعرفة الإفتراضية',
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
          <div className="container mx-auto sm:max-w-[69rem] px-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">سياسة الخصوصية</h1>
            <p className="mt-3 text-white/90 text-base sm:text-xl">نحن نحمي خصوصيتك ونلتزم بحماية بياناتك الشخصية</p>
          </div>
        </section>
        
        <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">مقدمة</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
                  نحن في أكاديمية المعرفة الإفتراضية نلتزم بحماية خصوصيتك وبياناتك الشخصية. 
                  تشرح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا عند استخدام منصتنا التعليمية.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">المعلومات التي نجمعها</h2>
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">المعلومات الشخصية</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>الاسم الأول والأخير</li>
                      <li>عنوان البريد الإلكتروني</li>
                      <li>رقم الهاتف</li>
                      <li>اسم المستخدم</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">معلومات الاستخدام</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>الدورات المسجلة والتقدم فيها</li>
                      <li>وقت الاستخدام والتفاعل مع المحتوى</li>
                      <li>البيانات التقنية (نوع المتصفح، نظام التشغيل)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">كيفية استخدام المعلومات</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 p-4 rounded-lg border border-[#aa7fff]/20">
                    <h3 className="text-lg font-semibold text-[#aa7fff] mb-2">تقديم الخدمات</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      لتسجيلك في الدورات وتتبع تقدمك التعليمي
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 p-4 rounded-lg border border-[#aa7fff]/20">
                    <h3 className="text-lg font-semibold text-[#aa7fff] mb-2">تحسين المنصة</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      لتحسين تجربة المستخدم وتطوير المحتوى التعليمي
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 p-4 rounded-lg border border-[#aa7fff]/20">
                    <h3 className="text-lg font-semibold text-[#aa7fff] mb-2">التواصل</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      لإرسال إشعارات مهمة وتحديثات حول الدورات
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 p-4 rounded-lg border border-[#aa7fff]/20">
                    <h3 className="text-lg font-semibold text-[#aa7fff] mb-2">الأمان</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      لحماية حسابك ومنع الاستخدام غير المصرح به
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">حماية البيانات</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                  نستخدم تقنيات تشفير متقدمة لحماية بياناتك الشخصية. 
                  جميع البيانات يتم نقلها وتخزينها بشكل آمن وفقاً لأعلى معايير الأمان.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">إجراءات الأمان</h3>
                  <ul className="text-green-700 dark:text-green-300 space-y-1 list-disc list-inside">
                    <li>تشفير البيانات أثناء النقل والتخزين</li>
                    <li>مراقبة مستمرة للأنظمة</li>
                    <li>نسخ احتياطية منتظمة</li>
                    <li>تحديثات أمنية دورية</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">حقوقك</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الوصول والتصحيح</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      يمكنك الوصول لبياناتك وتحديثها في أي وقت
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الحذف</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      يمكنك طلب حذف بياناتك الشخصية
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الاعتراض</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      يمكنك الاعتراض على معالجة بياناتك
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الانتقالية</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm">
                      يمكنك طلب نسخة من بياناتك بتنسيق قابل للقراءة
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">التواصل معنا</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
                  إذا كان لديك أي أسئلة حول سياسة الخصوصية أو تريد ممارسة حقوقك، 
                  يمكنك التواصل معنا عبر:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-slate-600 dark:text-slate-200">
                    <span className="font-semibold">البريد الإلكتروني:</span> privacy@academy.com
                  </p>
                  <p className="text-slate-600 dark:text-slate-200">
                    <span className="font-semibold">الهاتف:</span> +966-50-123-4567
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">آخر تحديث</h3>
                <p className="text-blue-700 dark:text-blue-300">
                  تم آخر تحديث لهذه السياسة في 1 يناير 2025. 
                  قد نقوم بتحديث هذه السياسة من وقت لآخر، وسنقوم بإشعارك بأي تغييرات جوهرية.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
