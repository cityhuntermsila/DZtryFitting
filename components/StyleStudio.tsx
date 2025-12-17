import React, { useState, useRef, useEffect } from 'react';
import { VirtualModel, PoseType, PredefinedGarment, GarmentCategory, GarmentDetails } from '../types';
import { generateTryOn, fileToBase64, ModelInput, GarmentInput } from '../services/geminiService';
import { translations, Language } from '../utils/translations';

interface StyleStudioProps {
  models: VirtualModel[]; // Kept for compatibility but unused
  onImageGenerated: (imgUrl: string, modelName: string, garmentUrl: string) => void;
  lang: Language;
  preSelectedGarment?: GarmentDetails | null;
  clearPreSelectedGarment?: () => void;
}

const PREDEFINED_GARMENTS: PredefinedGarment[] = [
  // --- TRADITIONAL ---
  {
    id: 't1',
    name: 'Karakou Algérois',
    category: 'Traditional',
    description: 'A traditional Algiers velvet jacket with heavy hand-stitched gold "fetla" embroidery on the chest and sleeves, paired with "Sarouel Mdouwer" (harem pants).',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400&auto=format&fit=crop', 
    availableColors: ['Burgundy', 'Emerald Green', 'Royal Blue']
  },
  {
    id: 't10',
    name: 'Robe Naili Authentique',
    category: 'Traditional',
    description: 'An authentic Naili dress from the Ouled Naïl region. It features the signature dramatic "winged" frilled sleeves, cascading tiered ruffles (volants) on the arms and bodice, a high waist, and flowing lightweight fabric with intricate floral embroidery or lace. Often accessorized with a "Nailiya" headband and traditional belt.',
    image: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Peach/Gold', 'Silver/Grey', 'White', 'Pink']
  },
  {
    id: 't2',
    name: 'Kabyle Dress',
    category: 'Traditional',
    description: 'A traditional Berber dress with vibrant geometric zig-zag patterns (silk ribbons), bright colors, and a matching "fouta" belt and "mendil" scarf.',
    image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Yellow/Orange', 'White/Red', 'Multi-color']
  },
  {
    id: 't4',
    name: 'Caftan Royal',
    category: 'Traditional',
    description: 'A luxurious velvet or silk caftan with a central "Sfifa" gold line, intricate embroidery, and a "Mdamma" jeweled belt.',
    image: 'https://images.unsplash.com/photo-1548454833-252c8065d644?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Royal Blue', 'Deep Red', 'Black']
  },
  {
    id: 't5',
    name: 'Gandoura Fergani',
    category: 'Traditional',
    description: 'The iconic velvet dress of Constantine, featuring extremely dense gold thread embroidery (majboud) covering the entire chest and hem.',
    image: 'https://plus.unsplash.com/premium_photo-1664202526559-e21e9c665938?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Burgundy', 'Dark Green', 'Navy']
  },
  {
    id: 't6',
    name: 'Blouza Oranaise',
    category: 'Traditional',
    description: 'Originating from Oran, this dress features a distinctive sequined "Sdar" (chest piece) and elegant lace sleeves with a long flowing skirt.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Pink', 'Gold', 'Light Blue']
  },
  {
    id: 't7',
    name: 'Chedda Tlemcenia',
    category: 'Traditional',
    description: 'The UNESCO-recognized bridal outfit of Tlemcen. A heavy, jeweled ensemble consisting of multiple kaftans, headgear, and layers of traditional necklaces.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Gold', 'Silver', 'Red']
  },
  {
    id: 't9',
    name: 'Bedroune Algérois',
    category: 'Traditional',
    description: 'A chic one-piece satin jumpsuit inspired by Algiers heritage, featuring "Sarouel" style bottom and a delicately embroidered bodice.',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=400&auto=format&fit=crop',
    availableColors: ['White/Gold', 'Pink', 'Blue']
  },
  {
    id: 't11',
    name: 'Binouar Sétifien',
    category: 'Traditional',
    description: 'A light, floral print dress (Robet Zid) typical of the High Plateaus region, offering a loose and sophisticated silhouette.',
    image: 'https://images.unsplash.com/photo-1612462766565-98363db88eb2?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Floral Pink', 'Floral Blue', 'Floral Yellow']
  },
  
  // --- TOPS ---
  {
    id: 'top1',
    name: 'Classic White Shirt',
    category: 'Tops',
    description: 'A crisp, button-down cotton shirt suitable for work or casual wear.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=400&auto=format&fit=crop',
    availableColors: ['White', 'Light Blue', 'Striped']
  },
  {
    id: 'top2',
    name: 'Oversized Sweater',
    category: 'Tops',
    description: 'A cozy, knitted oversized sweater.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Cream', 'Grey', 'Mustard']
  },
  {
    id: 'top3',
    name: 'Silk Blouse',
    category: 'Tops',
    description: 'An elegant silk blouse with loose sleeves.',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Champagne', 'Black', 'Red']
  },

  // --- BOTTOMS ---
  {
    id: 'bot1',
    name: 'Wide Leg Trousers',
    category: 'Bottoms',
    description: 'High-waisted wide leg trousers (Palazzo style).',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Black', 'Beige', 'White']
  },
  {
    id: 'bot2',
    name: 'Pleated Skirt',
    category: 'Bottoms',
    description: 'A long midi pleated skirt.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Pink', 'Green', 'Black']
  },
  {
    id: 'bot3',
    name: 'Classic Jeans',
    category: 'Bottoms',
    description: 'Straight-leg denim jeans.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Blue', 'Black', 'Light Wash']
  },

  // --- DRESSES ---
  {
    id: 'd1',
    name: 'Summer Maxi Dress',
    category: 'Dresses',
    description: 'A flowing floral summer dress.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Floral White', 'Floral Red', 'Pastel Blue']
  },
  {
    id: 'd2',
    name: 'Evening Gown',
    category: 'Dresses',
    description: 'An elegant evening gown for formal occasions.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Red', 'Navy', 'Emerald']
  },
  {
    id: 'd3',
    name: 'Floral Wrap Dress',
    category: 'Dresses',
    description: 'A flattering wrap dress with short sleeves and a floral print.',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Floral Pink', 'Floral Blue', 'Floral Yellow']
  },
  {
    id: 'd4',
    name: 'Satin Slip Dress',
    category: 'Dresses',
    description: 'A minimal 90s inspired satin slip dress.',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Champagne', 'Black', 'Silver']
  },
  {
    id: 'd5',
    name: 'Little Black Dress',
    category: 'Dresses',
    description: 'The classic timeless short black dress.',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Black', 'Navy', 'Burgundy']
  },
  {
    id: 'd8',
    name: 'Velvet Bodycon',
    category: 'Dresses',
    description: 'A fitted velvet dress suitable for evening parties.',
    image: 'https://images.unsplash.com/photo-1575204015694-9b0d6199616e?q=80&w=400&auto=format&fit=crop',
    availableColors: ['Deep Red', 'Black', 'Emerald']
  }
];

