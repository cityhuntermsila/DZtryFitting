import React, { useState } from 'react';
import { GeneratedLook, ViewState, GarmentDetails } from '../types';

interface GalleryProps {
  looks: GeneratedLook[];
  setView: (view: ViewState) => void;
  onTryOn?: (garment: GarmentDetails) => void;
}

const Gallery: React.FC<GalleryProps> = ({ looks, setView, onTryOn }) => {
  const [selectedLook, setSelectedLook] = useState<GeneratedLook | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedProductColor, setSelectedProductColor] = useState<{name: string, hex: string} | null>(null);

  // Mock Product Data Generator based on Look ID/Data
  const getProductData = (look: GeneratedLook) => {
    const prefix = look.id.substring(0, 2);
    let partner = "DZtry Boutique";
    let partnerLogo = "fa-bag-shopping";
    
    if (prefix === 'mc') { partner = "Maison du Caftan"; partnerLogo = "fa-gem"; }
    else if (prefix === 'me') { partner = "Mode Elle"; partnerLogo = "fa-crown"; }
    else if (prefix === 'ud') { partner = "Urban DZ"; partnerLogo = "fa-city"; }
    else if (prefix === 'hs') { partner = "Heritage Style"; partnerLogo = "fa-feather"; }
    else if (prefix === 'sc') { partner = "Sahara Chic"; partnerLogo = "fa-sun"; }
    else if (prefix === 'af') { partner = "Algiers Fashion"; partnerLogo = "fa-star"; }

    // Mock images: 1. Garment (Product), 2. Look (Try-on result), 3. Texture/Detail
    const images = [
      look.garmentImageUrl || look.imageUrl,
      look.imageUrl,
      "https://images.unsplash.com/photo-1550614000-4b9519e0037a?q=80&w=400&auto=format&fit=crop" // Placeholder texture
    ];

    const colors = [
        { name: 'Onyx Black', hex: '#1F2937' },
        { name: 'Crimson Red', hex: '#9F1239' },
        { name: 'Royal Gold', hex: '#D4AF37' }
    ];

    return {
      partner,
      partnerLogo,
      price: (Math.floor(Math.random() * (450 - 80) + 80) * 100).toLocaleString() + " DA",
      width: "42 cm (Shoulder)",
      length: "110 cm",
      fabric: "Premium Velvet & Silk",
      colors,
      inStock: true,
      images,
      description: "Experience the elegance of traditional craftsmanship blended with modern cuts. This exclusive piece features intricate embroidery and premium fabric, perfect for special occasions."
    };
  };

  // Set default color when product opens
  if (selectedLook && !selectedProductColor) {
     const product = getProductData(selectedLook);
     setSelectedProductColor(product.colors[0]);
  }

  const handleTryOnClick = () => {
    if (selectedLook && onTryOn && selectedProductColor) {
        const product = getProductData(selectedLook);
        onTryOn({
            name: selectedLook.garmentName,
            description: product.description,
            imageUrl: product.images[0],
            color: selectedProductColor.name
        });
    } else {
        setView(ViewState.STYLE_STUDIO);
    }
  };

  if (selectedLook) {
    const product = getProductData(selectedLook);
    const currentColor = selectedProductColor || product.colors[0];

    return (
      <div className="h-full overflow-y-auto custom-scrollbar bg-white p-6 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => { setSelectedLook(null); setSelectedProductColor(null); setActiveImageIndex(0); }}
            className="mb-8 flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors font-medium"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back to Gallery
          </button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Image Gallery (3 Photos) */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={selectedLook.garmentName} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {activeImageIndex === 0 ? "Product Only" : activeImageIndex === 1 ? "Try-On Result" : "Fabric Detail"}
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-32 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === idx ? 'border-brand-600 shadow-md ring-2 ring-brand-100' : 'border-gray-100 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                 <i className={`fa-solid ${product.partnerLogo} text-brand-600`}></i>
                 <span className="uppercase tracking-widest text-xs">{product.partner}</span>
              </div>
              
              <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">{selectedLook.garmentName}</h1>
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-2xl font-medium text-brand-600">{product.price}</span>
                 {product.inStock ? (
                   <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">In Stock</span>
                 ) : (
                   <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase">Out of Stock</span>
                 )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8 grid grid-cols-2 gap-y-6">
                 <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Dimensions</span>
                    <p className="text-gray-800 font-medium text-sm">Length: {product.length} • Width: {product.width}</p>
                 </div>
                 <div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Fabric</span>
                    <p className="text-gray-800 font-medium text-sm">{product.fabric}</p>
                 </div>
                 <div className="col-span-2">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Selected Color</span>
                    <div className="flex gap-3">
                       {product.colors.map((c, i) => (
                         <button 
                            key={i} 
                            onClick={() => setSelectedProductColor(c)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${currentColor.name === c.name ? 'border-brand-600 bg-white shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'}`}
                         >
                             <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }}></div>
                             <span className="text-xs text-gray-600 font-semibold">{c.name}</span>
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                 <button className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-3">
                    <i className="fa-solid fa-bag-shopping"></i>
                    Buy Now
                 </button>
                 <button 
                    onClick={handleTryOnClick}
                    className="flex-1 py-4 border-2 border-brand-600 text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-3"
                 >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    Try On Virtual
                 </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">
                 Secure Checkout • Guaranteed Authenticity
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT GRID VIEW
  if (looks.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i className="fa-regular fa-images text-3xl"></i>
        </div>
        <p className="text-lg">No generated looks yet.</p>
        <p className="text-sm">Head to the Style Studio to start creating!</p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-[1600px] mx-auto animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-serif">My Looks Gallery</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {looks.map((look) => (
            <div 
                key={look.id} 
                onClick={() => { setSelectedLook(look); setSelectedProductColor(null); }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-gray-100">
                <img 
                  src={look.imageUrl} 
                  alt={look.modelName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-brand-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                    View Product
                </div>

                {/* Garment Thumbnail Overlay */}
                {look.garmentImageUrl && (
                  <div className="absolute bottom-2 right-2 w-10 h-14 bg-white rounded border border-gray-200 shadow-lg overflow-hidden z-10">
                     <img src={look.garmentImageUrl} className="w-full h-full object-cover" alt="Garment" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-gray-900 truncate text-base mb-1">{look.garmentName}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-[10px] text-gray-500">{new Date(look.createdAt).toLocaleDateString()}</p>
                    <span className="text-[9px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full uppercase">
                        In Stock
                    </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;