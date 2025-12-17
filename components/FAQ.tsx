import React, { useState } from 'react';
import { translations, Language } from '../utils/translations';

interface FAQProps {
  lang: Language;
}

const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const t = translations[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in h-full overflow-y-auto custom-scrollbar">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600">
          <i className="fa-solid fa-circle-question text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.faq_title}</h2>
        <p className="text-gray-500 max-w-xl mx-auto">{t.faq_subtitle}</p>
      </div>

      <div className="space-y-4">
        {t.faq_items.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-xl border transition-all duration-300 ${openIndex === index ? 'border-brand-500 shadow-md ring-1 ring-brand-100' : 'border-gray-200 hover:border-brand-200'}`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className={`font-semibold text-lg ${openIndex === index ? 'text-brand-700' : 'text-gray-800'}`}>
                {item.q}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-brand-100 text-brand-600 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </button>
            
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                    {item.a}
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
        <p className="text-gray-600 mb-4 font-medium">{lang === 'en' ? "Still have questions?" : "لا تزال لديك أسئلة؟"}</p>
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:text-brand-600 hover:border-brand-300 transition-colors shadow-sm">
           {lang === 'en' ? "Contact Support" : "تواصل مع الدعم"}
        </button>
      </div>
    </div>
  );
};

export default FAQ;