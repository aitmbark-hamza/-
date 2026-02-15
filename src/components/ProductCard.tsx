import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageCircle } from "lucide-react";
import type { Product } from "@/data/products";

const MinimalProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const currentColor = product.colors[selectedColorIndex];
  const currentImage = currentColor?.images[0] || product.images[0];

  return (
    <>
      <div
        className="relative w-full group overflow-hidden bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. The Clean Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
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
                {/* Central Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  onClick={() => setSelectedId(product.id)}
                  className="bg-white text-black px-10 py-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                >
                  View
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
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>

        {/* 4. Product Info */}
        <div className="pt-3 pb-4 text-center">
          <h3 className="text-[12px] font-light text-zinc-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {product.name}
          </h3>
          {product.colors && product.colors.length > 1 && (
            <p className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {product.colors.length} ألوان متاحة
            </p>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm md:p-6"
            onClick={() => setSelectedId(null)}
          >
            {/* Modal Content Card */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-none overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button for Mobile */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full md:p-3 hover:bg-slate-100"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />
              </button>
              
              <div className="flex flex-col md:flex-row items-stretch">
                
                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-[#F9F9F9]">
                  <motion.img 
                    layoutId={`img-${selectedId}`}
                    src={currentColor?.images[0] || product.images[0]} 
                    className="w-full h-[40vh] md:h-[80vh] object-cover md:object-contain"
                    alt={product.name}
                  />
                  
                  {/* Color Swatches in Modal */}
                  <div className="p-6 bg-white border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
                      Select Color
                    </h4>
                    <div className="flex justify-center gap-3">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColorIndex(index)}
                          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
                            selectedColorIndex === index
                              ? "border-slate-900 ring-2 ring-slate-200 ring-offset-2"
                              : "border-slate-300"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                          aria-label={`Select ${color.name} color`}
                        >
                          {selectedColorIndex === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    {currentColor && (
                      <p className="text-sm text-slate-600 mt-3 text-center">
                        Selected: {currentColor.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6 md:space-y-8 text-left">
                  <div className="space-y-2 md:space-y-4">
                    <span className="text-[10px] font-black text-blue-700 tracking-[0.3em] uppercase">
                      {product.type || "Premium Collection"}
                    </span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight tracking-tighter">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-4 pt-2">
                      <p className="text-2xl md:text-3xl font-light text-slate-900">{product.price}</p>
                      <span className="text-[9px] bg-slate-100 px-2 py-1 font-bold text-slate-500 uppercase tracking-widest">
                        {product.availability}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-slate-100" />

                  {/* Product Description */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Description</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Complete Product Information Table */}
                  <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="p-4 border-r border-b border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Code</span>
                        <span className="text-sm font-medium text-slate-900">{product.code}</span>
                      </div>
                      <div className="p-4 border-b border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Season</span>
                        <span className="text-sm font-medium text-slate-900">{product.season}</span>
                      </div>
                      <div className="p-4 border-r border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Type</span>
                        <span className="text-sm font-medium text-slate-900">{product.type}</span>
                      </div>
                      <div className="p-4 border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">MOQ</span>
                        <span className="text-sm font-medium text-slate-900">{product.moq}</span>
                      </div>
                      <div className="p-4 border-r border-b border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Sizes</span>
                        <span className="text-sm font-medium text-slate-900">{product.sizes}</span>
                      </div>
                      <div className="p-4 border-b border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Availability</span>
                        <span className="text-sm font-medium text-slate-900">{product.availability}</span>
                      </div>
                      <div className="p-4 border-r border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Colors</span>
                        <span className="text-sm font-medium text-slate-900">{product.colors.length} Available</span>
                      </div>
                      <div className="p-4 border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Date Added</span>
                        <span className="text-sm font-medium text-slate-900">{product.dateAdded}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-slate-100" />

                  <div className="space-y-4">
                    <a
                      href={`https://wa.me/+212660628947?text=أريد%20طلب%20منتج:%20${product.name}%20-%20${product.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center w-full bg-slate-900 h-14 md:h-16 text-white transition-all hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-3 z-10">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                          Order via WhatsApp
                        </span>
                      </div>
                    </a>
                    
                    <div className="flex justify-between items-center px-1">
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