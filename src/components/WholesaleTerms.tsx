import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Camera, X } from 'lucide-react';

const galleryData = [
  { id: 1, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400' },
  { id: 2, url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400' },
  { id: 3, url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400' },
  { id: 4, url: 'https://images.unsplash.com/photo-1539109132314-3477524c859c?auto=format&fit=crop&q=80&w=400' },
  { id: 5, url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400' },
  
];

export const AnimatedGallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const activeItem = galleryData.find(item => item.id === selectedId);

  return (
    <div id="wholesale" className="w-full bg-white overflow-hidden">
      {/* Header */}
      <div className="text-center py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif"
        >
         بيجامات قيد العرض
        </motion.h2>
        <button className="mt-4 inline-flex items-center gap-2 font-bold uppercase tracking-tighter border-b border-black">
          <Camera size={18} /> Upload Media
        </button>
      </div>

      {/* Animated Horizontal Strip */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-10">
        {galleryData.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            whileHover={{ scale: 0.98 }}
            className="flex-none w-64 md:w-80 aspect-[3/4] cursor-pointer"
          >
            <img src={item.url} className="w-full h-full object-cover" alt="Fashion" />
          </motion.div>
        ))}
      </div>

      {/* Modal / Big Image Logic */}
      <AnimatePresence>
        {selectedId && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={`card-${selectedId}`} 
              className="relative max-w-4xl w-full"
            >
              <button className="absolute -top-12 right-0 text-white">
                <X size={32} />
              </button>
              <img 
                src={activeItem.url} 
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wavy Footer Sections - ADD YOUR DIFFERENT TEXT HERE */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[300px]">
        <Section 
          title="جودة مضمونة" 
          description="منتجات عالية الجودة مصنوعة من أجود الأقمشة لضمان رضا عملائك" 
          bg="#f2f1e9" 
          delay={0.1} 
        />
        <Section 
          title="أسعار تنافسية" 
          description="أثمنة الجملة المميزة تضمن لك هامش ربح ممتاز" 
          bg="#8b7e74" 
          delay={0.2} 
          textColor="text-white" 
        />
        <Section 
          title="توصيل سريع" 
          description="شحن سريع لجميع مدن المغرب خلال 24 إلى 72 ساعة" 
          bg="#c4d1d9" 
          delay={0.3} 
        />
      </div>
    </div>
  );
};

// Reusable animated footer section with different description support
const Section = ({ title, description, bg, delay, textColor = "text-gray-900" }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    style={{ backgroundColor: bg }}
    className={`p-16 flex flex-col items-center text-center ${textColor}`}
  >
    <h3 className="text-2xl font-serif mb-4">{title}</h3>
    <p className="text-sm opacity-80 max-w-xs">{description}</p>
  </motion.div>
);

// Add default export to match the import in Index.tsx
const WholesaleTerms = AnimatedGallery;
export default WholesaleTerms;