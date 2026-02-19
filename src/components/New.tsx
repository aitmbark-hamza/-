import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, MessageCircle, ShoppingBag } from 'lucide-react';
import logoImg from "@/assets/logoImg.png";

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  colors: {
    name: string;
    value: string;
    images: string[];
  }[];
}

const isValidColor = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color) || 
         /^rgba?\(/.test(color) || 
         ['black', 'white', 'transparent'].includes(color.toLowerCase());
};

const products: Product[] = [
  {
    id: 1,
    title: "Pink Floral Dress",
    price: "$48.00",
    category: "NEW ARRIVAL",
    image: "/modl1/img1.jpg",
    colors: [
      { name: "Pink", value: "#3B82F6", images: ["/modl1/img1.jpg"] },
      { name: "Blue", value: "#00cb84ff", images: ["/modl1/img2.jpg"] },
      { name: "White", value: "#EC4899", images: ["/modl1/img3.jpg"] },
      { name: "Orange", value: "#ec7948ff", images: ["/modl1/img4.jpg"] },
    ]
  },
  {
    id: 2,
    title: "Pink Polo Dress",
    price: "$32.00",
    category: "BEST SELLER",
    image: "/modl2/img1.jpg",
    colors: [
      { name: "White", value: "#00cb84ff", images: ["/modl2/imag4.jpg"] },
      { name: "Pink", value: "#EC4899", images: ["/modl2/imag1.jpg"] },
      { name: "Blue", value: "#b08431ff", images: ["/modl2/imag2.jpg"] },
      { name: "White", value: "#062e92ff", images: ["/modl2/imag3.jpg"] },
    ]
  },
  {
    id: 3,
    title: "Floral Mini Skirt",
    price: "$28.00",
    category: "SALE",
    image: "/modl3/imag1.jpg",
    colors: [
      { name: "Black", value: "black", images: ["/modl3/imag1.png"] },
      { name: "Teal", value: "#009fcbff", images: ["/modl3/imag2.png"] },
      { name: "Lavender", value: "#b78dcaff", images: ["/modl3/imag3.png"] },
      { name: "Gold", value: "#a9963aff", images: ["/modl3/imag4.png"] },
    ]
  },
  {
    id: 4,
    title: "White Scalloped",
    price: "$24.00",
    category: "NEW",
    image: "/modl4/img1.png",
    colors: [
      { name: "Brown", value: "#704900b1", images: ["/modl4/img1.png"] },
      { name: "Pink", value: "#EC4899", images: ["/modl4/img2.png"] },
      { name: "Gold", value: "#c08922b1", images: ["/modl4/img3.png"] },
      { name: "Purple", value: "#934dccb1", images: ["/modl4/img4.png"] },
    ]
  },
];

export const BestSellers: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});
  const [imgLoaded, setImgLoaded] = useState<{ [key: number]: boolean }>({});
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  
  const activeProduct = products.find(p => p.id === selectedId);
  const selectedColorIndex = selectedId ? selectedColors[selectedId] || 0 : 0;

  useEffect(() => {
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    products.forEach(product => {
      product.colors.forEach(color => color.images.forEach(image => preload(image)));
      preload(product.image);
    });
  }, []);

  useEffect(() => {
    if (selectedId) {
      setModalImgLoaded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId, selectedColorIndex]);

  return (
    <section id="new" className="px-2 md:px-6 py-10 md:py-20 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* --- SIDEBAR --- */}
        <div className="w-full lg:w-1/4 flex flex-col space-y-4 md:space-y-8 text-center lg:text-left px-2">
          <img src={logoImg} alt="Logo" className="w-12 md:w-20 h-auto opacity-90 mx-auto lg:mx-0" />
          <div className="space-y-2 md:space-y-4">
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] text-blue-800 block">
            اختيارات الموسم
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-slate-900 leading-none tracking-tighter">
             الأكثر <br className="hidden lg:block" /> مبيعًا
            </h2>
            <p className="text-slate-500 text-xs md:text-base leading-relaxed max-w-[280px] mx-auto lg:mx-0">
            مجموعة منتقاة بعناية من أكثر القطع رواجًا وإقبالًا هذا الموسم
            </p>
          </div>
        </div>

        {/* --- PRODUCT GRID (Fixed 4 Columns) --- */}
        <div className="w-full lg:w-3/4 grid grid-cols-4 gap-2 md:gap-6">
          {products.map((product) => {
            const currentColorIdx = selectedColors[product.id] || 0;
            const currentImg = product.colors[currentColorIdx]?.images[0] || product.image;

            return (
              <div key={product.id} className="flex flex-col group min-w-0">
                <motion.div
                  className="relative overflow-hidden bg-[#F9F9F9] h-[180px] sm:h-[350px] md:h-[550px] cursor-pointer"
                  onClick={() => setSelectedId(product.id)}
                >
                  <motion.img
                    src={currentImg}
                    alt={product.title}
                    onLoad={() => setImgLoaded(prev => ({ ...prev, [product.id]: true }))}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imgLoaded[product.id] ? 1 : 0 }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-1 left-1 sm:top-3 sm:left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-1 py-0.5 text-[6px] sm:text-[9px] font-bold tracking-tighter text-slate-900 uppercase">
                      {product.category}
                    </span>
                  </div>

                  {/* Desktop Hover Quick View */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center">
                    <div className="bg-white p-3 rounded-full shadow-xl">
                      <Plus className="w-5 h-5 text-slate-900" />
                    </div>
                  </div>
                </motion.div>

                {/* Color Dots */}
                <div className="mt-2 flex justify-center gap-1">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, [product.id]: idx }));
                      }}
                      className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full border transition-all ${
                        currentColorIdx === idx ? "border-slate-800 ring-1 ring-offset-1 ring-slate-200" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>

                {/* Info Area */}
                <div className="mt-2 text-center px-1">
                  <h3 className="text-[9px] sm:text-[13px] font-bold text-slate-900 uppercase truncate">
                    {product.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm font-light text-slate-500">{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RESPONSIVE MODAL --- */}
      <AnimatePresence>
        {selectedId && activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-6"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-[2rem] md:rounded-3xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full md:hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Modal Media */}
                <div className="w-full md:w-1/2 bg-[#F6F6F6] h-2/5 md:h-auto flex items-center justify-center p-8">
                  <motion.img
                    src={activeProduct.colors[selectedColorIndex]?.images[0] || activeProduct.image}
                    animate={{ opacity: modalImgLoaded ? 1 : 0 }}
                    onLoad={() => setModalImgLoaded(true)}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Modal Details */}
                <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between overflow-y-auto bg-white">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{activeProduct.category}</span>
                    <h2 className="text-2xl md:text-4xl font-serif text-slate-900">{activeProduct.title}</h2>
                    <p className="text-xl font-light text-slate-800">{activeProduct.price}</p>
                    
                    <div className="pt-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Available Colors</p>
                      <div className="flex gap-3">
                        {activeProduct.colors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedColors(prev => ({ ...prev, [selectedId!]: idx }))}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${
                              selectedColorIndex === idx ? "border-slate-900 scale-110" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color.value }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <a
                      href={`https://wa.me/+212660628947?text=Hello,%20I%20want%20to%20order%20the%20${activeProduct.title}`}
                      target="_blank"
                      className="flex items-center justify-center w-full bg-slate-900 h-14 text-white rounded-xl gap-3 hover:bg-black transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Order via WhatsApp</span>
                    </a>
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest px-2">
                      <span>Premium Quality</span>
                      <span>Secure Checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BestSellers;