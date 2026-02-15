import { useParams, Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Scroll to top on load to ensure Navbar starts in correct state
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedColor = product?.colors[selectedColorIndex];
  const currentImage = selectedColor?.images[0] || product?.images[0];

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">المنتج غير موجود</h1>
          <Link to="/">
            <Button className="bg-secondary text-secondary-foreground">العودة للرئيسية</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const infoRows = [
    { label: "الرمز", value: product.code },
    { label: "السعر", value: product.price },
    { label: "الحد الأدنى للطلب", value: product.moq },
    { label: "الموسم", value: product.season },
    { label: "النوع", value: product.type },
    { label: "المقاسات", value: product.sizes },
    { label: "التوفر", value: product.availability },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* NOTE: Since your Navbar is "fixed" and transparent at the start, 
         we use pt-32 (on mobile) and pt-48 (on desktop) to push content down.
      */}
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 lg:pt-48 pb-20">
        
        {/* Navigation Breadcrumb */}
        <Link
          to="/#catalog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-zinc-900 transition-colors mb-12 text-xs font-bold uppercase tracking-[0.2em]"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للكتالوج
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Smaller, Focused Image Column (5/12 width) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-sm border border-zinc-100 flex items-center justify-center p-8">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Minimalist Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-6 text-center lg:text-right">
                  الألوان المتوفرة
                </h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorIndex(index)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${
                        selectedColorIndex === index
                          ? "border-zinc-900 scale-110 shadow-lg"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedColorIndex === index && (
                        <div className="absolute -inset-1.5 border border-zinc-900/20 rounded-full animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Detailed Info Column (7/12 width) */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h1 className="text-4xl lg:text-6xl font-bold text-zinc-900 mb-6 tracking-tighter">
                {product.name}
              </h1>
              <div className="h-1 w-20 bg-zinc-900 mb-8" />
              <p className="text-xl text-zinc-500 leading-relaxed font-light italic">
                {product.description}
              </p>
            </div>

            {/* Specs Table - Clean & Professional */}
            <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden mb-12 shadow-sm">
              {infoRows.map((row, idx) => (
                <div 
                  key={row.label} 
                  className={`flex justify-between items-center px-8 py-5 ${
                    idx !== infoRows.length - 1 ? "border-b border-zinc-50" : ""
                  }`}
                >
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-400">{row.label}</span>
                  <span className="text-sm font-bold text-zinc-900">{row.value}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/212660628947?text=أريد%20طلب%20المنتج%20${product.code}%20-%20${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#1fa851] text-white shadow-2xl shadow-green-100 rounded-none py-10 gap-4 text-xl font-bold uppercase tracking-widest transition-all transform group-hover:-translate-y-1 active:scale-[0.98]"
              >
                <MessageCircle className="h-6 w-6" />
                Order via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;