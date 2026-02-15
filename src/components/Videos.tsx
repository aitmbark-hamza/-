import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

const videoList = [
  { id: 1, url: "/videos/video1.mp4" },
  
];

export const VideoExperience = () => {
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; 
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

      {/* 2. Video Row */}
      <div className="relative mb-20 group/container">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} className="text-gray-900" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight size={28} className="text-gray-900" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-10 pb-10 snap-x snap-mandatory"
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
        </motion.div>
      </div>

      {/* 4. Lightbox Modal */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setExpandedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform duration-300 z-[110]"
              onClick={() => setExpandedVideo(null)}
            >
              <X size={40} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-[9/16] md:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={expandedVideo}
                controls
                autoPlay
                className="w-full h-full rounded-2xl shadow-2xl object-contain bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// VideoCard Component with Hover logic
const VideoCard = ({ videoUrl, onClick }: { videoUrl: string; onClick: () => void; }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        // Attempt to play with voice
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0; // Restart from beginning
        videoRef.current.play().catch(() => {
          // If browser blocks unmuted play, fallback to muted play
          if (videoRef.current) videoRef.current.muted = true;
          videoRef.current?.play();
        });
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    };
  }, [isHovered]);

  return (
    <motion.div 
      whileHover={{ scale: 0.98, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-none w-[300px] md:w-[380px] aspect-[9/16] bg-zinc-900 cursor-pointer overflow-hidden relative rounded-[2rem] shadow-2xl snap-center group"
    >
      <video 
        ref={videoRef}
        src={videoUrl}
        muted 
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        onError={(e) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Video error:', e);
            console.error('Video URL:', videoUrl);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current && process.env.NODE_ENV === 'development') {
            console.log('Video metadata loaded for:', videoUrl);
            console.log('Duration:', videoRef.current.duration, 'seconds');
            console.log('Dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
            console.log('Has video track:', videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0);
          }
        }}
      />
      
      {/* Sound Indicator Overlay */}
      <div className={`absolute top-6 right-6 p-2 rounded-full bg-black/40 backdrop-blur-md text-white transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <Volume2 size={20} />
      </div>

      {/* Decorative Navigation Hints (Arrows) inside card */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft className="text-white/50" size={32} />
        <ChevronRight className="text-white/50" size={32} />
      </div>

      {/* Hover Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0.8, y: isHovered ? 0 : 5 }}
        >
          <p className="text-white text-lg font-medium">عرض التفاصيل</p>
          <p className="text-white/60 text-sm">انقر للتكبير</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoExperience;