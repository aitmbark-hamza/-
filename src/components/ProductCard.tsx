import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";

const MinimalProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentImage = product.colors?.[0]?.images[0] || product.images[0];

  return (
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
              <Link to={`/product/${product.id}`}>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="bg-white text-black px-10 py-3 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                >
                  View
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Product Info */}
      <div className="pt-4 pb-4 text-center">
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
  );
};

export default MinimalProductCard;