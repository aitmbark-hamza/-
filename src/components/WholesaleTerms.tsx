// Import necessary React hooks and animation libraries
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For smooth animations and transitions
import { Camera, X } from 'lucide-react'; // Icon components for UI elements

// Gallery data - Array of fashion product images with unique IDs and URLs
// These images will be displayed in the horizontal gallery strip
const galleryData = [
  { id: 1, url: '/modl2/imag4.jpg' },
  { id: 2, url: '/modl3/imag3.png' },
  { id: 3, url: '/modl1/img1.jpg' },
  { id: 4, url: '/modl4/img5.png' },
  { id: 5, url: '/modl2/imag2.jpg' },
  { id: 6, url: '/modl4/img1.png' },
];

// Main AnimatedGallery Component - Displays product gallery with modal functionality
export const AnimatedGallery = () => {
  // State to track which gallery item is currently selected/opened in modal
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // Find the active gallery item based on selected ID for modal display
  const activeItem = galleryData.find(item => item.id === selectedId);

  return (
    <div id="wholesale" className="w-full bg-white overflow-hidden">
      {/* Header Section - Contains title and upload button */}
      <div className="text-center py-12">
        {/* Animated title that fades in when scrolled into view */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible and normal position when in viewport
          className="text-4xl font-serif"
        >
         بيجامات قيد العرض
        </motion.h2>
        {/* Upload media button with camera icon */}
        <button className="mt-4 inline-flex items-center gap-2 font-bold uppercase tracking-tighter border-b border-black">
          <Camera size={18} /> Upload Media
        </button>
      </div>

      {/* Horizontal Gallery Strip - Scrollable row of product images */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-10">
        {galleryData.map((item) => (
          <motion.div
            key={item.id}
            // Layout ID enables smooth animation from thumbnail to full-size modal
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)} // Open modal when clicked
            whileHover={{ scale: 0.98 }} // Slight scale down on hover for feedback
            className="flex-none w-64 md:w-80 aspect-[3/4] cursor-pointer"
          >
            <img src={item.url} className="w-full h-full object-cover" alt={`Fashion product ${item.id}`} onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg';
            }} />
          </motion.div>
        ))}
      </div>

      {/* Modal/Fullscreen Image Viewer - Appears when an image is clicked */}
      <AnimatePresence>
        {selectedId && activeItem && (
          <motion.div
            initial={{ opacity: 0 }} // Start transparent
            animate={{ opacity: 1 }} // Fade in
            exit={{ opacity: 0 }} // Fade out when closing
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedId(null)} // Close modal when clicking backdrop
          >
            {/* Modal content with smooth size animation */}
            <motion.div 
              // Same layout ID as thumbnail creates seamless zoom animation
              layoutId={`card-${selectedId}`} 
              className="relative max-w-4xl w-full"
            >
              {/* Close button in top-right corner */}
              <button className="absolute -top-12 right-0 text-white">
                <X size={32} />
              </button>
              {/* Full-size image display */}
              <img 
                src={activeItem.url} 
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Sections - Three feature cards with different backgrounds and animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[300px]">
        <Section 
          title="جودة مضمونة" 
          description="منتجات عالية الجودة مصنوعة من أجود الأقمشة لضمان رضا عملائك" 
          bg="#f2f1e9" 
          delay={0.1} // Staggered animation delay
        />
        <Section 
          title="أسعار تنافسية" 
          description="أثمنة الجملة المميزة تضمن لك هامش ربح ممتاز" 
          bg="#8b7e74" 
          delay={0.2} 
          textColor="text-white" // White text for dark background
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

// Reusable Section Component - Creates animated footer cards with customizable content
const Section = ({ title, description, bg, delay, textColor = "text-gray-900" }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} // Start invisible and moved down
    whileInView={{ opacity: 1, y: 0 }} // Animate to visible and normal position when in viewport
    transition={{ delay, duration: 0.6 }} // Custom delay and animation duration
    viewport={{ once: true }} // Animation only happens once when first scrolled into view
    style={{ backgroundColor: bg }} // Dynamic background color
    className={`p-16 flex flex-col items-center text-center ${textColor}`}
  >
    <h3 className="text-2xl font-serif mb-4">{title}</h3>
    <p className="text-sm opacity-80 max-w-xs">{description}</p>
  </motion.div>
);

// Export alias to match the import name in Index.tsx
const WholesaleTerms = AnimatedGallery;
export default WholesaleTerms;