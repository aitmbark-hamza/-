import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, MessageCircle } from 'lucide-react';
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
         color === 'black' || 
         color === 'white' ||
         color === 'transparent';
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
      { name: "Green", value: "#129b6bb8", images: ["/modl3/imag5.png"] },
      { name: "Brown", value: "#704900b1", images: ["/modl3/imag6.png"] },
    ]
  },
  {
    id: 4,
    title: "White Scalloped Tank",
    price: "$24.00",
    category: "NEW",
    image: "/modl4/img1.png",
    colors: [
      { name: "Brown", value: "#704900b1", images: ["/modl4/img1.png"] },
      { name: "Pink", value: "#EC4899", images: ["/modl4/img2.png"] },
      { name: "Gold", value: "#c08922b1", images: ["/modl4/img3.png"] },
      { name: "Purple", value: "#934dccb1", images: ["/modl4/img4.png"] },
      { name: "Sky", value: "#70a7e2ff", images: ["/modl4/img5.png"] },
      { name: "Red", value: "#ff0404c0", images: ["/modl4/img6.png"] },
      { name: "Sage", value: "rgba(117, 155, 150, 1)", images: ["/modl4/img7.png"] },
      { name: "Cream", value: "rgba(222, 223, 154, 0.86)", images: ["/modl4/img8.png"] },
    ]
  },
];

export const BestSellers: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});
  
  const activeProduct = products.find(p => p.id === selectedId);
  const selectedColorIndex = selectedId ? selectedColors[selectedId] || 0 : 0;

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  return (
    <section id="new" className="px-4 md:px-6 py-12 md:py-20 max-w-[1600px] mx-auto bg-white font-sans">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* --- LEFT SIDEBAR --- */}
        <div className="lg:w-1/4 flex flex-col justify-between">
          <div className="space-y-8 md:space-y-12 text-right lg:text-left">
            <img src={logoImg} alt="Logo" className="w-16 md:w-20 h-auto opacity-90 mx-auto lg:mx-0" />
            <div className="space-y-4 md:space-y-6">
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-800 block">
                اختيارات الموسم
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[0.9] tracking-tighter">
                الأكثر <br /> طلباً
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-[260px] mx-auto lg:mx-0">
                تشكيلة منتقاة من أكثر البيجامات مبيعاً هذا الموسم
              </p>
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const currentColorIndex = selectedColors[product.id] || 0;
            const currentImage = product.colors[currentColorIndex]?.images[0] || product.image;

            return (
              <div key={product.id} className="flex flex-col group">
                <motion.div
                  layoutId={`img-${product.id}`}
                  className="relative overflow-hidden bg-[#F9F9F9] h-[450px] md:h-[600px] cursor-pointer"
                  onClick={() => setSelectedId(product.id)}
                >
                  <motion.img
                    src={currentImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <Plus className="w-5 h-5 text-slate-900" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white px-2 py-1 text-[8px] md:text-[9px] font-black tracking-widest text-slate-900 uppercase">
                      {product.category}
                    </span>
                  </div>
                </motion.div>

                <div className="mt-3 flex justify-center gap-1.5">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColors(prev => ({ ...prev, [product.id]: index }));
                      }}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 ${
                        currentColorIndex === index ? "border-slate-800 ring-1 ring-slate-300 ring-offset-1" : "border-slate-300"
                      }`}
                      style={{ backgroundColor: isValidColor(color.value) ? color.value : '#ccc' }}
                    />
                  ))}
                </div>

                <div className="mt-3 flex justify-between items-start px-1">
                  <div className="space-y-1 text-left">
                    <h3 className="text-[11px] md:text-[12px] font-bold text-slate-900 uppercase tracking-wider">{product.title}</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Core Collection</p>
                  </div>
                  <span className="text-sm font-light text-slate-900">{product.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md md:p-6"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white w-full max-w-5xl h-[92vh] md:h-auto md:max-h-[90vh] rounded-t-[2.5rem] md:rounded-3xl overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-5 right-5 z-50 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>

              <div className="flex flex-col md:flex-row items-stretch min-h-full">
                
                {/* Image Section - Fixed for Mobile Visibility */}
                <div className="w-full md:w-1/2 bg-[#F7F7F7] flex flex-col">
                  <div className="relative w-full h-[45vh] md:h-[75vh] flex items-center justify-center p-6">
                    <motion.img
                      layoutId={`img-${selectedId}`}
                      src={activeProduct.colors[selectedColorIndex]?.images[0] || activeProduct.image}
                      className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-sm"
                      alt={activeProduct.title}
                    />
                  </div>

                  {/* Color Selection inside Modal */}
                  <div className="p-5 md:p-8 bg-white border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
                      Select Available Color
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {activeProduct.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColors(prev => ({ ...prev, [selectedId!]: index }))}
                          className={`w-9 h-9 md:w-11 md:h-11 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                            selectedColorIndex === index
                              ? "border-slate-900 ring-2 ring-slate-100 ring-offset-2 scale-110"
                              : "border-slate-200"
                          }`}
                          style={{ backgroundColor: isValidColor(color.value) ? color.value : '#ccc' }}
                        >
                          {selectedColorIndex === index && (
                            <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center space-y-6 md:space-y-8">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-blue-700 tracking-[0.3em] uppercase">
                      {activeProduct.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
                      {activeProduct.title}
                    </h3>
                    <div className="flex items-center gap-4 pt-2">
                      <p className="text-2xl md:text-3xl font-light text-slate-900">{activeProduct.price}</p>
                      <span className="text-[9px] bg-green-50 px-2 py-1 font-bold text-green-700 uppercase tracking-widest border border-green-100">
                        In Stock
                      </span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-slate-100" />

                  <div className="space-y-4">
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                      Premium quality fabric designed for ultimate comfort and style. Perfect for your daily relaxation.
                    </p>
                    
                    <a
                      href={`https://wa.me/+212660628947?text=أريد%20طلب%20منتج:%20${activeProduct.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-slate-900 h-14 md:h-16 text-white transition-all hover:bg-slate-800 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                          Order via WhatsApp
                        </span>
                      </div>
                    </a>

                    <div className="flex justify-between items-center pt-2 px-1">
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Fast Delivery</p>
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Secure Payment</p>
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