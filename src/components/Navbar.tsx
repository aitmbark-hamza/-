import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Import your logo
import logoImg from "@/assets/logoImg.png"; 

const menuItems = [
  { label: "الرئيسية", href: "/" },
  { label: "الكتالوج", href: "#catalog" },
  { label: "جديد", href: "#new" },
  { label: "شروط الجملة", href: "#wholesale" },
  { label: "", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl py-6 shadow-md border-b border-zinc-200/50" 
          : "bg-transparent py-10"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8 lg:px-16">
        
        {/* LOGO - ALWAYS BIG */}
        <Link to="/" className="relative z-[110]">
          <img 
            src={logoImg} 
            alt="Logo" 
            /* Kept at a consistent large size (h-24 = 96px) */
            className={`w-auto transition-all duration-500 object-contain h-16 md:h-24 ${
              !scrolled ? "brightness-0 invert" : "brightness-100" 
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-12">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.href === "/" ? (
                <Link
                  to={item.href}
                  className={`text-[12px] font-bold uppercase tracking-[0.4em] transition-all duration-300 hover:tracking-[0.5em] ${
                    scrolled ? "text-zinc-900" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`text-[12px] font-bold uppercase tracking-[0.4em] transition-all duration-300 hover:tracking-[0.5em] ${
                    scrolled ? "text-zinc-900" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="https://wa.me/+212660628947" target="_blank">
            <Button 
              className={`rounded-none h-14 px-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                scrolled 
                  ? "bg-zinc-900 text-white hover:bg-black shadow-lg" 
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              <MessageCircle className="mr-3 h-4 w-4" />
              Wholesale
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden transition-colors z-[110] p-2 ${
            scrolled || open ? "text-zinc-900" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={36} strokeWidth={1} /> : <Menu size={36} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen bg-[#f2f1e9] flex flex-col items-center justify-center z-[105]"
          >
            <ul className="flex flex-col items-center gap-12 text-center">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.href === "/" ? (
                    <Link
                      to={item.href}
                      className="text-4xl font-serif text-zinc-900 hover:tracking-widest transition-all duration-500"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-4xl font-serif text-zinc-900 hover:tracking-widest transition-all duration-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className="pt-10">
                <Button className="bg-zinc-900 text-white rounded-none h-20 px-16 uppercase tracking-[0.3em] text-sm font-bold shadow-2xl">
                   WhatsApp
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;