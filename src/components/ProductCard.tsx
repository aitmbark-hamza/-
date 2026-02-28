import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";

interface ExtendedProduct extends Product {
  videoUrl?: string;
}

const MinimalProductCard = ({ product }: { product: ExtendedProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentColor = product.colors[selectedColorIndex];
  const currentImage = currentColor?.images[0] || product.images[0];

  useEffect(() => {
    if (videoRef.current && product.videoUrl) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, product.videoUrl]);

  return (
    <>
      <div
        className="group relative flex flex-col bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div 
          className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#f6f6f6] cursor-pointer"
          onClick={() => setSelectedId(product.id)}
        >
          {/* Video Layer */}
          {product.videoUrl && (
            <video
              ref={videoRef}
              src={product.videoUrl}
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          <motion.img
            src={currentImage}
            alt={product.name}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isHovered && product.videoUrl ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Quick Add Button - Desktop: Slide up | Mobile: Static Icon */}
          <div className="absolute bottom-0 right-0 p-2 sm:p-0 sm:inset-x-0">
            {/* Desktop Version */}
            <motion.button
              initial={{ y: "100%" }}
              animate={{ y: isHovered ? 0 : "100%" }}
              className="hidden sm:flex w-full bg-white/90 backdrop-blur-md py-4 text-[10px] font-bold uppercase tracking-[0.2em] items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedId(product.id); }}
            >
              Quick View <Plus size={14} />
            </motion.button>
            
            {/* Mobile Version (Visible on touch devices) */}
            <button 
              className="sm:hidden w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center"
              onClick={(e) => { e.stopPropagation(); setSelectedId(product.id); }}
            >
              <Plus size={18} className="text-slate-900" />
            </button>
          </div>
        </div>

        {/* Info - Centered on mobile, left-aligned on desktop if you prefer */}
        <div className="mt-3 px-1 flex flex-col items-center text-center">
          <h3 className="text-[12px] sm:text-[13px] font-medium text-slate-800 tracking-tight leading-tight">
            {product.name}
          </h3>
          <p className="text-[12px] text-slate-500 font-light mt-0.5">{product.price}</p>
          
          <div className="flex gap-2 mt-2.5">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColorIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ring-offset-2 ${
                  selectedColorIndex === index ? "ring-1 ring-slate-400" : ""
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL (Responsive Bottom Sheet on Mobile) --- */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-[2px]"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white w-full sm:max-w-4xl h-[92vh] sm:h-auto sm:max-h-[85vh] rounded-t-[2rem] sm:rounded-none overflow-hidden flex flex-col sm:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button (Universal) */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-5 right-5 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full sm:bg-transparent"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full sm:w-1/2 bg-[#f9f9f9] h-[45%] sm:h-auto relative p-8">
                <img 
                  src={currentImage} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                  alt="" 
                />
              </div>

              {/* Details Section */}
              <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col overflow-y-auto">
                <div className="mb-auto">
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">New Collection</span>
                  <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mt-2">{product.name}</h2>
                  <p className="text-lg text-slate-500 mt-1">{product.price}</p>

                  <div className="mt-8">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3">Color</p>
                    <div className="flex gap-3">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColorIndex(index)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColorIndex === index ? "border-slate-900" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed font-light">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Sticky Mobile Action Area */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a
                    href={`https://wa.me/+212754717702?text=Product:%20${product.name}`}
                    target="_blank"
                    className="flex items-center justify-center w-full bg-slate-900 h-14 text-white rounded-full sm:rounded-none gap-3 hover:bg-black transition-all"
                  >
                    <ShoppingBag size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Order via WhatsApp</span>
                  </a>
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