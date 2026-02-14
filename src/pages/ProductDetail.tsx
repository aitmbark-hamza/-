import { useParams, Link } from "react-router-dom";
import { ArrowRight, MessageCircle, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif text-slate-900 mb-4">المنتج غير موجود</h1>
          <Link to="/">
            <Button className="bg-slate-900 text-white rounded-none px-8">العودة للرئيسية</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <Link
          to="/#catalog"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 mb-12 transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للكتالوج
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Image Section (Spans 7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#F9F9F9] overflow-hidden group">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Thumbnail Placeholder if you have more images */}
            <div className="grid grid-cols-4 gap-4">
               {product.images.slice(1).map((img, i) => (
                  <div key={i} className="bg-[#F9F9F9] aspect-square">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
               ))}
            </div>
          </div>

          {/* RIGHT: Product Info (Spans 5 columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-8 border-b border-slate-100 pb-8">
              <span className="text-[11px] font-black text-blue-700 tracking-[0.3em] uppercase block mb-4">
                {product.type || "Premium Collection"}
              </span>
              <h1 className="text-5xl font-serif text-slate-900 leading-tight tracking-tighter mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-slate-900">{product.price}</p>
            </div>

            <div className="mb-8">
              <p className="text-slate-500 leading-relaxed text-[15px]">
                {product.description || "تصميم عصري يجمع بين الأناقة والراحة، مصنوع من أجود المواد لضمان المتانة والمظهر الراقي في كل مرة ترتديه."}
              </p>
            </div>

            {/* Clean Specifications Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">الرمز</span>
                <span className="text-sm font-medium text-slate-900">{product.code}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">الموسم</span>
                <span className="text-sm font-medium text-slate-900">{product.season}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">المقاسات</span>
                <span className="text-sm font-medium text-slate-900">{product.sizes}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">الحد الأدنى</span>
                <span className="text-sm font-medium text-slate-900">{product.moq}</span>
              </div>
            </div>

            {/* Action Area */}
            <div className="space-y-6">
              <a
                href={`https://wa.me/212600000000?text=أريد%20طلب%20المنتج%20${product.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-full overflow-hidden bg-slate-900 h-16 text-white transition-all duration-300 ease-out hover:bg-slate-800 active:scale-[0.98]"
              >
                <span className="absolute inset-0 flex h-full w-full -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex items-center gap-3 z-10">
                  <MessageCircle className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                    اطلب الآن عبر واتساب
                  </span>
                </div>
              </a>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-slate-100">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Truck className="h-4 w-4 text-slate-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">شحن سريع</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">جودة مضمونة</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <RefreshCw className="h-4 w-4 text-slate-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">دفع عند الاستلام</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;