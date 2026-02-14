import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
// Using Music2 as a placeholder for TikTok
import { Music2 } from "lucide-react"; 
import logoImg from "@/assets/logoImg.png"; // Your logo import

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-[#f2f1e9] text-zinc-800 pt-24 pb-12 overflow-hidden border-t border-zinc-200">
      {/* Wave Divider - White to match the section above it */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg className="relative block w-full h-[40px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-5 space-y-8">
            {/* Logo replaces the h3 text */}
            <img 
              src={logoImg} 
              alt="Pijama Plus Logo" 
            className="h-24 md:h-32 lg:h-40 w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            <p className="text-sm leading-relaxed max-w-sm font-light text-zinc-600">
              نحن نجمع بين الراحة المطلقة والتصاميم العصرية. شريككم الأول لتجارة البيجامات بالجملة في المغرب، بجودة تليق بتوقعاتكم.
            </p>
            
            {/* Social Icons with Brand Colors on Hover */}
            <div className="flex gap-4">
              <SocialIcon 
                Icon={Instagram} 
                href="#" 
                hoverClass="hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:to-[#ee2a7b] hover:text-white hover:border-transparent" 
              />
              <SocialIcon 
                Icon={MessageCircle} 
                href="#" 
                hoverClass="hover:bg-[#25D366] hover:text-white hover:border-transparent" 
              />
              <SocialIcon 
                Icon={Music2} 
                href="#" 
                hoverClass="hover:bg-black hover:text-white hover:border-transparent" 
              />
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-zinc-900 text-[11px] font-bold uppercase tracking-[0.3em] mb-8">روابط سريعة</h4>
            <ul className="space-y-5 text-[13px]">
              {["الرئيسية", "الكتالوج", "شروط الجملة", "اتصل بنا"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-zinc-600 hover:text-zinc-900 transition-all duration-300 flex items-center group">
                    <span className="h-[1px] w-0 bg-zinc-900 group-hover:w-4 group-hover:mr-3 transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-zinc-900 text-[11px] font-bold uppercase tracking-[0.3em] mb-8">معلومات التواصل</h4>
            <div className="space-y-6">
              <ContactItem Icon={Phone} text="+212 660 628947" />
              <ContactItem Icon={Mail} text="info@pijamaplus.ma" />
              <ContactItem Icon={MapPin} text="الدار البيضاء، المغرب" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Icon Component
const SocialIcon = ({ Icon, href, hoverClass }: { Icon: any; href: string; hoverClass: string }) => (
  <a 
    href={href} 
    className={`w-11 h-11 flex items-center justify-center border border-zinc-300 rounded-full text-zinc-600 transition-all duration-500 ${hoverClass}`}
  >
    <Icon size={20} strokeWidth={1.5} />
  </a>
);

// Reusable Contact Item
const ContactItem = ({ Icon, text }: { Icon: any; text: string }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
      <Icon size={16} className="text-zinc-400 group-hover:text-zinc-900" />
    </div>
    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">{text}</span>
  </div>
);

export default Footer;