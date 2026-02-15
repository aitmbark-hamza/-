import { useParams, Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Share2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <ProductNotFound />;
  }

  const selectedColor = product.colors?.[selectedColorIndex];
  const currentImage = selectedColor?.images[0] || product.images?.[0];

  const infoRows = [
    { label: "الرمز", value: product.code },
    { label: "السعر", value: product.price, isPrice: true },
    { label: "الحد الأدنى للطلب", value: product.moq },
    { label: "الموسم", value: product.season },
    { label: "النوع", value: product.type },
    { label: "المقاسات", value: product.sizes },
    { label: "التوفر", value: product.availability },
  ];

  const whatsappMessage = `Quote Request: ${product.code}`;
  const whatsappUrl = `https://wa.me/212660628947?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-8 pt-32 lg:pt-44 pb-32">
        <TopMetaBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <ProductGallery
            currentImage={currentImage}
            productName={product.name}
            colors={product.colors}
            selectedColorIndex={selectedColorIndex}
            onColorSelect={setSelectedColorIndex}
          />

          <ProductSpecs
            product={product}
            infoRows={infoRows}
            whatsappUrl={whatsappUrl}
          />
        </div>
      </main>

      <Footer />

      <MobileStickyButton whatsappUrl={whatsappUrl} />
    </div>
  );
};

const ProductNotFound = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-light text-zinc-900 mb-6">
        المنتج غير موجود
      </h1>
      <Link to="/">
        <Button
          variant="outline"
          className="rounded-none px-12 uppercase tracking-widest"
        >
          العودة للرئيسية
        </Button>
      </Link>
    </div>
    <Footer />
  </div>
);

const TopMetaBar = () => (
  <div className="flex justify-between items-center mb-12">
    <Link
      to="/#catalog"
      className="group inline-flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
    >
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      Back to Catalog
    </Link>
    <button
      className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
      aria-label="Share product"
    >
      <Share2 className="h-4 w-4" />
    </button>
  </div>
);

const ProductGallery = ({
  currentImage,
  productName,
  colors,
  selectedColorIndex,
  onColorSelect,
}) => (
  <div className="lg:col-span-6 lg:sticky lg:top-44">
    <div className="bg-[#F9F9F9] rounded-[2rem] overflow-hidden aspect-[3/4] flex items-center justify-center p-4 sm:p-12 relative group">
      <img
        src={currentImage}
        alt={productName}
        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 ease-in-out group-hover:scale-110"
      />
      <div className="absolute bottom-6 right-6">
        <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-100 text-[10px] font-bold uppercase tracking-widest text-zinc-600 shadow-sm">
          Full Screen
        </div>
      </div>
    </div>

    {colors && colors.length > 0 && (
      <ColorSelector
        colors={colors}
        selectedColorIndex={selectedColorIndex}
        onColorSelect={onColorSelect}
      />
    )}
  </div>
);

const ColorSelector = ({ colors, selectedColorIndex, onColorSelect }) => (
  <div className="mt-8 flex flex-col items-center">
    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-300 mb-4">
      Select Aesthetic
    </span>
    <div className="flex flex-wrap justify-center gap-5">
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => onColorSelect(index)}
          className={`w-8 h-8 rounded-full transition-all duration-500 relative ${
            selectedColorIndex === index
              ? "scale-125"
              : "scale-100 opacity-40 hover:opacity-100"
          }`}
          style={{ backgroundColor: color.value }}
          aria-label={`Select ${color.name || `color ${index + 1}`}`}
          aria-pressed={selectedColorIndex === index}
        >
          {selectedColorIndex === index && (
            <div className="absolute -inset-2 border border-zinc-900 rounded-full" />
          )}
        </button>
      ))}
    </div>
  </div>
);

const ProductSpecs = ({ product, infoRows, whatsappUrl }) => (
  <div className="lg:col-span-6">
    <ProductHeader product={product} />
    <SpecsList infoRows={infoRows} />
    <CTASection whatsappUrl={whatsappUrl} productCode={product.code} />
  </div>
);

const ProductHeader = ({ product }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <span className="h-[1px] w-8 bg-zinc-900" />
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-900">
        {product.type}
      </span>
    </div>
    <h1 className="text-5xl lg:text-7xl font-bold text-zinc-900 mb-8 tracking-tighter leading-[0.9]">
      {product.name}
    </h1>
    <p className="text-xl text-zinc-500 leading-relaxed font-light max-w-lg mb-10">
      {product.description}
    </p>
  </div>
);

const SpecsList = ({ infoRows }) => (
  <div className="space-y-0 border-t border-zinc-100 mb-12">
    {infoRows.map((row) => (
      <div
        key={row.label}
        className="flex justify-between items-baseline py-6 border-b border-zinc-100"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
          {row.label}
        </span>
        <span
          className={`text-sm tracking-tight ${
            row.isPrice
              ? "text-2xl font-bold text-zinc-900"
              : "font-medium text-zinc-900"
          }`}
        >
          {row.value}
        </span>
      </div>
    ))}
  </div>
);

const CTASection = ({ whatsappUrl, productCode }) => (
  <div className="space-y-6">
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <Button
        size="xl"
        className="w-full bg-zinc-900 hover:bg-black text-white rounded-none py-10 gap-4 text-xs font-bold uppercase tracking-[0.3em] transition-all group"
      >
        <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-125" />
        Request Wholesale Quote
      </Button>
    </a>

    <div className="flex items-center justify-center gap-8 text-zinc-400 py-4">
      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
        <ShieldCheck className="h-3 w-3" /> Secure Wholesale
      </div>
      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
        <ArrowRight className="h-3 w-3" /> Worldwide Shipping
      </div>
    </div>
  </div>
);

const MobileStickyButton = ({ whatsappUrl }) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-zinc-100 z-[90]">
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <Button className="w-full bg-zinc-900 text-white rounded-none h-16 uppercase tracking-widest font-bold text-[10px]">
        Order via WhatsApp
      </Button>
    </a>
  </div>
);

export default ProductDetail;