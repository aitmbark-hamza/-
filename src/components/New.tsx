import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, MessageCircle } from 'lucide-react';
import logoImg from "@/assets/logoImg.png"; 

interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
}

const products: Product[] = [
  { id: 1, title: "Pink Floral Dress", price: "$48.00", category: "NEW ARRIVAL", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, title: "Pink Polo Dress", price: "$32.00", category: "BEST SELLER", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, title: "Floral Mini Skirt", price: "$28.00", category: "SALE", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, title: "White Scalloped Tank", price: "$24.00", category: "NEW", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200" },
];

export const BestSellers: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const activeProduct = products.find(p => p.id === selectedId);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  return (
    <section id="new" className="px-4 md:px-6 py-12 md:py-20 max-w-[1600px] mx-auto bg-white font-sans">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="lg:w-1/4 flex flex-col justify-between">
          <div className="space-y-8 md:space-y-12 text-right lg:text-left">
            <img src={logoImg} alt="Brand Logo" className="w-16 md:w-20 h-auto opacity-90 mx-auto lg:mx-0" />
            
            <div className="space-y-4 md:space-y-6">
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-blue-800 block">
                اختيارات الموسم
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[0.9] tracking-tighter">
                الأكثر <br /> طلباً
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-[260px] mx-auto lg:mx-0">
                تشكيلة منتقاة من أكثر البيجامات مبيعاً هذا الموسم
              </p>
            </div>
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col group">
              <motion.div 
                layoutId={`img-${product.id}`}
                className="relative overflow-hidden bg-[#F9F9F9] h-[450px] md:h-[600px] cursor-pointer"
                onClick={() => setSelectedId(product.id)}
              >
                <motion.img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <Plus className="w-5 h-5 text-slate-900" />
                   </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="bg-white px-2 py-1 text-[8px] md:text-[9px] font-black tracking-widest text-slate-900 uppercase">
                    {product.category}
                  </span>
                </div>
              </motion.div>

              <div className="mt-4 flex justify-between items-start px-1">
                <div className="space-y-1 text-left">
                  <h3 className="text-[11px] md:text-[12px] font-bold text-slate-900 uppercase tracking-wider">{product.title}</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Core Collection</p>
                </div>
                <span className="text-sm font-light text-slate-900">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && activeProduct && (
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
                    src={activeProduct.image} 
                    className="w-full h-[40vh] md:h-[80vh] object-cover md:object-contain"
                    alt={activeProduct.title}
                  />
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6 md:space-y-10 text-left">
                  <div className="space-y-2 md:space-y-4">
                    <span className="text-[10px] font-black text-blue-700 tracking-[0.3em] uppercase">
                      {activeProduct.category}
                    </span>
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight tracking-tighter">
                      {activeProduct.title}
                    </h3>
                    <div className="flex items-center gap-4 pt-2">
                      <p className="text-2xl md:text-3xl font-light text-slate-900">{activeProduct.price}</p>
                      <span className="text-[9px] bg-slate-100 px-2 py-1 font-bold text-slate-500 uppercase tracking-widest">In Stock</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-slate-100" />

                  <div className="space-y-4">
                    <a
                      href={`https://wa.me/+212660628947?text=أريد%20طلب%20منتج:%20${activeProduct.title}`}
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
    </section>
  );
};
export default BestSellers;