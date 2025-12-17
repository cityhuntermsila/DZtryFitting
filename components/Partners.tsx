import React from 'react';
import { translations, Language } from '../utils/translations';
import { ViewState } from '../types';

interface PartnersProps {
  lang: Language;
  setView: (view: ViewState) => void;
}

const Partners: React.FC<PartnersProps> = ({ lang, setView }) => {
  const t = translations[lang];

  // Extended Partner Data with contact info
  const partnersList = [
    { 
      name: "Maison du Caftan", 
      icon: "fa-gem", 
      spec: t.p_maison_spec, 
      desc: t.p_maison_desc,
      phone: "+213 21 45 67 89",
      email: "contact@maisoncaftan.dz",
      address: "Hydra, Algiers, Algeria",
      website: "www.maisoncaftan.dz"
    },
    { 
      name: "Mode Elle", 
      icon: "fa-crown", 
      spec: t.p_mode_spec, 
      desc: t.p_mode_desc,
      phone: "+213 550 12 34 56",
      email: "info@modeelle.dz",
      address: "Sidi Yahia, Algiers, Algeria",
      website: "www.modeelle.dz"
    },
    { 
      name: "Urban DZ", 
      icon: "fa-city", 
      spec: t.p_urban_spec, 
      desc: t.p_urban_desc,
      phone: "+213 770 98 76 54",
      email: "sales@urbandz.com",
      address: "Didouche Mourad, Algiers, Algeria",
      website: "www.urbandz.com"
    },
    { 
      name: "Heritage Style", 
      icon: "fa-feather", 
      spec: t.p_heritage_spec, 
      desc: t.p_heritage_desc,
      phone: "+213 23 45 67 12",
      email: "heritage@style.dz",
      address: "Tlemcen City Center, Tlemcen, Algeria",
      website: "www.heritagestyle.dz"
    },
    { 
      name: "Sahara Chic", 
      icon: "fa-sun", 
      spec: t.p_sahara_spec, 
      desc: t.p_sahara_desc,
      phone: "+213 661 22 33 44",
      email: "hello@saharachic.dz",
      address: "Ghardaia, Algeria",
      website: "www.saharachic.dz"
    },
    { 
      name: "Algiers Fashion", 
      icon: "fa-star", 
      spec: t.p_algiers_spec, 
      desc: t.p_algiers_desc,
      phone: "+213 555 88 99 00",
      email: "pr@algiersfashion.dz",
      address: "Oran, Algeria",
      website: "www.algiersfashion.dz"
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in h-full overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
           <i className="fa-solid fa-handshake text-3xl"></i>
        </div>
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">{t.partners_page_title}</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t.partners_page_subtitle}</p>
      </div>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {partnersList.map((p, i) => (
             <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
                {/* Card Header (Logo & Name) */}
                <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-600 border border-gray-100 shadow-sm group-hover:text-brand-600 group-hover:border-brand-200 transition-colors">
                        <i className={`fa-solid ${p.icon} text-2xl`}></i>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1 block">{p.spec}</span>
                        <h3 className="font-serif text-xl font-bold text-gray-900">{p.name}</h3>
                    </div>
                </div>

                {/* Description */}
                <div className="p-6 flex-1">
                    <p className="text-gray-600 leading-relaxed text-sm mb-6 min-h-[60px]">
                        {p.desc}
                    </p>
                    
                    {/* Contact Info */}
                    <div className="space-y-3 border-t border-gray-100 pt-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{t.partners_contact_info}</h4>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                                <i className="fa-solid fa-phone text-xs"></i>
                            </div>
                            <span className="font-medium">{p.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                                <i className="fa-solid fa-envelope text-xs"></i>
                            </div>
                            <span className="truncate">{p.email}</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                                <i className="fa-solid fa-location-dot text-xs"></i>
                            </div>
                            <span>{p.address}</span>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <div className="flex gap-2">
                        <a href="#" className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-600 hover:border-brand-200 transition-colors">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="#" className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-600 hover:border-brand-200 transition-colors">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-600 hover:border-brand-200 transition-colors">
                            <i className="fa-solid fa-globe"></i>
                        </a>
                    </div>
                    <button 
                        onClick={() => setView(ViewState.MY_LOOKS)}
                        className="px-4 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-wide rounded hover:bg-brand-600 transition-colors shadow-lg"
                    >
                        {t.partners_view_collection}
                    </button>
                </div>
             </div>
          ))}
      </div>
    </div>
  );
};

export default Partners;