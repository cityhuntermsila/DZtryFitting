import React from 'react';
import { ViewState } from '../types';
import { translations, Language } from '../utils/translations';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isMobileOpen, setIsMobileOpen, lang, setLang }) => {
  const t = translations[lang];

  const menuItems = [
    { id: ViewState.DASHBOARD, label: t.nav_dashboard, icon: 'fa-house' },
    { id: ViewState.STYLE_STUDIO, label: t.nav_studio, icon: 'fa-wand-magic-sparkles' },
    { id: ViewState.MY_LOOKS, label: t.nav_gallery, icon: 'fa-heart' },
    { id: ViewState.SUBSCRIPTION, label: t.nav_billing, icon: 'fa-gem' },
    { id: ViewState.HOW_TO_USE, label: t.nav_how_to, icon: 'fa-book-open' },
    { id: ViewState.CONTACT, label: t.nav_contact, icon: 'fa-envelope' },
  ];

  const secondaryItems = [
    { id: ViewState.FAQ, label: t.nav_faq },
    { id: ViewState.ABOUT_US, label: t.nav_about },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 ltr:left-0 rtl:right-0 z-50 w-72 bg-white ltr:border-r rtl:border-l border-gray-100 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : 'ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div 
              className="flex flex-col cursor-pointer group"
              onClick={() => { setView(ViewState.DASHBOARD); setIsMobileOpen(false); }}
            >
              <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-tight group-hover:text-brand-600 transition-colors">
                DZtry<span className="text-brand-600">.</span>
              </h1>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:tracking-[0.3em] transition-all">Virtual Fitting</span>
            </div>
            <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-900 transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 space-y-1 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Menu</p>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-none text-sm font-medium transition-all duration-300 border-l-2 group ${
                    currentView === item.id
                      ? 'border-brand-600 text-brand-900 bg-brand-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'}`}></i>
                  <span className="font-serif tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>

            <div>
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Support</p>
              {secondaryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                     currentView === item.id ? 'text-brand-900 font-medium' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <span className="font-serif tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
        </nav>

        {/* Footer / User */}
        <div className="p-6 border-t border-gray-50 bg-gray-50/30">
           {/* Language */}
           <div className="flex justify-center gap-4 text-xs font-medium text-gray-400 mb-6 uppercase tracking-widest">
               <button onClick={() => setLang('en')} className={`hover:text-brand-600 transition-colors ${lang === 'en' ? 'text-brand-900 font-bold border-b border-brand-900' : ''}`}>EN</button>
               <span>|</span>
               <button onClick={() => setLang('ar')} className={`hover:text-brand-600 transition-colors ${lang === 'ar' ? 'text-brand-900 font-bold border-b border-brand-900' : ''}`}>AR</button>
           </div>

           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-serif font-bold text-lg">
                 S
              </div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-gray-900 font-serif">Sarah M.</p>
                 <p className="text-[10px] text-gray-500 uppercase tracking-wide">{t.user_role}</p>
              </div>
              <i className="fa-solid fa-gear text-gray-300 hover:text-gray-600 cursor-pointer transition-colors"></i>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;