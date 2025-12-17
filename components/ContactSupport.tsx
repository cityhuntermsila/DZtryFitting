import React, { useState } from 'react';
import { translations, Language } from '../utils/translations';

interface ContactSupportProps {
  lang: Language;
}

const ContactSupport: React.FC<ContactSupportProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'message' | 'booking'>('message');
  
  // Form States
  const [formSent, setFormSent] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExpert === null) return;
    setBookingSent(true);
    setTimeout(() => setBookingSent(false), 4000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-in h-full overflow-y-auto custom-scrollbar">
       
       <div className="text-center mb-10">
         <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.contact_title}</h2>
         <p className="text-gray-500 max-w-xl mx-auto">{t.contact_subtitle}</p>
       </div>

       {/* Tabs */}
       <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1.5 rounded-xl flex">
            <button
                onClick={() => setActiveTab('message')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'message' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <i className="fa-solid fa-envelope"></i>
                {t.contact_tab_msg}
            </button>
            <button
                onClick={() => setActiveTab('booking')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'booking' ? 'bg-white text-brand-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <i className="fa-solid fa-calendar-check"></i>
                {t.contact_tab_book}
            </button>
          </div>
       </div>

       {/* Content Area */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {activeTab === 'message' ? (
              <div className="grid md:grid-cols-2">
                 <div className="p-8 bg-brand-50 border-r border-gray-100 hidden md:flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                            <i className="fa-solid fa-location-dot text-xl"></i>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">Our Office</h3>
                        <p className="text-gray-600 text-sm">123 Fashion Avenue, Business District<br/>Algiers, Algeria</p>
                    </div>
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                            <i className="fa-solid fa-phone text-xl"></i>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                        <p className="text-gray-600 text-sm">+213 555 123 456<br/>Mon-Fri from 9am to 5pm</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 mb-4">
                            <i className="fa-solid fa-at text-xl"></i>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600 text-sm">support@dztryfitting.ai<br/>sales@dztryfitting.ai</p>
                    </div>
                 </div>

                 <div className="p-8">
                    <form onSubmit={handleMessageSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form_name}</label>
                            <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form_email}</label>
                            <input required type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form_subject}</label>
                            <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" placeholder="How to use..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form_message}</label>
                            <textarea required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none" placeholder="Write your message here..."></textarea>
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors">
                            {t.form_btn}
                        </button>
                        {formSent && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center animate-fade-in">
                                {t.form_success}
                            </div>
                        )}
                    </form>
                 </div>
              </div>
          ) : (
              <div className="p-8">
                 <div className="mb-6 flex flex-col md:flex-row items-center gap-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                     <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 shrink-0">
                        <i className="fa-solid fa-star"></i>
                     </div>
                     <div>
                         <h3 className="font-bold text-gray-800">{t.book_title}</h3>
                         <p className="text-sm text-gray-600">{t.book_subtitle}</p>
                     </div>
                 </div>

                 <form onSubmit={handleBookingSubmit}>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">{t.book_expert_label}</label>
                            <div className="space-y-3">
                                {t.experts.map((expert, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => setSelectedExpert(idx)}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedExpert === idx ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <img src={`https://picsum.photos/seed/${idx + 10}/100/100`} alt={expert.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 text-sm">{expert.name}</h4>
                                            <p className="text-xs text-gray-500">{expert.role}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedExpert === idx ? 'border-brand-600 bg-brand-600' : 'border-gray-300'}`}>
                                            {selectedExpert === idx && <i className="fa-solid fa-check text-white text-xs"></i>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.book_date_label}</label>
                                <input required type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.book_time_label}</label>
                                <select required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none">
                                    <option>09:00 AM</option>
                                    <option>10:00 AM</option>
                                    <option>11:00 AM</option>
                                    <option>02:00 PM</option>
                                    <option>03:00 PM</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={selectedExpert === null} className="w-full py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                                    {t.book_btn}
                                </button>
                                {bookingSent && (
                                    <div className="mt-3 p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center animate-fade-in">
                                        {t.book_success}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                 </form>
              </div>
          )}
       </div>
    </div>
  );
};

export default ContactSupport;