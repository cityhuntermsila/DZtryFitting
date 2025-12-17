import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StyleStudio from './components/StyleStudio';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import FAQ from './components/FAQ';
import HowToUse from './components/HowToUse';
import ContactSupport from './components/ContactSupport';
import AboutUs from './components/AboutUs';
import LandingPage from './components/LandingPage';
import Partners from './components/Partners';
import { ViewState, VirtualModel, GeneratedLook, Gender, BodyShape, SkinTone, GarmentDetails } from './types';
import { translations, Language } from './utils/translations';

// Mock Initial Data
const INITIAL_MODELS: VirtualModel[] = [
  {
    id: '1',
    name: 'Emma (Default)',
    gender: Gender.FEMALE,
    bodyShape: BodyShape.SLIM,
    skinTone: SkinTone.LIGHT,
    previewUrl: 'https://picsum.photos/seed/emma/300/400'
  },
  {
    id: '2',
    name: 'Karim (Default)',
    gender: Gender.MALE,
    bodyShape: BodyShape.ATHLETIC,
    skinTone: SkinTone.MEDIUM,
    previewUrl: 'https://picsum.photos/seed/karim/300/400'
  }
];

// Mock Initial Looks for Gallery (3 per Partner)
const INITIAL_LOOKS: GeneratedLook[] = [
  // --- Maison du Caftan (Luxury Traditional) ---
  {
    id: 'mc1',
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 100000000),
    modelName: 'My Photo',
    garmentName: 'Royal Velvet Karakou',
    garmentImageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'mc2',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 95000000),
    modelName: 'My Photo',
    garmentName: 'Emerald Wedding Blouza',
    garmentImageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'mc3',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 90000000),
    modelName: 'My Photo',
    garmentName: 'Gold Embroidered Caftan',
    garmentImageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop'
  },

  // --- Mode Elle (Modern Chic) ---
  {
    id: 'me1',
    imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 85000000),
    modelName: 'My Photo',
    garmentName: 'Noir Evening Dress',
    garmentImageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'me2',
    imageUrl: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 80000000),
    modelName: 'My Photo',
    garmentName: 'Satin Slip Dress',
    garmentImageUrl: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'me3',
    imageUrl: 'https://images.unsplash.com/photo-1575204015694-9b0d6199616e?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 75000000),
    modelName: 'My Photo',
    garmentName: 'Velvet Bodycon',
    garmentImageUrl: 'https://images.unsplash.com/photo-1575204015694-9b0d6199616e?q=80&w=400&auto=format&fit=crop'
  },

  // --- Urban DZ (Streetwear) ---
  {
    id: 'ud1',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 70000000),
    modelName: 'My Photo',
    garmentName: 'Algiers Street Jacket',
    garmentImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ud2',
    imageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e0037a?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 65000000),
    modelName: 'My Photo',
    garmentName: 'Denim Oversize Set',
    garmentImageUrl: 'https://images.unsplash.com/photo-1550614000-4b9519e0037a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'ud3',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 60000000),
    modelName: 'My Photo',
    garmentName: 'Urban Bomber',
    garmentImageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop'
  },

  // --- Heritage Style (Cultural) ---
  {
    id: 'hs1',
    imageUrl: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 55000000),
    modelName: 'My Photo',
    garmentName: 'Kabyle Dress (Yellow)',
    garmentImageUrl: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'hs2',
    imageUrl: 'https://images.unsplash.com/photo-1548454833-252c8065d644?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 50000000),
    modelName: 'My Photo',
    garmentName: 'Traditional Velvet Vest',
    garmentImageUrl: 'https://images.unsplash.com/photo-1548454833-252c8065d644?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'hs3',
    imageUrl: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 45000000),
    modelName: 'My Photo',
    garmentName: 'Naili Winged Dress',
    garmentImageUrl: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=400&auto=format&fit=crop'
  },

  // --- Sahara Chic (Organic/Southern) ---
  {
    id: 'sc1',
    imageUrl: 'https://images.unsplash.com/photo-1594576722512-582bcd46fba3?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 40000000),
    modelName: 'My Photo',
    garmentName: 'Desert Flow Abaya',
    garmentImageUrl: 'https://images.unsplash.com/photo-1594576722512-582bcd46fba3?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'sc2',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 35000000),
    modelName: 'My Photo',
    garmentName: 'Boho Linen Tunic',
    garmentImageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'sc3',
    imageUrl: 'https://images.unsplash.com/photo-1591369822096-35c67e268e51?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 30000000),
    modelName: 'My Photo',
    garmentName: 'Summer Breeze Dress',
    garmentImageUrl: 'https://images.unsplash.com/photo-1591369822096-35c67e268e51?q=80&w=400&auto=format&fit=crop'
  },

  // --- Algiers Fashion (Trendsetter) ---
  {
    id: 'af1',
    imageUrl: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 25000000),
    modelName: 'My Photo',
    garmentName: 'Floral Wrap Dress',
    garmentImageUrl: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'af2',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 20000000),
    modelName: 'My Photo',
    garmentName: 'Wide Leg Palazzo',
    garmentImageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'af3',
    imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&auto=format&fit=crop',
    createdAt: new Date(Date.now() - 15000000),
    modelName: 'My Photo',
    garmentName: 'Classic White Shirt',
    garmentImageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&auto=format&fit=crop'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [models, setModels] = useState<VirtualModel[]>(INITIAL_MODELS);
  const [generatedLooks, setGeneratedLooks] = useState<GeneratedLook[]>(INITIAL_LOOKS);
  const [lang, setLang] = useState<Language>('en');
  
  // State for passing garment from Gallery or Landing to Style Studio
  const [selectedGarmentToTry, setSelectedGarmentToTry] = useState<GarmentDetails | null>(null);

  // Handle RTL direction
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  const handleImageGenerated = (imageUrl: string, modelName: string, garmentImageUrl: string) => {
    const newLook: GeneratedLook = {
      id: Date.now().toString(),
      imageUrl,
      createdAt: new Date(),
      modelName,
      garmentName: 'Uploaded Garment',
      garmentImageUrl: garmentImageUrl
    };
    setGeneratedLooks([newLook, ...generatedLooks]);
  };

  const handleTryOn = (garment: GarmentDetails) => {
    setSelectedGarmentToTry(garment);
    setCurrentView(ViewState.STYLE_STUDIO);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.STYLE_STUDIO:
        return (
          <StyleStudio 
            models={models} 
            onImageGenerated={handleImageGenerated} 
            lang={lang} 
            preSelectedGarment={selectedGarmentToTry}
            clearPreSelectedGarment={() => setSelectedGarmentToTry(null)}
          />
        );
      case ViewState.MY_LOOKS:
        return <Gallery looks={generatedLooks} setView={setCurrentView} onTryOn={handleTryOn} />;
      case ViewState.SUBSCRIPTION:
        return <Pricing />;
      case ViewState.FAQ:
        return <FAQ lang={lang} />;
      case ViewState.HOW_TO_USE:
        return <HowToUse lang={lang} />;
      case ViewState.CONTACT:
        return <ContactSupport lang={lang} />;
      case ViewState.ABOUT_US:
        return <AboutUs lang={lang} setView={setCurrentView} />;
      case ViewState.PARTNERS:
        return <Partners lang={lang} setView={setCurrentView} />;
      case ViewState.DASHBOARD:
        return <LandingPage setView={setCurrentView} lang={lang} onTryOn={handleTryOn} />;
      default:
        return <div className="p-6">Page under construction</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        lang={lang}
        setLang={setLang}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-brand-500/50 shadow-md">
               <i className="fa-solid fa-layer-group"></i>
            </div>
            <span className="font-bold text-gray-800 text-lg">DZtryFitting</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-brand-600 transition-colors"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </header>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;