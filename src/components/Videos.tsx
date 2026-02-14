import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const videoList = [
  { id: 1, url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 2, url: "https://www.w3schools.com/html/movie.mp4" },
  { id: 3, url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, url: "https://www.w3schools.com/html/movie.mp4" },
];

export const VideoExperience = () => {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420; // Width of card + gap
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="about" className="bg-white py-20 overflow-hidden">
      {/* 1. Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900">بيجامات قيد العرض</h2>
      </motion.div>

      {/* 2. Video Row - No Covers, Play on Hover */}
      <div className="relative mb-20">
        {/* Left Navigation Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-gray-800" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-4"
        >
          {videoList.map((video) => (
            <VideoCard 
              key={video.id} 
              videoUrl={video.url} 
              onClick={() => setExpandedVideo(video.url)} 
            />
          ))}
        </div>
      </div>

      {/* 3. The Marquee Text */}
      <div className="relative overflow-hidden whitespace-nowrap border-y border-gray-200 py-8 md:py-12 bg-zinc-50">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex gap-12 md:gap-20 items-center"
        >
          <span className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase text-black leading-none">
           خصومات عند طلب كميات كبيرة
          </span>
          <span 
            className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase text-transparent leading-none" 
            style={{ WebkitTextStroke: '2px black' }}
          >
           خصومات عند طلب كميات كبيرة
          </span>
          {/* Duplicate for seamless loop */}
          <span className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase text-black leading-none">
           خصومات عند طلب كميات كبيرة
          </span>
          <span 
            className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase text-transparent leading-none" 
            style={{ WebkitTextStroke: '2px black' }}
          >
            AWESOME EXPERIENCE
          </span>
        </motion.div>
      </div>

      {/* 4. Lightbox Modal */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setExpandedVideo(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-10 md:right-10 text-white hover:rotate-90 transition-transform duration-300 z-10"
              onClick={() => setExpandedVideo(null)}
              aria-label="Close video"
            >
              <X size={48} strokeWidth={1.5} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={expandedVideo}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component for TikTok-style autoplay logic
const VideoCard = ({ 
  videoUrl, 
  onClick 
}: { 
  videoUrl: string; 
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Intersection Observer to detect when video is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 } // Video needs to be 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-play when in view or hovered
  useEffect(() => {
    if (videoRef.current) {
      if (isInView || isHovered) {
        videoRef.current.play().catch((error) => {
          console.log('Video play failed:', error);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isInView, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={containerRef}
      whileHover={{ scale: 0.97 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="flex-none w-[280px] md:w-[350px] lg:w-[400px] aspect-[4/5] bg-gray-200 cursor-zoom-in overflow-hidden relative rounded-lg shadow-md hover:shadow-xl transition-shadow group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video 
        ref={videoRef}
        src={videoUrl}
        muted 
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      
      {/* Play indicator overlay - shows when video is playing */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium transition-opacity ${(isInView || isHovered) ? 'opacity-100' : 'opacity-0'}`}>
          Playing
        </div>
      </div>

      {/* Click to expand hint */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
          Click to expand
        </div>
      </div>
    </motion.div>
  );
};

// Add alias to match the import in Index.tsx
const OrderProcess = VideoExperience;
export default OrderProcess;