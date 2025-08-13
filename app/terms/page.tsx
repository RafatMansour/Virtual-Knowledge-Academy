import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'الأحكام والشروط - أكاديمية المعرفة الإفتراضية',
};

const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
          <div className="container mx-auto sm:max-w-[69rem] px-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">الأحكام والشروط</h1>
            <p className="mt-3 text-white/90 text-base sm:text-xl">الشروط والأحكام التي تحكم استخدام منصتنا التعليمية</p>
          </div>
        </section>
        
        <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">1. القبول بالأحكام</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
                  باستخدام منصة أكاديمية المعرفة الإفتراضية، فإنك توافق على الالتزام بهذه الأحكام والشروط. 
                  إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">2. وصف الخدمة</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                  تقدم أكاديمية المعرفة الإفتراضية منصة تعليمية إلكترونية تتيح للمستخدمين:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الدورات التعليمية</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>دورات في مجالات تقنية متنوعة</li>
                      <li>محتوى تعليمي عالي الجودة</li>
                      <li>شهادات إتمام الدورات</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الخدمات التفاعلية</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>تتبع التقدم التعليمي</li>
                      <li>منتديات النقاش</li>
                      <li>الدعم الفني</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">3. تسجيل الحساب</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 p-4 rounded-lg border border-[#aa7fff]/20">
                    <h3 className="text-lg font-semibold text-[#aa7fff] mb-2">متطلبات التسجيل</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>يجب أن تكون عمرك 13 عاماً أو أكثر</li>
                      <li>تقديم معلومات دقيقة وكاملة</li>
                      <li>الحفاظ على سرية بيانات الحساب</li>
                      <li>إخطارنا فوراً بأي استخدام غير مصرح به</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 p-4 rounded-lg border border-[#aa7fff]/20">
                    <h3 className="text-lg font-semibold text-[#aa7fff] mb-2">مسؤوليات المستخدم</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>استخدام المنصة لأغراض تعليمية مشروعة فقط</li>
                      <li>عدم مشاركة المحتوى مع أطراف ثالثة</li>
                      <li>احترام حقوق الملكية الفكرية</li>
                      <li>عدم إساءة استخدام المنصة</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">4. الدفع والاشتراكات</h2>
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الأسعار والدفع</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة</li>
                      <li>الدفع مقدم قبل الوصول للمحتوى المدفوع</li>
                      <li>نحتفظ بالحق في تغيير الأسعار مع إشعار مسبق</li>
                      <li>جميع المدفوعات نهائية وغير قابلة للاسترداد إلا في حالات محددة</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">الاشتراكات</h3>
                    <ul className="text-slate-600 dark:text-slate-200 space-y-1 list-disc list-inside">
                      <li>الاشتراكات تتجدد تلقائياً ما لم يتم إلغاؤها</li>
                      <li>يمكن إلغاء الاشتراك في أي وقت</li>
                      <li>لا يتم استرداد المبالغ المدفوعة للفترة الحالية</li>
                      <li>الوصول للمحتوى يستمر حتى نهاية الفترة المدفوعة</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">5. الملكية الفكرية</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                  جميع المحتويات التعليمية والمواد المقدمة على المنصة محمية بموجب حقوق الملكية الفكرية.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">ممنوع</h3>
                    <ul className="text-red-700 dark:text-red-300 space-y-1 list-disc list-inside text-sm">
                      <li>نسخ أو توزيع المحتوى</li>
                      <li>إعادة إنتاج المواد التعليمية</li>
                      <li>استخدام المحتوى لأغراض تجارية</li>
                      <li>إزالة علامات الملكية الفكرية</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">مسموح</h3>
                    <ul className="text-green-700 dark:text-green-300 space-y-1 list-disc list-inside text-sm">
                      <li>الاستخدام الشخصي للتعلم</li>
                      <li>الوصول للمحتوى عبر المنصة</li>
                      <li>المشاركة في المناقشات التعليمية</li>
                      <li>استخدام الشهادات الممنوحة</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">6. الخصوصية والأمان</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                  نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية. راجع سياسة الخصوصية للحصول على تفاصيل كاملة.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">إجراءات الأمان</h3>
                  <ul className="text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                    <li>تشفير جميع البيانات الحساسة</li>
                    <li>مراقبة مستمرة للأنظمة</li>
                    <li>تحديثات أمنية دورية</li>
                    <li>نسخ احتياطية منتظمة</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">7. إيقاف الحساب</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                  نحتفظ بالحق في إيقاف أو حذف الحسابات التي تنتهك هذه الشروط.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">أسباب الإيقاف</h3>
                  <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
                    <li>انتهاك حقوق الملكية الفكرية</li>
                    <li>إساءة استخدام المنصة</li>
                    <li>مشاركة بيانات الحساب مع آخرين</li>
                    <li>سلوك غير لائق في المناقشات</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">8. التعديلات</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار في المنصة.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">9. التواصل</h2>
                <p className="text-slate-600 dark:text-slate-200 leading-relaxed mb-4">
                  إذا كان لديك أي أسئلة حول هذه الشروط، يمكنك التواصل معنا:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">معلومات التواصل</h3>
                    <div className="space-y-2 text-slate-600 dark:text-slate-200">
                      <p><span className="font-semibold">البريد الإلكتروني:</span> legal@academy.com</p>
                      <p><span className="font-semibold">الهاتف:</span> +966-50-123-4567</p>
                      <p><span className="font-semibold">العنوان:</span> الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-[#382a55] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">أوقات العمل</h3>
                    <div className="space-y-2 text-slate-600 dark:text-slate-200">
                      <p>الأحد - الخميس: 8:00 ص - 6:00 م</p>
                      <p>الجمعة - السبت: 10:00 ص - 4:00 م</p>
                      <p>التوقيت المحلي السعودي</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">آخر تحديث</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  تم آخر تحديث لهذه الشروط في 1 يناير 2025. 
                  يرجى مراجعة هذه الصفحة بانتظام للاطلاع على أي تحديثات.
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

export default TermsPage;
