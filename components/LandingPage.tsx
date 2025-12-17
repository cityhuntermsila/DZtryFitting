import React from 'react';
import { ViewState, GarmentDetails } from '../types';
import { translations, Language } from '../utils/translations';

interface LandingPageProps {
  setView: (view: ViewState) => void;
  lang: Language;
  onTryOn?: (garment: GarmentDetails) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setView, lang, onTryOn }) => {
  const t = translations[lang];

  // Mock Products for the grid with full GarmentDetails compatibility
  const trendingItems = [
    { 
      id: 1, 
      name: "Karakou Royal", 
      price: "45,000 DA", 
      img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop",
      description: "A luxurious traditional Algerian Karakou featuring hand-stitched gold embroidery on deep royal velvet.",
      color: "Burgundy"
    },
    { 
      id: 2, 
      name: "Kabyle Modern", 
      price: "22,000 DA", 
      img: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=600&auto=format&fit=crop",
      description: "A contemporary twist on the traditional Berber dress, featuring vibrant silk and authentic geometric patterns.",
      color: "Yellow/Orange"
    },
    { 
      id: 3, 
      name: "Soirée Velvet", 
      price: "32,000 DA", 
      img: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=600&auto=format&fit=crop",
      description: "A sleek, floor-length velvet evening gown designed for sophisticated elegance and comfort.",
      color: "Deep Red"
    },
    { 
      id: 4, 
      name: "Summer Breeze", 
      price: "8,500 DA", 
      img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
      description: "A lightweight, breathable floral maxi dress perfect for Mediterranean summer afternoons.",
      color: "Floral White"
    },
    { 
      id: 5, 
      name: "Sahara Night", 
      price: "15,000 DA", 
      img: "https://images.unsplash.com/photo-1548454833-252c8065d644?q=80&w=600&auto=format&fit=crop",
      description: "Organic cotton tunic inspired by the desert landscape, featuring minimal embroidery and earthy tones.",
      color: "Beige"
    },
    { 
      id: 6, 
      name: "Algiers Street", 
      price: "10,000 DA", 
      img: "https://images.unsplash.com/photo-1550614000-4b9519e0037a?q=80&w=600&auto=format&fit=crop",
      description: "A bold denim streetwear piece that combines Algerian urban culture with modern silhouettes.",
      color: "Blue"
    },
  ];

  // Partners List with Dynamic Data Keys
  const partners = [
    { name: "Maison du Caftan", icon: "fa-gem", spec: t.p_maison_spec, desc: t.p_maison_desc },
    { name: "Mode Elle", icon: "fa-crown", spec: t.p_mode_spec, desc: t.p_mode_desc },
    { name: "Urban DZ", icon: "fa-city", spec: t.p_urban_spec, desc: t.p_urban_desc },
    { name: "Heritage Style", icon: "fa-feather", spec: t.p_heritage_spec, desc: t.p_heritage_desc },
    { name: "Sahara Chic", icon: "fa-sun", spec: t.p_sahara_spec, desc: t.p_sahara_desc },
    { name: "Algiers Fashion", icon: "fa-star", spec: t.p_algiers_spec, desc: t.p_algiers_desc },
  ];

  const handleStartFitting = (item: typeof trendingItems[0]) => {
    if (onTryOn) {
      onTryOn({
        name: item.name,
        description: item.description,
        imageUrl: item.img,
        color: item.color
      });
    } else {
      setView(ViewState.STYLE_STUDIO);
    }
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-white">
      
      {/* --- TOP TICKER --- */}
      <div className="bg-brand-900 text-white text-[10px] md:text-xs py-2 text-center font-medium tracking-widest uppercase">
        {t.land_trust_1} • {t.land_trust_2} • {t.land_trust_3}
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 max-w-5xl mx-auto">
           <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-4 animate-fade-in border border-white/30 px-4 py-1.5 rounded-full">
             {t.land_hero_badge}
           </span>
           <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium mb-6 leading-tight animate-slide-up">
             {t.land_hero_title_1} <br/> <span className="italic text-brand-200">{t.land_hero_title_highlight}</span>
           </h1>
           <p className="text-gray-200 text-lg max-w-xl mb-10 font-light leading-relaxed animate-slide-up delay-100">
             {t.land_hero_subtitle}
           </p>
           <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
             <button 
               onClick={() => setView(ViewState.STYLE_STUDIO)}
               className="bg-white text-brand-900 px-10 py-4 font-serif font-bold text-lg hover:bg-brand-50 transition-colors shadow-lg"
             >
               {t.land_cta_primary}
             </button>
             <button 
               onClick={() => setView(ViewState.MY_LOOKS)}
               className="border border-white text-white px-10 py-4 font-serif font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
             >
               {t.land_cta_secondary}
             </button>
           </div>
        </div>
      </div>

      {/* --- TRENDING GRID (Product Style) --- */}
      <div className="py-20 bg-accent-50">
         <div className="max-w-[1600px] mx-auto px-6">
             <div className="flex justify-between items-end mb-12">
                 <div>
                    <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-2">{t.land_trending_title}</h2>
                    <p className="text-gray-500">{t.land_trending_subtitle}</p>
                 </div>
                 <button onClick={() => setView(ViewState.MY_LOOKS)} className="hidden md:block text-brand-700 font-bold border-b border-brand-700 pb-1 hover:text-brand-900 transition-colors">
                    {t.land_culture_btn}
                 </button>
             </div>

             <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8">
                 {trendingItems.map((item) => (
                    <div key={item.id} className="group">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-3">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <button 
                                  onClick={() => handleStartFitting(item)}
                                  className="w-full bg-white/90 backdrop-blur text-brand-900 py-2 font-bold text-xs uppercase tracking-wide hover:bg-brand-900 hover:text-white transition-colors shadow-lg"
                                >
                                    {t.land_cta_primary}
                                </button>
                            </div>
                            <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-brand-900 hover:bg-brand-600 hover:text-white transition-colors cursor-pointer shadow-sm">
                                <i className="fa-regular fa-heart text-xs"></i>
                            </div>
                        </div>
                        <h3 className="font-serif text-sm font-bold text-gray-900 group-hover:text-brand-700 transition-colors cursor-pointer truncate">{item.name}</h3>
                        <p className="text-xs font-medium text-gray-500">{item.price}</p>
                    </div>
                 ))}
             </div>
             
             <div className="mt-12 text-center md:hidden">
                <button onClick={() => setView(ViewState.MY_LOOKS)} className="text-brand-700 font-bold border-b border-brand-700 pb-1">
                    {t.land_culture_btn}
                </button>
             </div>
         </div>
      </div>

      {/* --- PARTNERS SECTION (Enhanced) --- */}
      <div className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="font-serif text-3xl text-gray-900 mb-3">{t.land_partners_title}</h2>
              <p className="text-gray-500 text-sm md:text-base mb-16 tracking-wide max-w-2xl mx-auto">{t.land_partners_subtitle}</p>
              
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12">
                  {partners.map((p, i) => (
                      <div key={i} className="relative group">
                          {/* Logo Container */}
                          <div className="flex flex-col items-center gap-3 cursor-pointer p-4 transition-all duration-300 group-hover:opacity-100 opacity-60 grayscale group-hover:grayscale-0">
                              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors border border-gray-100 group-hover:border-brand-200">
                                <i className={`fa-solid ${p.icon} text-2xl`}></i>
                              </div>
                              <span className="font-serif font-bold text-lg text-gray-800 group-hover:text-brand-900 tracking-tight">{p.name}</span>
                          </div>

                          {/* Hover Card (Tooltip Style) */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20 text-left">
                              <div className="flex items-center gap-2 mb-2">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-2 py-1 rounded-md">
                                    {p.spec}
                                  </span>
                              </div>
                              <h4 className="font-serif font-bold text-gray-900 text-lg mb-1">{p.name}</h4>
                              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                {p.desc}
                              </p>
                              <button 
                                onClick={() => setView(ViewState.PARTNERS)}
                                className="w-full py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-wide hover:bg-brand-600 transition-colors rounded"
                              >
                                {t.p_visit}
                              </button>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45 -mt-2"></div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* --- HOW IT WORKS (Minimal) --- */}
      <div className="py-24 bg-gray-50">
         <div className="max-w-4xl mx-auto px-6 text-center">
             <span className="text-brand-600 uppercase tracking-widest text-xs font-bold mb-4 block">{t.how_title}</span>
             <h2 className="font-serif text-4xl text-gray-900 mb-16">{t.land_how_subtitle}</h2>
             
             <div className="grid md:grid-cols-3 gap-12">
                 {t.how_steps.slice(0, 3).map((step, i) => (
                    <div key={i} className="flex flex-col items-center group">
                        <div className="text-5xl text-gray-300 font-serif font-bold mb-6 relative group-hover:text-brand-200 transition-colors">
                            0{i + 1}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl text-brand-600 bg-white rounded-full p-2">
                                <i className={`fa-solid ${step.icon}`}></i>
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                 ))}
             </div>
         </div>
      </div>

      {/* --- HERITAGE BANNER --- */}
      <div className="relative py-32 px-6 bg-brand-900 overflow-hidden mb-0">
          <img 
            src="https://images.unsplash.com/photo-1548454833-252c8065d644?q=80&w=2000&auto=format&fit=crop" 
            alt="Heritage" 
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative max-w-3xl mx-auto text-center text-white">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">{t.land_culture_title}</h2>
              <p className="text-lg md:text-xl text-white/80 font-light mb-10 leading-relaxed">
                  {t.land_culture_desc}
              </p>
              <button 
                  onClick={() => setView(ViewState.MY_LOOKS)}
                  className="border border-white px-8 py-3 hover:bg-white hover:text-brand-900 transition-colors uppercase tracking-widest text-sm font-bold"
              >
                  {t.land_culture_btn}
              </button>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;