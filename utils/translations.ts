export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Sidebar
    nav_dashboard: "Home",
    nav_studio: "Style Studio",
    nav_gallery: "My Gallery",
    nav_billing: "Plans",
    nav_faq: "Help Center",
    nav_how_to: "How to Use",
    nav_contact: "Contact",
    nav_about: "Our Story",
    user_role: "Fashionista",
    
    // Landing Page
    land_hero_badge: "New Collection 2024",
    land_hero_title_1: "Redefine Your",
    land_hero_title_highlight: "Style.",
    land_hero_subtitle: "Experience the ultimate virtual fitting room. From traditional Karakou to modern chic, find your perfect look instantly.",
    land_cta_primary: "Start Fitting",
    land_cta_secondary: "Shop Collection",
    land_trust_1: "Delivery 69 Wilayas",
    land_trust_2: "Secure Payment",
    land_trust_3: "Premium Quality",
    
    land_cat_title: "Shop by Category",
    land_cat_1: "Traditional",
    land_cat_2: "Dresses",
    land_cat_3: "Everyday",
    land_cat_4: "Accessories",
    
    land_trending_title: "Trending Now",
    land_trending_subtitle: "The pieces everyone is talking about.",

    land_partners_title: "Our Official Partners",
    land_partners_subtitle: "Proudly collaborating with Algeria's top fashion brands and boutiques.",
    // Partner Details (New)
    p_maison_spec: "Haute Couture",
    p_maison_desc: "Luxury Kaftans and traditional bridal wear since 1995.",
    p_mode_spec: "Modern Chic",
    p_mode_desc: "Contemporary styles for the everyday elegant woman.",
    p_urban_spec: "Streetwear",
    p_urban_desc: "Bold designs inspired by the streets of Algiers.",
    p_heritage_spec: "Cultural",
    p_heritage_desc: "Preserving ancient techniques in modern cuts.",
    p_sahara_spec: "Organic",
    p_sahara_desc: "Sustainable fabrics inspired by the southern palette.",
    p_algiers_spec: "Trendsetter",
    p_algiers_desc: "The latest viral fashion trends, curated for you.",
    p_visit: "Visit Boutique",

    // Partners Page
    partners_page_title: "Our Partner Brands",
    partners_page_subtitle: "Connect with the designers defining Algerian fashion.",
    partners_contact_info: "Contact Information",
    partners_phone: "Phone",
    partners_email: "Email",
    partners_address: "Address",
    partners_view_collection: "View Collection",

    land_how_title: "How It Works",
    land_how_subtitle: "Your new look in 3 simple steps.",
    
    land_features_eyebrow: "The DZtry Experience",
    land_features_title: "Fashion Meets Technology",
    land_features_subtitle: "We bring the fitting room to your home.",
    land_feat_1_title: "AI Precision",
    land_feat_1_desc: "Fits that look and feel real.",
    land_feat_2_title: "Authentic Design",
    land_feat_2_desc: "Celebrating Algerian heritage.",
    land_feat_3_title: "Privacy First",
    land_feat_3_desc: "Your data is always secure.",

    land_culture_title: "The Heritage Collection",
    land_culture_desc: "Discover the timeless elegance of Algerian traditional wear, reimagined for the modern era.",
    land_culture_btn: "View Collection",
    
    land_footer_title: "Join the Revolution",
    land_footer_subtitle: "Sign up for exclusive offers and style updates.",
    land_footer_disclaimer: "© 2024 DZtryFitting. All rights reserved.",

    // Style Studio
    studio_step1: "Your Photo",
    studio_step1_desc: "Upload a full-body photo for the best fit.",
    studio_btn_upload: "Upload Image",
    studio_btn_camera: "Use Camera",
    studio_drag_drop: "Drop image here",
    studio_step2: "Select Garment",
    studio_tab_collection: "Collection",
    studio_tab_combined: "Mix & Match",
    studio_tab_upload: "Upload Own",
    studio_select_top: "Select Top",
    studio_select_bottom: "Select Bottom",
    studio_step3: "Select Pose",
    studio_btn_generate: "Visualize Look",
    studio_processing: "Creating Magic...",
    studio_placeholder_title: "Ready to Try On?",
    studio_placeholder_desc: "Select your photo and a garment to see the magic happen.",
    studio_original: "Original",
    studio_result: "Virtual Fit",
    studio_designing: "Designing...",
    studio_draping: "Fitting...",
    studio_err_photo: "Please provide a photo.",
    studio_err_garment: "Please select a garment.",
    studio_err_garment_combined: "Please select both a top and a bottom.",
    studio_err_garment_upload: "Please upload a garment.",
    studio_your_photo: "You",
    studio_upload_garment_ph: "Garment Image",
    studio_loading_steps: ["Analyzing...", "Draping...", "Rendering..."],
    studio_compare_hint: "Slide to compare",
    
    // Categories
    cat_tops: "Tops",
    cat_bottoms: "Bottoms",
    cat_dresses: "Dresses",
    cat_traditional: "Traditional",

    // How To Use
    how_title: "User Guide",
    how_subtitle: "Master the art of virtual fitting.",
    how_steps: [
      {
        title: "Snap",
        desc: "Take a clear full-body photo in good lighting.",
        icon: "fa-camera"
      },
      {
        title: "Select",
        desc: "Choose from our exclusive collection or upload your own.",
        icon: "fa-shirt"
      },
      {
        title: "Pose",
        desc: "Pick a pose that matches your mood.",
        icon: "fa-person-walking"
      },
      {
        title: "Style",
        desc: "See the result instantly and find your perfect match.",
        icon: "fa-wand-magic-sparkles"
      }
    ],

    // Common
    contact_title: "Contact Us",
    contact_subtitle: "We're here to help you.",
    contact_tab_msg: "Message",
    contact_tab_book: "Book Stylist",
    form_name: "Name",
    form_email: "Email",
    form_subject: "Subject",
    form_message: "Message",
    form_btn: "Send",
    form_success: "Sent!",
    book_title: "Personal Styling",
    book_subtitle: "Expert advice tailored to you.",
    book_expert_label: "Stylist",
    book_date_label: "Date",
    book_time_label: "Time",
    book_btn: "Book Now",
    book_success: "Confirmed!",
    experts: [
      { name: "Sarah K.", role: "Senior Stylist" },
      { name: "Ahmed B.", role: "Heritage Expert" },
      { name: "Lisa M.", role: "Trend Forecaster" }
    ],
    about_title: "Our Essence",
    about_subtitle: "Where tradition meets innovation.",
    founder_title: "The Vision",
    founder_text: "Bridging the gap between digital convenience and the tactile joy of fashion.",
    mission_title: "Mission",
    mission_text: "To empower individual expression through technology.",
    vision_title: "Vision",
    vision_text: "A world where every fit is perfect.",
    team_title: "The Team",
    team_members: [
        { name: "Amine Z.", role: "CEO" },
        { name: "Leila B.", role: "AI Lead" },
        { name: "Yacine K.", role: "Design" },
        { name: "Noura S.", role: "Marketing" },
        { name: "Sofiane M.", role: "Dev" }
    ],
    join_title: "Careers",
    join_text: "Shape the future of fashion with us.",
    join_btn: "Join Us",
    faq_title: "FAQ",
    faq_subtitle: "Common questions.",
    faq_items: [
      { q: "How accurate is it?", a: "Our AI uses advanced physics for 95%+ accuracy." },
      { q: "Photo requirements?", a: "Full body, good lighting, tight clothes." },
      { q: "Privacy?", a: "Your photos are deleted after the session." },
      { q: "Own clothes?", a: "Yes, use the upload tab." },
      { q: "Speed?", a: "Takes about 10-15 seconds." },
      { q: "Downloads?", a: "Available in high resolution." }
    ]
  },
  ar: {
    // Sidebar
    nav_dashboard: "الرئيسية",
    nav_studio: "ستوديو القياس",
    nav_gallery: "معرضي",
    nav_billing: "الباقات",
    nav_faq: "المساعدة",
    nav_how_to: "طريقة الاستخدام",
    nav_contact: "اتصل بنا",
    nav_about: "قصتنا",
    user_role: "عاشقة الموضة",

    // Landing Page
    land_hero_badge: "تشكيلة 2024 الجديدة",
    land_hero_title_1: "أعيدي تعريف",
    land_hero_title_highlight: "أناقتك.",
    land_hero_subtitle: "اكتشفي تجربة القياس الافتراضي المثالية. من الكاراكو التقليدي إلى الأزياء العصرية، جدي مقاسك المثالي فوراً.",
    land_cta_primary: "ابدأ القياس",
    land_cta_secondary: "تصفح المجموعة",
    land_trust_1: "توصيل 69 ولاية",
    land_trust_2: "دفع آمن",
    land_trust_3: "جودة عالية",

    land_cat_title: "تسوقي حسب الفئة",
    land_cat_1: "تقليدي",
    land_cat_2: "فساتين",
    land_cat_3: "يومي",
    land_cat_4: "إكسسوارات",

    land_trending_title: "الأكثر طلباً",
    land_trending_subtitle: "القطع التي يتحدث عنها الجميع.",

    land_partners_title: "شركاؤنا الرسميون",
    land_partners_subtitle: "نفخر بالتعاون مع أفضل العلامات التجارية والبوتيكات في الجزائر.",
    // Partner Details (New)
    p_maison_spec: "أزياء راقية",
    p_maison_desc: "قفاطين فاخرة وأزياء أعراس تقليدية منذ 1995.",
    p_mode_spec: "عصري أنيق",
    p_mode_desc: "تصاميم معاصرة للمرأة الأنيقة في كل يوم.",
    p_urban_spec: "ملابس الشارع",
    p_urban_desc: "تصاميم جريئة مستوحاة من شوارع الجزائر العاصمة.",
    p_heritage_spec: "تراثي",
    p_heritage_desc: "الحفاظ على التقنيات القديمة في قصات حديثة.",
    p_sahara_spec: "عضوي",
    p_sahara_desc: "أقمشة مستدامة مستوحاة من ألوان الجنوب.",
    p_algiers_spec: "صيحات الموضة",
    p_algiers_desc: "أحدث صيحات الموضة العالمية، مختارة خصيصاً لك.",
    p_visit: "زيارة المتجر",

    // Partners Page
    partners_page_title: "العلامات التجارية الشريكة",
    partners_page_subtitle: "تواصلي مع المصممين الذين يرسمون ملامح الموضة الجزائرية.",
    partners_contact_info: "معلومات الاتصال",
    partners_phone: "الهاتف",
    partners_email: "البريد الإلكتروني",
    partners_address: "العنوان",
    partners_view_collection: "عرض المجموعة",

    land_how_title: "كيف يعمل",
    land_how_subtitle: "مظهرك الجديد في 3 خطوات بسيطة.",

    land_features_eyebrow: "تجربة DZtry",
    land_features_title: "الموضة تلتقي بالتكنولوجيا",
    land_features_subtitle: "نحضر غرفة القياس إلى منزلك.",
    land_feat_1_title: "دقة الذكاء الاصطناعي",
    land_feat_1_desc: "مقاسات تبدو حقيقية تماماً.",
    land_feat_2_title: "تصميم أصيل",
    land_feat_2_desc: "نحتفي بالتراث الجزائري.",
    land_feat_3_title: "خصوصية تامة",
    land_feat_3_desc: "بياناتك آمنة دائماً.",

    land_culture_title: "مجموعة التراث",
    land_culture_desc: "اكتشفي الأناقة الخالدة للأزياء الجزائرية التقليدية، بلمسة عصرية.",
    land_culture_btn: "عرض المجموعة",

    land_footer_title: "انضمي للثورة",
    land_footer_subtitle: "سجلي للحصول على عروض حصرية وتحديثات الموضة.",
    land_footer_disclaimer: "© 2024 DZtryFitting. جميع الحقوق محفوظة.",

    // Style Studio
    studio_step1: "صورتك",
    studio_step1_desc: "ارفعي صورة كاملة للحصول على أفضل نتيجة.",
    studio_btn_upload: "رفع صورة",
    studio_btn_camera: "الكاميرا",
    studio_drag_drop: "اسحبي الصورة هنا",
    studio_step2: "اختيار الملابس",
    studio_tab_collection: "المجموعة",
    studio_tab_combined: "مزج وتنسيق",
    studio_tab_upload: "رفع ملابسي",
    studio_select_top: "اختاري الجزء العلوي",
    studio_select_bottom: "اختاري الجزء السفلي",
    studio_step3: "الوضعية",
    studio_btn_generate: "تخيل المظهر",
    studio_processing: "جاري السحر...",
    studio_placeholder_title: "جاهزة للتجربة؟",
    studio_placeholder_desc: "اختاري صورتك وقطعة الملابس لتبدأ العملية.",
    studio_original: "الأصل",
    studio_result: "النتيجة",
    studio_designing: "جاري التصميم...",
    studio_draping: "جاري القياس...",
    studio_err_photo: "يرجى توفير صورة.",
    studio_err_garment: "يرجى اختيار ملابس.",
    studio_err_garment_combined: "يرجى اختيار قطعة علوية وسفلية.",
    studio_err_garment_upload: "يرجى رفع صورة ملابس.",
    studio_your_photo: "أنتِ",
    studio_upload_garment_ph: "صورة الملابس",
    studio_loading_steps: ["تحليل...", "قياس...", "معالجة..."],
    studio_compare_hint: "اسحبي للمقارنة",
    
    // Categories
    cat_tops: "ملابس علوية",
    cat_bottoms: "ملابس سفلية",
    cat_dresses: "فساتين",
    cat_traditional: "تقليدي",

    // How To Use
    how_title: "دليل المستخدم",
    how_subtitle: "احترفي فن القياس الافتراضي.",
    how_steps: [
      {
        title: "صوري",
        desc: "التقطي صورة واضحة للجسم بالكامل.",
        icon: "fa-camera"
      },
      {
        title: "اختاري",
        desc: "اختاري من مجموعتنا الحصرية أو ارفعي ملابسك.",
        icon: "fa-shirt"
      },
      {
        title: "تألقي",
        desc: "اختاري الوضعية التي تناسب مزاجك.",
        icon: "fa-person-walking"
      },
      {
        title: "اكتشفي",
        desc: "شاهدي النتيجة فوراً وجدي مقاسك المثالي.",
        icon: "fa-wand-magic-sparkles"
      }
    ],

    // Common
    contact_title: "اتصل بنا",
    contact_subtitle: "نحن هنا للمساعدة.",
    contact_tab_msg: "رسالة",
    contact_tab_book: "حجز خبير",
    form_name: "الاسم",
    form_email: "البريد",
    form_subject: "الموضوع",
    form_message: "الرسالة",
    form_btn: "إرسال",
    form_success: "تم الإرسال!",
    book_title: "تنسيق شخصي",
    book_subtitle: "نصائح خبراء مخصصة لك.",
    book_expert_label: "الخبير",
    book_date_label: "التاريخ",
    book_time_label: "الوقت",
    book_btn: "احجز الآن",
    book_success: "تم التأكيد!",
    experts: [
      { name: "سارة ك.", role: "مستشارة أولى" },
      { name: "أحمد ب.", role: "خبير تراث" },
      { name: "ليزا م.", role: "محللة صيحات" }
    ],
    about_title: "جوهرنا",
    about_subtitle: "حيث يلتقي التراث بالابتكار.",
    founder_title: "الرؤية",
    founder_text: "سد الفجوة بين الراحة الرقمية ومتعة الموضة الملموسة.",
    mission_title: "المهمة",
    mission_text: "تمكين التعبير الفردي من خلال التكنولوجيا.",
    vision_title: "الرؤية",
    vision_text: "عالم يكون فيه كل مقاس مثالياً.",
    team_title: "الفريق",
    team_members: [
        { name: "أمين ز.", role: "المدير التنفيذي" },
        { name: "ليلى ب.", role: "رئيسة الذكاء الاصطناعي" },
        { name: "ياسين ك.", role: "تصميم" },
        { name: "نورة س.", role: "تسويق" },
        { name: "سفيان م.", role: "تطوير" }
    ],
    join_title: "وظائف",
    join_text: "اصنعي مستقبل الموضة معنا.",
    join_btn: "انضمي إلينا",
    faq_title: "الأسئلة الشائعة",
    faq_subtitle: "أسئلة شائعة.",
    faq_items: [
      { q: "ما مدى الدقة؟", a: "دقة تزيد عن 95%." },
      { q: "شروط الصورة؟", a: "جسم كامل، إضاءة جيدة." },
      { q: "الخصوصية؟", a: "تحذف الصور بعد الجلسة." },
      { q: "ملابسي الخاصة؟", a: "نعم، استخدمي خيار الرفع." },
      { q: "السرعة؟", a: "حوالي 10-15 ثانية." },
      { q: "التحميل؟", a: "متاح بجودة عالية." }
    ]
  }
};