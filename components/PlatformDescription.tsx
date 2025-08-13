'use client';

import React from 'react';

const PlatformDescription: React.FC = () => {
  const features = [
    {
      icon: '📚',
      title: 'دورات متنوعة',
      description: 'أكثر من 100 دورة في مجالات تقنية مختلفة تشمل البرمجة، التصميم، التسويق الرقمي، وأكثر'
    },
    {
      icon: '🎯',
      title: 'تعلم مرن',
      description: 'تعلم في أي وقت ومن أي مكان يناسبك مع إمكانية الوصول للمحتوى على جميع الأجهزة'
    },
    {
      icon: '🏆',
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات إتمام معتمدة لكل دورة تكملها لتعزيز سيرتك الذاتية'
    },
    {
      icon: '👥',
      title: 'مجتمع تفاعلي',
      description: 'انضم لمجتمع من المتعلمين والمحترفين وشارك في المناقشات والمشاريع'
    },
    {
      icon: '📱',
      title: 'تطبيق موبايل',
      description: 'استمتع بتجربة تعليمية سلسة عبر تطبيقنا المخصص للهواتف الذكية'
    },
    {
      icon: '💬',
      title: 'دعم متواصل',
      description: 'فريق دعم متخصص لمساعدتك في رحلة التعلم على مدار الساعة'
    }
  ];

  return (
    <section className="container mx-auto sm:max-w-[69rem] px-5 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-6">
          لماذا تختار أكاديمية المعرفة الإفتراضية؟
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-200 max-w-3xl mx-auto">
          منصة تعليمية متطورة تجمع بين التكنولوجيا الحديثة والمحتوى التعليمي عالي الجودة 
          لمساعدتك في تحقيق أهدافك المهنية والشخصية
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-[#443266] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-[#2c2144] hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#aa7fff]/20 to-[#7CB5EB]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">{feature.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-200 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-[#aa7fff]/10 to-[#7CB5EB]/10 rounded-2xl p-8 border border-[#aa7fff]/20">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            ابدأ رحلة التعلم اليوم
          </h3>
          <p className="text-slate-600 dark:text-slate-200 mb-6">
            انضم لأكثر من 10,000 متعلم يثقون بنا في تطوير مهاراتهم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="bg-[#aa7fff] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8469d4] transition-colors duration-300 inline-block text-center"
            >
              إنشاء حساب مجاني
            </a>
            <a 
              href="/login" 
              className="border border-[#aa7fff] text-[#aa7fff] px-8 py-3 rounded-lg font-semibold hover:bg-[#aa7fff] hover:text-white transition-colors duration-300 inline-block text-center"
            >
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformDescription;
