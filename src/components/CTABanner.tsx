import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTABanner = () => {
  return (
    <section className="py-24 bg-[#f2f1e9] border-y border-zinc-200">
      <div className="container mx-auto px-6 text-center">
        {/* Subtle Label */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6 block"
        >
          Partner With Us
        </motion.span>

        {/* Main Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-zinc-900 mb-6 max-w-3xl mx-auto leading-tight"
        >
          جاهز لبدء طلبك بالجملة؟
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-600 text-base md:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed"
        >
          تواصل معنا الآن عبر واتساب واحصل على أفضل الأسعار والعروض الحصرية للتجار والموزعين.
        </motion.p>

        {/* Clean Professional Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://wa.me/+212660628947?text=أريد%20طلب%20الكتالوج"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button 
              size="lg" 
              className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-none h-14 px-10 gap-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="h-4 w-4" />
              تواصل معنا عبر واتساب
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;