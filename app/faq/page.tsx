import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'الأسئلة الشائعة - أكاديمية المعرفة الإفتراضية',
};

const FAQPage: React.FC = () => {
  const faqs = [
    {
      category: 'التسجيل والحساب',
      questions: [
        {
          question: 'كيف يمكنني إنشاء حساب جديد؟',
          answer: 'يمكنك إنشاء حساب جديد من خلال الضغط على "إنشاء حساب" في أعلى الصفحة، ثم ملء النموذج بالمعلومات المطلوبة والتحقق من بريدك الإلكتروني.'
        },
        {
          question: 'نسيت كلمة المرور، ماذا أفعل؟',
          answer: 'يمكنك إعادة تعيين كلمة المرور من خلال الضغط على "نسيت كلمة المرور؟" في صفحة تسجيل الدخول، وسنرسل لك رابط إعادة التعيين عبر البريد الإلكتروني.'
        },
        {
          question: 'هل يمكنني تغيير اسم المستخدم؟',
          answer: 'نعم، يمكنك تغيير اسم المستخدم من خلال إعدادات الحساب في لوحة التحكم.'
        }
      ]
    },
    {
      category: 'الدورات والتعلم',
      questions: [
        {
          question: 'كيف يمكنني التسجيل في دورة؟',
          answer: 'يمكنك تصفح الدورات المتاحة في صفحة "الدورات"، ثم الضغط على الدورة المطلوبة والتسجيل فيها.'
        },
        {
          question: 'هل الدورات مجانية أم مدفوعة؟',
          answer: 'نقدم مزيجاً من الدورات المجانية والمدفوعة. يمكنك رؤية نوع كل دورة عند تصفحها.'
        },
        {
          question: 'كيف يمكنني تتبع تقدمي في الدورات؟',
          answer: 'يمكنك تتبع تقدمك من خلال لوحة التحكم، حيث ستجد إحصائيات مفصلة عن الدورات المسجلة والتقدم المحرز.'
        },
        {
          question: 'هل يمكنني إعادة مشاهدة الدروس؟',
          answer: 'نعم، يمكنك إعادة مشاهدة الدروس في أي وقت طالما أنك مسجل في الدورة.'
        }
      ]
    },
    {
      category: 'التقنية والدعم',
      questions: [
        {
          question: 'ما هي المتطلبات التقنية للمنصة؟',
          answer: 'تحتاج إلى متصفح حديث (Chrome, Firefox, Safari, Edge) واتصال بالإنترنت. المنصة تعمل على جميع الأجهزة.'
        },
        {
          question: 'هل يمكنني استخدام المنصة على الهاتف؟',
          answer: 'نعم، المنصة متوافقة تماماً مع الهواتف الذكية والأجهزة اللوحية.'
        },
        {
          question: 'كيف يمكنني الإبلاغ عن مشكلة تقنية؟',
          answer: 'يمكنك التواصل مع فريق الدعم التقني عبر صفحة "تواصل معنا" أو إرسال بريد إلكتروني إلى support@academy.com'
        }
      ]
    },
    {
      category: 'الدفع والاشتراكات',
      questions: [
        {
          question: 'ما هي طرق الدفع المتاحة؟',
          answer: 'نقبل جميع البطاقات الائتمانية الرئيسية والمدى والمدى فاست، بالإضافة إلى PayPal.'
        },
        {
          question: 'هل يمكنني إلغاء الاشتراك؟',
          answer: 'نعم، يمكنك إلغاء الاشتراك في أي وقت من إعدادات الحساب، وسيستمر الوصول حتى نهاية الفترة المدفوعة.'
        },
        {
          question: 'هل تقدمون استرداد الأموال؟',
          answer: 'نعم، نقدم استرداد الأموال خلال 30 يوماً من الشراء إذا لم تكن راضياً عن الخدمة.'
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
          <div className="container mx-auto sm:max-w-[69rem] px-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">الأسئلة الشائعة</h1>
            <p className="mt-3 text-white/90 text-base sm:text-xl">إجابات على أكثر الأسئلة شيوعاً حول منصتنا التعليمية</p>
          </div>
        </section>
        
        <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144]">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <span className="bg-gradient-to-r from-[#aa7fff] to-[#7CB5EB] bg-clip-text text-transparent">
                    {category.category}
                  </span>
                </h2>
                
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border border-slate-100 dark:border-[#2c2144] rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-start">
                        <span className="bg-[#aa7fff] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ml-3 flex-shrink-0">
                          {faqIndex + 1}
                        </span>
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-200 leading-relaxed mr-9">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-[#aa7fff]/10 to-[#7CB5EB]/10 rounded-2xl p-8 border border-[#aa7fff]/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                لم تجد إجابة لسؤالك؟
              </h2>
              <p className="text-slate-600 dark:text-slate-200 mb-6">
                فريق الدعم لدينا جاهز لمساعدتك في أي وقت
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="bg-[#aa7fff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8469d4] transition-colors duration-300"
                >
                  تواصل معنا
                </a>
                <a 
                  href="mailto:support@academy.com" 
                  className="border border-[#aa7fff] text-[#aa7fff] px-6 py-3 rounded-lg font-semibold hover:bg-[#aa7fff] hover:text-white transition-colors duration-300"
                >
                  إرسال بريد إلكتروني
                </a>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center">
              <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#aa7fff] text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">دورات متنوعة</h3>
              <p className="text-slate-600 dark:text-slate-200 text-sm">
                أكثر من 100 دورة في مجالات تقنية مختلفة
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center">
              <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#aa7fff] text-xl">🎯</span>
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">تعلم مرن</h3>
              <p className="text-slate-600 dark:text-slate-200 text-sm">
                تعلم في أي وقت ومن أي مكان يناسبك
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center">
              <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#aa7fff] text-xl">💬</span>
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">دعم متواصل</h3>
              <p className="text-slate-600 dark:text-slate-200 text-sm">
                فريق دعم متخصص لمساعدتك على مدار الساعة
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default FAQPage;
