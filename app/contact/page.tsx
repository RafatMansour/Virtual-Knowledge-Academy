import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'تواصل معنا - أكاديمية المعرفة الإفتراضية',
};

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fcfcfc] dark:bg-[#382a55] transition-colors duration-300">
      <div className="flex-grow">
        <Header />
        <section className="bg-gradient-to-r from-[#7CB5EB] via-[#aa7fff] to-[#aa7fff] dark:from-[#3B3371] dark:via-[#443266] dark:to-[#443266] pt-28 sm:pt-36 pb-10">
          <div className="container mx-auto sm:max-w-[69rem] px-5">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md">تواصل معنا</h1>
            <p className="mt-3 text-white/90 text-base sm:text-xl">نحن هنا لمساعدتك في رحلة التعلم</p>
          </div>
        </section>
        
        <section className="container mx-auto sm:max-w-[69rem] px-5 py-10">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144]">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">معلومات التواصل</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#aa7fff] text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-1">البريد الإلكتروني</h3>
                      <p className="text-slate-600 dark:text-slate-200">info@academy.com</p>
                      <p className="text-slate-600 dark:text-slate-200">support@academy.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#aa7fff] text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-1">الهاتف</h3>
                      <p className="text-slate-600 dark:text-slate-200">+966-50-123-4567</p>
                      <p className="text-slate-600 dark:text-slate-200">+966-11-234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#aa7fff] text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-1">العنوان</h3>
                      <p className="text-slate-600 dark:text-slate-200">
                        شارع الملك فهد<br />
                        حي النزهة<br />
                        الرياض 12345<br />
                        المملكة العربية السعودية
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#aa7fff]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#aa7fff] text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-1">أوقات العمل</h3>
                      <p className="text-slate-600 dark:text-slate-200">الأحد - الخميس: 8:00 ص - 6:00 م</p>
                      <p className="text-slate-600 dark:text-slate-200">الجمعة - السبت: 10:00 ص - 4:00 م</p>
                      <p className="text-slate-600 dark:text-slate-200">التوقيت المحلي السعودي</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-gradient-to-br from-[#aa7fff]/10 to-[#7CB5EB]/10 rounded-2xl p-8 border border-[#aa7fff]/20">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">الدعم السريع</h2>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#443266] p-4 rounded-lg border border-slate-200 dark:border-[#2c2144]">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">الدعم التقني</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">
                      للمشاكل التقنية والاستفسارات حول المنصة
                    </p>
                    <a 
                      href="mailto:tech@academy.com" 
                      className="text-[#aa7fff] hover:text-[#8469d4] font-semibold text-sm"
                    >
                      tech@academy.com
                    </a>
                  </div>
                  
                  <div className="bg-white dark:bg-[#443266] p-4 rounded-lg border border-slate-200 dark:border-[#2c2144]">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">الدعم التعليمي</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">
                      للاستفسارات حول الدورات والمحتوى التعليمي
                    </p>
                    <a 
                      href="mailto:education@academy.com" 
                      className="text-[#aa7fff] hover:text-[#8469d4] font-semibold text-sm"
                    >
                      education@academy.com
                    </a>
                  </div>
                  
                  <div className="bg-white dark:bg-[#443266] p-4 rounded-lg border border-slate-200 dark:border-[#2c2144]">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">الشؤون التجارية</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">
                      للشراكات والتعاون التجاري
                    </p>
                    <a 
                      href="mailto:business@academy.com" 
                      className="text-[#aa7fff] hover:text-[#8469d4] font-semibold text-sm"
                    >
                      business@academy.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144]">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">أرسل لنا رسالة</h2>
              
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-slate-200 dark:border-[#2c2144] rounded-lg bg-white dark:bg-[#382a55] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:border-transparent"
                      placeholder="أدخل اسمك الأول"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">
                      الاسم الأخير
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-slate-200 dark:border-[#2c2144] rounded-lg bg-white dark:bg-[#382a55] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:border-transparent"
                      placeholder="أدخل اسمك الأخير"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-[#2c2144] rounded-lg bg-white dark:bg-[#382a55] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:border-transparent"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">
                    الموضوع
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-slate-200 dark:border-[#2c2144] rounded-lg bg-white dark:bg-[#382a55] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:border-transparent"
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="course">استفسار عن دورة</option>
                    <option value="payment">مشكلة في الدفع</option>
                    <option value="general">استفسار عام</option>
                    <option value="suggestion">اقتراح</option>
                    <option value="complaint">شكوى</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 dark:text-white mb-2">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-[#2c2144] rounded-lg bg-white dark:bg-[#382a55] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:border-transparent resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#aa7fff] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#8469d4] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#aa7fff] focus:ring-offset-2"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-12 bg-gradient-to-r from-[#aa7fff]/10 to-[#7CB5EB]/10 rounded-2xl p-8 border border-[#aa7fff]/20">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">تابعنا على وسائل التواصل الاجتماعي</h2>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-500 text-xl">📘</span>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">فيسبوك</h3>
                <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">تابع آخر الأخبار والتحديثات</p>
                <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold text-sm">@academy</a>
              </div>
              
              <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 text-xl">🐦</span>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">تويتر</h3>
                <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">نصائح تعليمية يومية</p>
                <a href="#" className="text-blue-400 hover:text-blue-500 font-semibold text-sm">@academy</a>
              </div>
              
              <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-pink-500 text-xl">📷</span>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">إنستغرام</h3>
                <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">محتوى مرئي تعليمي</p>
                <a href="#" className="text-pink-500 hover:text-pink-600 font-semibold text-sm">@academy</a>
              </div>
              
              <div className="bg-white dark:bg-[#443266] p-6 rounded-xl border border-slate-200 dark:border-[#2c2144] text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-xl">📺</span>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">يوتيوب</h3>
                <p className="text-slate-600 dark:text-slate-200 text-sm mb-3">فيديوهات تعليمية مجانية</p>
                <a href="#" className="text-red-500 hover:text-red-600 font-semibold text-sm">@academy</a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
