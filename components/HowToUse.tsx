import React from 'react';
import { translations, Language } from '../utils/translations';

interface HowToUseProps {
  lang: Language;
}

const HowToUse: React.FC<HowToUseProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-in h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent-600 shadow-sm">
          <i className="fa-solid fa-book-open text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.how_title}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t.how_subtitle}</p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

        {t.how_steps.map((step, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative group">
            
            {/* Step Number Badge */}
            <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-50 text-brand-600 font-bold flex items-center justify-center text-lg shadow-sm mb-4 mx-auto relative z-10 group-hover:border-brand-100 group-hover:bg-brand-50 transition-colors">
              {index + 1}
            </div>

            <div className="text-center">
              <div className="mb-4 text-gray-400 group-hover:text-brand-500 transition-colors">
                 <i className={`fa-solid ${step.icon} text-4xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Guide / Tip Section */}
      <div className="bg-gradient-to-r from-brand-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">
             {lang === 'en' ? "Ready to transform your style?" : "مستعد لتحويل أسلوبك؟"}
          </h3>
          <p className="opacity-90 mb-6 text-lg">
             {lang === 'en' 
                ? "Start your first virtual try-on session now and explore endless fashion possibilities without leaving your home."
                : "ابدأ جلسة القياس الافتراضي الأولى الآن واستكشف إمكانيات الموضة اللانهائية دون مغادرة منزلك."}
          </p>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fa-solid fa-bolt text-yellow-300"></i>
                <span className="font-medium">{lang === 'en' ? "Fast Generation" : "توليد سريع"}</span>
             </div>
             <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <i className="fa-solid fa-star text-yellow-300"></i>
                <span className="font-medium">{lang === 'en' ? "HD Quality" : "جودة عالية"}</span>
             </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md animate-pulse">
                <i className="fa-solid fa-shirt text-5xl text-white"></i>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;