import { useState, useRef, MouseEvent, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, Search } from 'lucide-react';



const videoData = [
  { id: 1, src: '/video1.mp4', poster: '/path/to/poster1.jpg', title: "L'atmosphère" },
  { id: 2, src: '/video2.mp4', poster: '/path/to/poster2.jpg', title: 'Notre Saison' },
  { id: 3, src: '/video3.mp4', poster: '/path/to/poster3.jpg', title: 'Collaboration' },
  { id: 4, src: '/video4.mp4', poster: '/path/to/poster4.jpg', title: 'Efficacité' }
];

const galleryImages = [
  { src: '/modl1/img1.jpg', title: 'Photo 1', ingredients: ["Description: vérifier l'image et modifier"] },
  { src: '/modl1/img2.jpg', title: 'Photo 2', ingredients: ["Description: vérifier l'image et modifier"] },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const rafId = useRef<number | null>(null);
  const speedRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // --- AUTO-PLAY ON SCROLL LOGIC ---
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => {}); // Start playing when section is in view
        } else {
          video.pause(); // Stop when user scrolls away
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const autoScrollStep = () => {
    if (!scrollRef.current || speedRef.current === 0 || isDragging.current) {
      rafId.current = null;
      return;
    }
    scrollRef.current.scrollLeft += speedRef.current;
    rafId.current = requestAnimationFrame(autoScrollStep);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging.current && scrollRef.current) {
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
      return;
    }

    const el = scrollRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const xRelative = e.clientX - rect.left;
    const edgeSize = rect.width * 0.2;

    if (xRelative < edgeSize) {
      const intensity = (edgeSize - xRelative) / edgeSize;
      speedRef.current = -intensity * 10;
    } else if (xRelative > rect.width - edgeSize) {
      const intensity = (xRelative - (rect.width - edgeSize)) / edgeSize;
      speedRef.current = intensity * 10;
    } else {
      speedRef.current = 0;
    }

    if (speedRef.current !== 0 && !rafId.current && !isDragging.current) {
      rafId.current = requestAnimationFrame(autoScrollStep);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
    speedRef.current = 0;
  };

  const stopScrolling = () => {
    isDragging.current = false;
    speedRef.current = 0;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleVideoHover = (index: number) => {
    const video = videoRefs.current[index];
    if (video) video.muted = false; // Unmute to let user hear sound on hover
  };

  const handleVideoLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) video.muted = true; // Re-mute
  };

  return (
    <section id="galerie" className="section-padding bg-background overflow-hidden py-20">
      <div className="container-custom">
        <AnimatedSection animation="fade-up" className="text-center mb-20">
          <span className="section-divider block mb-10">- CHOIX SPÉCIAL -</span>
          <h2 className="heading-section text-foreground uppercase font-bold">
            Plats Populaires
          </h2>
        </AnimatedSection>

        {/* Video Mosaic Grid */}
        <div className="mb-16 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
            {videoData.map((video, index) => (
              <AnimatedSection 
                key={video.id}
                animation="fade-up" 
                delay={index * 150} 
                className={index === 0 ? "col-span-2 row-span-2" : index === 1 ? "col-span-2 row-span-1" : "col-span-1 row-span-1"}
              >
                <div
                  onMouseEnter={() => handleVideoHover(index)}
                  onMouseLeave={() => handleVideoLeave(index)}
                  className="relative h-full w-full overflow-hidden rounded-2xl bg-black group"
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    poster={video.poster}
                    playsInline
                    loop
                    muted // Essential for autoplay
                    autoPlay
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-bold text-lg">{video.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => scrollCarousel('left')} className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scrollCarousel('right')} className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative group/carousel">
        <div
          ref={scrollRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-20 scrollbar-hide select-none"
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          {galleryImages.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <AnimatedSection animation="scale" delay={index * 30}>
                <div 
                  onClick={() => !isDragging.current && setSelectedImage(index)}
                  className="group block"
                >
                  <div className="relative w-72 md:w-80 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group-hover:-rotate-1">
                    {/* Polaroid card */}
                    <div className="bg-white p-3 rounded-xl shadow-lg overflow-hidden">
                      <div className="relative overflow-hidden rounded-md">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Center hover icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/50 rounded-full p-3 text-white">
                            <Search className="h-6 w-6" />
                          </div>
                        </div>
                      </div>

                      {/* Polaroid caption */}
                      <div className="mt-3 text-center">
                        <h4 className="text-sm font-medium text-foreground">{image.title}</h4>
                           <p className="text-sm text-muted-foreground mt-1">{image.ingredients?.[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="mt-16 overflow-hidden">
        <div className="marquee-scroll flex whitespace-nowrap">
          {['DÉLICIEUX', 'AWESOME', 'EXPÉRIENCE', 'CUISINE', 'DÉLICIEUX', 'AWESOME', 'EXPÉRIENCE', 'CUISINE'].map((text, i) => (
            <span key={i} className={i % 2 === 0 ? "marquee-text mx-8" : "marquee-text-filled mx-8"}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-background p-0 border-none">
          {selectedImage !== null && (
            <div className="relative flex items-center justify-center bg-black/90 h-[80vh]">
              <img src={galleryImages[selectedImage].src} className="max-h-full object-contain" />
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white"><X /></button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;