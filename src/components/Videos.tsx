import { useState, useRef, MouseEvent, useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

const videoData = [
  { id: 1, src: '/video1.mp4', poster: '/path/to/poster1.jpg', title: "L'atmosphère" },
  { id: 2, src: '/video2.mp4', poster: '/path/to/poster2.jpg', title: 'Notre Saison' },
  { id: 3, src: '/video3.mp4', poster: '/path/to/poster3.jpg', title: 'Collaboration' },
  { id: 4, src: '/video4.mp4', poster: '/path/to/poster4.jpg', title: 'Efficacité' }
];


const GallerySection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // --- AUTO-PLAY ON SCROLL LOGIC ---
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => {}); 
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const handleVideoHover = (index: number) => {
    const video = videoRefs.current[index];
    if (video) video.muted = false; 
  };

  const handleVideoLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) video.muted = true; 
  };

  return (
    <section id="galerie" className="section-padding bg-background overflow-hidden py-20">
      <div className="container-custom">
        <AnimatedSection animation="fade-up" className="text-center mb-20">
          <h2 className="heading-section text-foreground uppercase font-bold">
            بيجامات قيد العرض
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
                    muted 
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

      </div>

    </section>
  );
};

export default GallerySection;