const StyleStudio: React.FC<StyleStudioProps> = ({ onImageGenerated, lang, preSelectedGarment, clearPreSelectedGarment }) => {
  const t = translations[lang];

  // --- STATE ---
  
  // Model Selection (Strictly User Photo)
  const [userModelFile, setUserModelFile] = useState<File | null>(null);
  const [userModelPreview, setUserModelPreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDraggingModel, setIsDraggingModel] = useState(false);
  
  // Garment Selection
  const [garmentMode, setGarmentMode] = useState<'PRESET' | 'COMBINED' | 'UPLOAD'>('PRESET');
  const [garmentTab, setGarmentTab] = useState<GarmentCategory>('Traditional');
  
  // Single Preset Selection
  const [selectedGarmentId, setSelectedGarmentId] = useState<string | null>(PREDEFINED_GARMENTS[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(PREDEFINED_GARMENTS[0].availableColors[0]);
  
  // Custom Selection (From Gallery)
  const [customGarment, setCustomGarment] = useState<GarmentDetails | null>(null);

  // Combined Selection (Top + Bottom)
  const defaultTop = PREDEFINED_GARMENTS.find(g => g.category === 'Tops');
  const defaultBottom = PREDEFINED_GARMENTS.find(g => g.category === 'Bottoms');
  
  const [selectedTopId, setSelectedTopId] = useState<string | null>(defaultTop ? defaultTop.id : null);
  const [selectedTopColor, setSelectedTopColor] = useState<string>(defaultTop ? defaultTop.availableColors[0] : '');
  const [selectedBottomId, setSelectedBottomId] = useState<string | null>(defaultBottom ? defaultBottom.id : null);
  const [selectedBottomColor, setSelectedBottomColor] = useState<string>(defaultBottom ? defaultBottom.availableColors[0] : '');

  // Upload Selection
  const [userGarmentFile, setUserGarmentFile] = useState<File | null>(null);
  const [userGarmentPreview, setUserGarmentPreview] = useState<string | null>(null);
  const [isDraggingGarment, setIsDraggingGarment] = useState(false);

  // Common
  const [selectedPose, setSelectedPose] = useState<PoseType>(PoseType.FRONT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive Slider
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Loading
  const [loadingStep, setLoadingStep] = useState(0);

  // Refs
  const modelFileInputRef = useRef<HTMLInputElement>(null);
  const garmentFileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- EFFECTS ---
  useEffect(() => {
    let interval: number;
    if (isGenerating) {
        setLoadingStep(0);
        interval = window.setInterval(() => {
            setLoadingStep(prev => (prev + 1) % t.studio_loading_steps.length);
        }, 2000);
    }
    return () => clearInterval(interval);
  }, [isGenerating, t.studio_loading_steps.length]);

  // Handle incoming Pre-Selected Garment (from Gallery)
  useEffect(() => {
    if (preSelectedGarment) {
        setGarmentMode('PRESET');
        setCustomGarment(preSelectedGarment);
        setSelectedGarmentId(null); // Clear standard selection
        if (clearPreSelectedGarment) clearPreSelectedGarment();
    }
  }, [preSelectedGarment, clearPreSelectedGarment]);

  // --- HANDLERS ---

  // Drag & Drop Helpers
  const handleDragEnter = (e: React.DragEvent, setDrag: (v: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(true);
  };
  const handleDragLeave = (e: React.DragEvent, setDrag: (v: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  };
  const handleDrop = async (e: React.DragEvent, setFile: (f: File) => void, setPreview: (s: string) => void, setDrag: (v: boolean)) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            setFile(file);
            const base64 = await fileToBase64(file);
            setPreview(`data:${file.type};base64,${base64}`);
            setGeneratedImage(null);
        }
    }
  };

  // Model Handlers
  const handleModelFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserModelFile(file);
      const base64 = await fileToBase64(file);
      setUserModelPreview(`data:${file.type};base64,${base64}`);
      setGeneratedImage(null);
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setUserModelFile(file);
            const base64 = await fileToBase64(file);
            setUserModelPreview(`data:image/jpeg;base64,${base64}`);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  // Garment Handlers
  const handleGarmentFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUserGarmentFile(file);
      const base64 = await fileToBase64(file);
      setUserGarmentPreview(`data:${file.type};base64,${base64}`);
      setSelectedGarmentId(null);
      setCustomGarment(null);
      setGeneratedImage(null);
    }
  };

  const handlePresetSelect = (garment: PredefinedGarment) => {
    setSelectedGarmentId(garment.id);
    setSelectedColor(garment.availableColors[0]);
    setCustomGarment(null);
    setUserGarmentFile(null);
    setUserGarmentPreview(null);
  };

  // Combined Handlers
  const handleTopSelect = (garment: PredefinedGarment) => {
    setSelectedTopId(garment.id);
    setSelectedTopColor(garment.availableColors[0]);
  };
  const handleBottomSelect = (garment: PredefinedGarment) => {
    setSelectedBottomId(garment.id);
    setSelectedBottomColor(garment.availableColors[0]);
  };

  // Generate Handler
  const handleGenerate = async () => {
    setError(null);
    
    // 1. Prepare Model Input (Strictly User Photo)
    if (!userModelFile) {
        setError(t.studio_err_photo);
        return;
    }

    const base64 = await fileToBase64(userModelFile);
    const modelInput: ModelInput = { type: 'image', base64 };
    const modelName = 'My Photo';

    // 2. Prepare Garment Input
    let garmentInput: GarmentInput;
    let currentGarmentUrl = '';
    
    if (garmentMode === 'UPLOAD') {
        if (!userGarmentFile) {
            setError(t.studio_err_garment_upload);
            return;
        }
        const garmentBase64 = await fileToBase64(userGarmentFile);
        garmentInput = { type: 'upload', base64: garmentBase64 };
        currentGarmentUrl = userGarmentPreview || '';
    } else if (garmentMode === 'COMBINED') {
        if (!selectedTopId || !selectedBottomId) {
             setError(t.studio_err_garment_combined);
             return;
        }
        const top = PREDEFINED_GARMENTS.find(g => g.id === selectedTopId);
        const bottom = PREDEFINED_GARMENTS.find(g => g.id === selectedBottomId);
        if (!top || !bottom) throw new Error("Combined garments not found");
        
        garmentInput = {
            type: 'combined',
            top: { name: top.name, description: top.description, color: selectedTopColor },
            bottom: { name: bottom.name, description: bottom.description, color: selectedBottomColor }
        };
        // Use top image as thumbnail for now
        currentGarmentUrl = top.image; 
    } else {
        // PRESET OR CUSTOM MODE
        if (customGarment) {
            garmentInput = {
                type: 'preset',
                name: customGarment.name,
                description: customGarment.description,
                color: customGarment.color
            };
            currentGarmentUrl = customGarment.imageUrl;
        } else {
            if (!selectedGarmentId) {
                 setError(t.studio_err_garment);
                 return;
            }
            const garment = PREDEFINED_GARMENTS.find(g => g.id === selectedGarmentId);
            if (!garment) throw new Error("Garment not found");
            garmentInput = {
                type: 'preset',
                name: garment.name,
                description: garment.description,
                color: selectedColor
            };
            currentGarmentUrl = garment.image;
        }
    }

    setIsGenerating(true);
    setSliderPosition(50); // Reset slider

    try {
        const resultUrl = await generateTryOn(garmentInput, modelInput, selectedPose);
        setGeneratedImage(resultUrl);
        onImageGenerated(resultUrl, modelName, currentGarmentUrl);
    } catch (err: any) {
        setError(err.message || "Generation failed");
    } finally {
        setIsGenerating(false);
    }
  };

  // Slider Logic
  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  };

  // UI Helpers
  const selectedGarmentObj = PREDEFINED_GARMENTS.find(g => g.id === selectedGarmentId);
  const selectedTopObj = PREDEFINED_GARMENTS.find(g => g.id === selectedTopId);
  const selectedBottomObj = PREDEFINED_GARMENTS.find(g => g.id === selectedBottomId);

  const getColorCode = (colorName: string) => {
    const map: Record<string, string> = {
      'Burgundy': '#800020', 'Emerald Green': '#50C878', 'Royal Blue': '#4169E1',
      'Yellow/Orange': '#FFBF00', 'White/Red': '#f5f5f5', 'Multi-color': 'linear-gradient(45deg, red, yellow, green)',
      'Pink': '#FFC0CB', 'Gold': '#FFD700', 'Turquoise': '#40E0D0',
      'Black': '#000000', 'Beige': '#F5F5DC', 'Navy': '#000080',
      'Floral White': '#FFF', 'Floral Red': '#FF0000', 'Pastel Blue': '#AEC6CF',
      'White': '#FFFFFF', 'Light Blue': '#ADD8E6', 'Striped': 'repeating-linear-gradient(45deg, #fff, #fff 5px, #000 5px, #000 10px)',
      'Cream': '#FFFDD0', 'Grey': '#808080', 'Mustard': '#FFDB58',
      'Champagne': '#F7E7CE', 'Sage Green': '#B2AC88', 'Light Wash': '#add8e6',
      'Green': '#008000', 'Deep Red': '#8B0000', 'Dark Green': '#006400', 'Silver': '#C0C0C0',
      'Black/Yellow': '#333333', 'White/Gold': '#FAFAD2', 'Floral Pink': '#FFB6C1', 'Floral Blue': '#87CEEB', 'Floral Yellow': '#FFFFE0',
      'Red/White': '#D32F2F', 'Black/White': '#212121', 'Blue/White': '#1976D2', 'Lavender': '#E6E6FA', 'Olive': '#808000',
      'Onyx Black': '#1F2937', 'Crimson Red': '#9F1239', 'Royal Gold': '#D4AF37', 'Peach/Gold': '#ffcc99', 'Silver/Grey': '#d3d3d3'
    };
    return map[colorName] || colorName;
  };

  const categories: {id: GarmentCategory, label: string}[] = [
      { id: 'Traditional', label: t.cat_traditional },
      { id: 'Tops', label: t.cat_tops },
      { id: 'Bottoms', label: t.cat_bottoms },
      { id: 'Dresses', label: t.cat_dresses },
  ];

  const canGenerate = !isGenerating && userModelFile && (
      (garmentMode === 'UPLOAD' && userGarmentFile) || 
      (garmentMode === 'PRESET' && (selectedGarmentId || customGarment)) ||
      (garmentMode === 'COMBINED' && selectedTopId && selectedBottomId)
  );

  return (
    <div 
        className="h-full flex flex-col md:flex-row gap-8 p-6 ltr:md:pr-8 rtl:md:pl-8"
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
    >
      
      {/* --- LEFT PANEL: CONTROLS --- */}
      <div className="w-full md:w-[400px] flex flex-col gap-6 overflow-y-auto ltr:pr-2 rtl:pl-2 custom-scrollbar shrink-0">
        
        {/* STEP 1: YOUR PHOTO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-3 text-lg">
            <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm shadow-sm">1</span>
            {t.studio_step1}
          </h3>
          
          <div className="space-y-4 animate-fade-in">
            <div className="bg-brand-50 p-4 rounded-xl text-xs text-brand-700 leading-relaxed flex gap-3">
                <i className="fa-solid fa-circle-info mt-0.5 text-sm"></i>
                <p>{t.studio_step1_desc}</p>
            </div>

            {isCameraOpen ? (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4] shadow-xl border-4 border-white">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted></video>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                        <button 
                            onClick={capturePhoto} 
                            className="w-16 h-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                        >
                            <div className="w-12 h-12 bg-brand-600 rounded-full border-2 border-white"></div>
                        </button>
                    </div>
                    <button onClick={stopCamera} className="absolute top-4 right-4 text-white bg-black/40 backdrop-blur-md p-2.5 rounded-full hover:bg-black/60 transition-colors">
                        <i className="fa-solid fa-times text-lg"></i>
                    </button>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                </div>
            ) : userModelPreview ? (
                <div className="relative rounded-2xl overflow-hidden border-4 border-white aspect-[3/4] bg-gray-50 group shadow-xl ring-1 ring-gray-100">
                    <img src={userModelPreview} alt="Me" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all"></div>
                    <button 
                        onClick={() => { setUserModelPreview(null); setUserModelFile(null); setGeneratedImage(null); }} 
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full text-brand-600 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
                    >
                        <i className="fa-solid fa-trash-can text-lg"></i>
                    </button>
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg backdrop-blur-md shadow-sm">
                        {t.studio_your_photo}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <div 
                        onDragOver={(e) => handleDragEnter(e, setIsDraggingModel)}
                        onDragLeave={(e) => handleDragLeave(e, setIsDraggingModel)}
                        onDrop={(e) => handleDrop(e, (f) => { setUserModelFile(f); setGeneratedImage(null); }, setUserModelPreview, setIsDraggingModel)}
                        onClick={() => modelFileInputRef.current?.click()}
                        className={`py-20 border-3 border-dashed rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center gap-4 ${
                            isDraggingModel 
                            ? 'border-brand-500 bg-brand-50 scale-[1.02] shadow-xl ring-4 ring-brand-100' 
                            : 'border-gray-200 hover:bg-brand-50/30 hover:border-brand-400 hover:shadow-md'
                        }`}
                    >
                        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-2">
                             <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
                        </div>
                        <div className="text-center">
                            <span className="text-sm font-bold text-gray-800 block mb-1">{t.studio_drag_drop}</span>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">JPG, PNG up to 10MB</span>
                        </div>
                    </div>
                    <button 
                        onClick={startCamera}
                        className="py-5 bg-gray-900 text-white rounded-2xl hover:bg-black flex items-center justify-center gap-3 transition-all shadow-lg hover:-translate-y-1"
                    >
                        <i className="fa-solid fa-camera text-xl"></i>
                        <span className="text-sm font-bold uppercase tracking-wider">{t.studio_btn_camera}</span>
                    </button>
                    <input type="file" ref={modelFileInputRef} onChange={handleModelFileChange} className="hidden" accept="image/*" />
                </div>
            )}
          </div>
        </div>

        {/* STEP 2: CHOOSE GARMENT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-3 text-lg">
            <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm shadow-sm">2</span>
            {t.studio_step2}
          </h3>
          
          {customGarment ? (
             <div className="relative p-5 border-2 border-brand-500 bg-brand-50/50 rounded-2xl animate-fade-in shadow-sm">
                <button 
                    onClick={() => { setCustomGarment(null); if (clearPreSelectedGarment) clearPreSelectedGarment(); }} 
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full text-gray-400 hover:text-red-600 shadow-md flex items-center justify-center transition-all hover:scale-110"
                >
                    <i className="fa-solid fa-times text-sm"></i>
                </button>
                <div className="flex gap-5">
                <div className="w-24 h-32 shrink-0 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <img src={customGarment.imageUrl} className="w-full h-full object-cover" alt={customGarment.name} />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-1">Current Product</span>
                    <h4 className="font-serif font-bold text-gray-900 text-xl leading-tight mb-2">{customGarment.name}</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Color:</span>
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-white rounded-full border border-gray-200 shadow-sm">
                             <div className="w-3.5 h-3.5 rounded-full border border-gray-100" style={{background: getColorCode(customGarment.color)}}></div>
                             <span className="text-[10px] font-bold text-gray-700 uppercase">{customGarment.color}</span>
                        </div>
                    </div>
                </div>
                </div>
             </div>
          ) : (
            <>
                <div className="flex bg-gray-100/80 p-1.5 rounded-xl mb-6">
                    <button 
                        onClick={() => setGarmentMode('PRESET')} 
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${garmentMode === 'PRESET' ? 'bg-white text-brand-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.studio_tab_collection}
                    </button>
                    <button 
                        onClick={() => setGarmentMode('COMBINED')} 
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${garmentMode === 'COMBINED' ? 'bg-white text-brand-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.studio_tab_combined}
                    </button>
                    <button 
                        onClick={() => setGarmentMode('UPLOAD')} 
                        className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all uppercase tracking-wider ${garmentMode === 'UPLOAD' ? 'bg-white text-brand-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.studio_tab_upload}
                    </button>
                </div>

                {garmentMode === 'PRESET' && (
                    <>
                        <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-100 pb-3">
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => setGarmentTab(cat.id)} 
                                className={`text-[10px] px-4 py-1.5 rounded-full border font-bold uppercase tracking-widest transition-all ${garmentTab === cat.id ? 'bg-brand-600 text-white border-brand-600 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6 max-h-80 overflow-y-auto custom-scrollbar ltr:pr-2 rtl:pl-2">
                        {PREDEFINED_GARMENTS.filter(g => g.category === garmentTab).map(garment => (
                            <button
                                key={garment.id}
                                onClick={() => handlePresetSelect(garment)}
                                className={`group relative p-2.5 rounded-2xl border-2 transition-all text-left overflow-hidden ${selectedGarmentId === garment.id ? 'border-brand-600 bg-brand-50 shadow-md' : 'border-gray-100 hover:border-brand-200 bg-gray-50/30'}`}
                            >
                                <div className="aspect-[3/4] bg-white rounded-xl mb-3 overflow-hidden shadow-sm">
                                    <img src={garment.image} alt={garment.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <p className="text-[11px] font-bold text-gray-900 truncate uppercase tracking-tight">{garment.name}</p>
                            </button>
                        ))}
                        </div>
                        {/* Colors */}
                        {selectedGarmentObj && (
                        <div className="flex gap-2.5 animate-fade-in flex-wrap p-1">
                            {selectedGarmentObj.availableColors.map(color => (
                                <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-125 hover:shadow-lg ${selectedColor === color ? 'border-brand-600 ring-2 ring-brand-100 scale-110 shadow-md' : 'border-gray-200'}`}
                                style={{ background: getColorCode(color) }}
                                title={color}
                                />
                            ))}
                        </div>
                        )}
                    </>
                )}

                {garmentMode === 'COMBINED' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Select Top */}
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">{t.studio_select_top}</h4>
                            <div className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar">
                                {PREDEFINED_GARMENTS.filter(g => g.category === 'Tops').map(garment => (
                                    <button
                                        key={garment.id}
                                        onClick={() => handleTopSelect(garment)}
                                        className={`shrink-0 w-28 p-2.5 rounded-2xl border-2 transition-all ${selectedTopId === garment.id ? 'border-brand-600 bg-brand-50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'}`}
                                    >
                                        <div className="aspect-[3/4] bg-white rounded-xl mb-2 overflow-hidden shadow-sm">
                                            <img src={garment.image} className="w-full h-full object-cover" alt={garment.name} />
                                        </div>
                                        <p className="text-[10px] truncate font-bold text-gray-800 uppercase">{garment.name}</p>
                                    </button>
                                ))}
                            </div>
                            {/* Top Colors */}
                            {selectedTopObj && (
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {selectedTopObj.availableColors.map(color => (
                                        <button
                                        key={color}
                                        onClick={() => setSelectedTopColor(color)}
                                        className={`w-5 h-5 rounded-full border-2 ${selectedTopColor === color ? 'border-brand-600 ring-1 ring-brand-100 scale-110' : 'border-gray-200'}`}
                                        style={{ background: getColorCode(color) }}
                                        title={color}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Select Bottom */}
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">{t.studio_select_bottom}</h4>
                            <div className="flex gap-4 overflow-x-auto pb-3 custom-scrollbar">
                                {PREDEFINED_GARMENTS.filter(g => g.category === 'Bottoms').map(garment => (
                                    <button
                                        key={garment.id}
                                        onClick={() => handleBottomSelect(garment)}
                                        className={`shrink-0 w-28 p-2.5 rounded-2xl border-2 transition-all ${selectedBottomId === garment.id ? 'border-brand-600 bg-brand-50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'}`}
                                    >
                                        <div className="aspect-[3/4] bg-white rounded-xl mb-2 overflow-hidden shadow-sm">
                                            <img src={garment.image} className="w-full h-full object-cover" alt={garment.name} />
                                        </div>
                                        <p className="text-[10px] truncate font-bold text-gray-800 uppercase">{garment.name}</p>
                                    </button>
                                ))}
                            </div>
                            {/* Bottom Colors */}
                            {selectedBottomObj && (
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {selectedBottomObj.availableColors.map(color => (
                                        <button
                                        key={color}
                                        onClick={() => setSelectedBottomColor(color)}
                                        className={`w-5 h-5 rounded-full border-2 ${selectedBottomColor === color ? 'border-brand-600 ring-1 ring-brand-100 scale-110' : 'border-gray-200'}`}
                                        style={{ background: getColorCode(color) }}
                                        title={color}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {garmentMode === 'UPLOAD' && (
                    <div 
                        onDragOver={(e) => handleDragEnter(e, setIsDraggingGarment)}
                        onDragLeave={(e) => handleDragLeave(e, setIsDraggingGarment)}
                        onDrop={(e) => handleDrop(e, (f) => { setUserGarmentFile(f); setSelectedGarmentId(null); setGeneratedImage(null); }, setUserGarmentPreview, setIsDraggingGarment)}
                        onClick={() => garmentFileInputRef.current?.click()}
                        className={`border-3 border-dashed rounded-2xl py-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                            isDraggingGarment 
                            ? 'border-brand-500 bg-brand-50 scale-[1.02] shadow-xl'
                            : userGarmentPreview ? 'border-brand-400 bg-brand-50' : 'border-gray-200 hover:border-brand-400 hover:bg-gray-50/50'
                        }`}
                    >
                        {userGarmentPreview ? (
                        <div className="relative group">
                             <img src={userGarmentPreview} alt="Garment" className="h-48 w-36 object-cover rounded-xl shadow-lg border-2 border-white" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                 <i className="fa-solid fa-rotate text-white text-2xl"></i>
                             </div>
                        </div>
                        ) : (
                        <>
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                                <i className="fa-solid fa-shirt text-2xl"></i>
                            </div>
                            <p className="text-sm font-bold text-gray-800 mb-1">{t.studio_drag_drop}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t.studio_upload_garment_ph}</p>
                        </>
                        )}
                        <input type="file" ref={garmentFileInputRef} onChange={handleGarmentFileChange} className="hidden" accept="image/*" />
                    </div>
                )}
            </>
          )}
          
        </div>

        {/* STEP 3: POSE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-3 text-lg">
               <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm shadow-sm">3</span>
               {t.studio_step3}
             </h3>
             <div className="flex flex-wrap gap-2">
               {Object.values(PoseType).map((pose) => (
                 <button
                   key={pose}
                   onClick={() => setSelectedPose(pose)}
                   className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all ${selectedPose === pose ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:bg-gray-50'}`}
                 >
                   {pose}
                 </button>
               ))}
             </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 text-lg ${
            isGenerating || !canGenerate
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 shadow-none' 
              : 'bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isGenerating ? <><i className="fa-solid fa-spinner fa-spin"></i> {t.studio_processing}</> : <><i className="fa-solid fa-wand-magic-sparkles"></i> {t.studio_btn_generate}</>}
        </button>

        {error && <div className="p-4 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-100 animate-fade-in flex items-center gap-3">
             <i className="fa-solid fa-triangle-exclamation"></i>
             {error}
        </div>}

      </div>

      {/* --- RIGHT PANEL: PREVIEW --- */}
      <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden min-h-[600px] md:min-h-0">
        {generatedImage && userModelPreview ? (
           <div className="w-full h-full flex flex-col p-6 bg-gray-50/50">
              <div 
                  ref={containerRef}
                  className="flex-1 relative rounded-[2rem] overflow-hidden shadow-2xl cursor-ew-resize select-none bg-white border-8 border-white"
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleMouseMove}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
              >
                 {/* Generated Image (Background) */}
                 <img 
                    src={generatedImage} 
                    alt="Result" 
                    className="absolute inset-0 w-full h-full object-contain bg-white pointer-events-none"
                 />

                 {/* Original Image (Foreground with Clip) */}
                 <div 
                    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%`, borderRight: '2px solid white' }}
                 >
                    <img 
                        src={userModelPreview} 
                        alt="Original" 
                        className="absolute inset-0 w-[100vw] max-w-none h-full object-contain pointer-events-none"
                        style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                    />
                 </div>

                 {/* Slider Handle */}
                 <div 
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.4)] z-10 flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                 >
                    <div className="w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-brand-600 border border-gray-100">
                        <i className="fa-solid fa-arrows-left-right text-sm"></i>
                    </div>
                 </div>

                 {/* Labels */}
                 <div className="absolute top-6 left-6 bg-black/60 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl pointer-events-none backdrop-blur-md shadow-lg">
                    {t.studio_original}
                 </div>
                 <div className="absolute top-6 right-6 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl pointer-events-none shadow-lg backdrop-blur-md">
                    {t.studio_result}
                 </div>

                 {/* Hint Overlay (fades out) */}
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-2xl pointer-events-none backdrop-blur-md opacity-0 animate-[fadeInOut_4s_ease-in-out_forwards] shadow-2xl">
                    {t.studio_compare_hint}
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                 <a 
                    href={generatedImage} 
                    download="dztry-result.png" 
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl hover:bg-gray-50 hover:text-brand-600 hover:border-brand-200 transition-all shadow-md font-bold uppercase tracking-widest text-xs flex items-center gap-3"
                 >
                    <i className="fa-solid fa-download text-lg"></i>
                    {lang === 'en' ? 'Download Result' : 'تحميل النتيجة'}
                 </a>
                 <button 
                    onClick={() => { setGeneratedImage(null); }} 
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-md font-bold uppercase tracking-widest text-xs"
                 >
                    <i className="fa-solid fa-rotate-left"></i>
                 </button>
              </div>
           </div>
        ) : (
           <div className="text-center p-12 animate-fade-in flex flex-col items-center">
              <div className="w-40 h-40 bg-brand-50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner ring-1 ring-brand-100 group">
                <i className="fa-solid fa-camera-retro text-6xl text-brand-200 group-hover:scale-110 group-hover:text-brand-300 transition-all duration-700 animate-[bounce_4s_infinite]"></i>
              </div>
              <h3 className="font-serif text-4xl font-bold text-gray-900 mb-4">{t.studio_placeholder_title}</h3>
              <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed mb-8">
                {t.studio_placeholder_desc}
              </p>
              <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-200"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-100"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-50"></div>
              </div>
           </div>
        )}
        
        {isGenerating && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-10">
                    <div className="absolute inset-0 border-8 border-gray-50 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-brand-600 rounded-full border-t-transparent animate-spin"></div>
                    <i className="fa-solid fa-wand-magic-sparkles absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-brand-600 animate-pulse"></i>
                </div>
                <h4 className="text-3xl font-serif font-bold text-gray-900 mb-4 animate-pulse uppercase tracking-tight">{t.studio_designing}</h4>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-500 text-lg font-medium transition-all duration-500 ease-in-out">
                        {t.studio_loading_steps[loadingStep]}
                    </p>
                    <div className="flex gap-2 mt-2">
                        {[0,1,2].map(i => (
                            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i === loadingStep ? 'bg-brand-600 w-8' : 'bg-gray-200'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StyleStudio;