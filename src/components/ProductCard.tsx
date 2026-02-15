import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import type { Product } from "@/data/products";

// Extension of your Product type to support video
interface ExtendedProduct extends Product {
  videoUrl?: string;
}

const MinimalProductCard = ({ product }: { product: ExtendedProduct }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentColor = product.colors[selectedColorIndex];
  const currentImage = currentColor?.images[0] || product.images[0];

  // Reset fade when color changes
  useEffect(() => {
    setImgLoaded(false);
    setModalImgLoaded(false);
  }, [selectedColorIndex]);

  // Video Autoplay with Sound Logic
  useEffect(() => {
    if (videoRef.current && product.videoUrl) {
      if (isHovered) {
        videoRef.current.muted = false; // Enable voice
        videoRef.current.currentTime = 0; // Restart
        videoRef.current.play().catch(() => {
          // Fallback if browser blocks unmuted play
          if (videoRef.current) videoRef.current.muted = true;
          videoRef.current?.play();
        });
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [isHovered, product.videoUrl]);

  return (
    <>
      <div
        className="relative w-full group overflow-hidden bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. Media Container (Image or Video) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
          {product.videoUrl ? (
            <video
              ref={videoRef}
              src={product.videoUrl}
              loop
              playsInline
              muted
              className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : null}

          <motion.img
            src={currentImage}
            alt={product.name}
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered && product.videoUrl ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* 2. Professional Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center p-6"
              >
                {/* Visual Navigation Buttons inside the card */}
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <ChevronLeft size={18} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <ChevronRight size={18} />
                  </div>
                </div>

                {/* Sound Badge if video is playing */}
                {product.videoUrl && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white">
                        <Volume2 size={14} />
                    </div>
                )}

                {/* Central View Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  onClick={() => setSelectedId(product.id)}
                  className="bg-white text-black px-10 py-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 shadow-xl z-10"
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
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm md:p-6"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-6xl h-[95vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl overflow-hidden relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 z-50 p-2 bg-white shadow-lg rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                {/* Modal Media Section */}
                <div className="w-full md:w-[55%] bg-[#F9F9F9] relative flex items-center justify-center">
                  <motion.img
                    key="modal-image"
                    src={currentColor?.images[0] || product.images[0]} 
                    onLoad={() => setModalImgLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: modalImgLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    alt={product.name}
                  />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-[45%] p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
                   <div className="mb-auto space-y-6">
                        <div>
                            <span className="text-[10px] font-black text-blue-600 tracking-[0.3em] uppercase block mb-2">
                                {product.type || "Collection 2024"}
                            </span>
                            <h3 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-2xl font-light text-slate-900 mt-4">{product.price}</p>
                        </div>

                        <div className="h-px bg-slate-100" />

                        {/* Product Specs Table */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Code</p>
                                <p className="font-medium">{product.code}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">MOQ</p>
                                <p className="font-medium">{product.moq}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                   </div>

                  <div className="pt-8 space-y-4">
                    <a
                      href={`https://wa.me/+212660628947?text=أريد%20طلب%20منتج:%20${product.name}%20-${product.code}`}
                      target="_blank"
                      className="flex items-center justify-center w-full bg-slate-900 h-16 text-white hover:bg-slate-800 transition-colors rounded-xl gap-3"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Order on WhatsApp</span>
                    </a>
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