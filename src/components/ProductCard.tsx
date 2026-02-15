import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";

const MinimalProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentColor = product.colors[selectedColorIndex];
  const currentImage = currentColor?.images[0] || product.images[0];

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  return (
    <>
      <div
        className="relative w-full group overflow-hidden bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. The Clean Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F9F9F9]">
          <motion.img
            src={currentImage}
            alt={product.name}
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full object-cover"
          />

          {/* 2. Professional Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center p-6"
              >
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  onClick={() => setSelectedId(product.id)}
                  className="bg-white text-black px-10 py-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                >
                  View Details
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Color Swatches */}
        <div className="mt-3 flex justify-center gap-1.5">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColorIndex(index);
              }}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                selectedColorIndex === index
                  ? "border-slate-800 ring-1 ring-slate-300 ring-offset-1"
                  : "border-slate-300"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>

        {/* 4. Product Info */}
        <div className="pt-2 pb-4 text-center">
          <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest">
            {product.name}
          </h3>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">
            {product.price}
          </p>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && (
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
              className="bg-white w-full max-w-5xl h-[92vh] md:h-auto md:max-h-[90vh] rounded-t-[2rem] md:rounded-3xl overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-5 right-5 z-50 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>
              
              <div className="flex flex-col md:flex-row items-stretch min-h-full">
                
                {/* Image Section - Responsive Optimized */}
                <div className="w-full md:w-1/2 bg-[#F7F7F7] flex flex-col">
                  <div className="relative w-full h-[45vh] md:h-[75vh] flex items-center justify-center p-6">
                    <motion.img 
                      layoutId={`img-${selectedId}`}
                      src={currentColor?.images[0] || product.images[0]} 
                      className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-sm"
                      alt={product.name}
                    />
                  </div>
                  
                  {/* Color Picker Section */}
                  <div className="p-5 md:p-8 bg-white border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
                      Select Available Color
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColorIndex(index)}
                          className={`w-9 h-9 md:w-11 md:h-11 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                            selectedColorIndex === index
                              ? "border-slate-900 ring-2 ring-slate-100 ring-offset-2 scale-110"
                              : "border-slate-200"
                          }`}
                          style={{ backgroundColor: color.value }}
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
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-blue-700 tracking-[0.3em] uppercase">
                      {product.type || "Premium Collection"}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-4 pt-2">
                      <p className="text-2xl md:text-3xl font-light text-slate-900">{product.price}</p>
                      <span className="text-[9px] bg-green-50 px-2 py-1 font-bold text-green-700 uppercase tracking-widest border border-green-100">
                        {product.availability || "In Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-slate-100" />

                  {/* Info Grid */}
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-2 gap-0">
                      {[
                        { label: 'Code', value: product.code },
                        { label: 'Season', value: product.season },
                        { label: 'Type', value: product.type },
                        { label: 'MOQ', value: product.moq },
                        { label: 'Sizes', value: product.sizes },
                        { label: 'Added', value: product.dateAdded }
                      ].map((item, idx) => (
                        <div key={idx} className={`p-4 ${idx % 2 === 0 ? 'border-r' : ''} border-b border-slate-50`}>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{item.label}</span>
                          <span className="text-sm font-medium text-slate-900">{item.value || "N/A"}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={`https://wa.me/+212660628947?text=أريد%20طلب%20منتج:%20${product.name}%20-%20${product.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-slate-900 h-14 md:h-16 text-white transition-all hover:bg-slate-800 rounded-xl"
                    >
                      <MessageCircle className="h-5 w-5 mr-3" />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                        Order via WhatsApp
                      </span>
                    </a>
                    
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Secure Checkout</p>
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Global Shipping</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MinimalProductCard;