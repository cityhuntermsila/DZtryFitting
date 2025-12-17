import React from 'react';
import { translations, Language } from '../utils/translations';
import { ViewState } from '../types';

interface AboutUsProps {
  lang: Language;
  setView: (view: ViewState) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ lang, setView }) => {
  const t = translations[lang];

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in h-full overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about_title}</h2>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">{t.about_subtitle}</p>
      </div>

      {/* Founder Story */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 relative">
             <div className="aspect-square rounded-2xl overflow-hidden shadow-lg transform md:rotate-3 transition-transform hover:rotate-0 duration-500">
                <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop" 
                    alt="Founder working" 
                    className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-100 rounded-full flex items-center justify-center -z-10">
                <i className="fa-solid fa-quote-right text-4xl text-brand-300"></i>
             </div>
        </div>
        <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-sm">
                    <i className="fa-solid fa-lightbulb"></i>
                </span>
                {t.founder_title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {t.founder_text}
            </p>
        </div>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-white shadow-xl">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                 <i className="fa-solid fa-crosshairs text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.mission_title}</h3>
              <p className="text-gray-300 leading-relaxed">
                  {t.mission_text}
              </p>
          </div>
          <div className="bg-gradient-to-br from-brand-600 to-accent-600 rounded-3xl p-10 text-white shadow-xl">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                 <i className="fa-solid fa-eye text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.vision_title}</h3>
              <p className="text-white/90 leading-relaxed">
                  {t.vision_text}
              </p>
          </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
          <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-900">{t.team_title}</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
              {t.team_members.map((member, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all group w-40 md:w-48 lg:w-52">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform">
                          <img 
                            src={`https://picsum.photos/seed/${idx + 55}/200/200`} 
                            alt={member.name} 
                            className="w-full h-full object-cover" 
                          />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-1">{member.name}</h4>
                      <p className="text-xs text-brand-600 font-medium uppercase tracking-wide">{member.role}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Join Us CTA */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500"></div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.join_title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
              {t.join_text}
          </p>
          <button 
            onClick={() => setView(ViewState.CONTACT)}
            className="inline-block px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
              {t.join_btn} <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
          </button>
      </div>

    </div>
  );
};

export default AboutUs;