import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f2f1e9]">
      {/* 1. Cinematic Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full bg-cover bg-center grayscale-[10%]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* The 'Big Brand' Overlay: Dark at top, clear middle, beige at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f2f1e9]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1400px] px-6">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Label - Small, Wide, Bold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <span className="px-4 py-1.5 border border-white/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.5em]">
              Collection 2026
            </span>
          </motion.div>

          {/* Luxury Typography Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-8 tracking-tighter"
          >
            موزع بيجامات <br /> 
            <span className="italic font-light text-white/90">بالجملة</span>
          </motion.h1>

          {/* Clean Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm md:text-base text-white/80 mb-12 max-w-lg mx-auto uppercase tracking-[0.2em] font-light"
          >
            جودة عالية • أثمنة تنافسية • توصيل سريع
          </motion.p>

          {/* Action Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <a href="https://wa.me/+212660628947" target="_blank" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-white text-black hover:bg-black hover:text-white rounded-none h-16 px-12 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 group">
                <MessageCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                اطلب الآن
              </Button>
            </a>

            <a href="#catalog" className="group flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-[0.3em] py-4">
              تصفح الكتالوج 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* 2. Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;