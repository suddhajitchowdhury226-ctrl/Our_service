import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { ThreeHero } from './ThreeHero';

interface HeroSectionProps {
  onServiceSelect: (service: string) => void;
  onStartProject: () => void;
  onSeeWork: () => void;
}

export function HeroSection({ onServiceSelect, onStartProject, onSeeWork }: HeroSectionProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Split headline into characters for stagger animation
    if (headlineRef.current) {
      const text = headlineRef.current.textContent || '';
      headlineRef.current.innerHTML = text
        .split('')
        .map(char => char === ' ' ? '<span class="inline-block">&nbsp;</span>' : `<span class="inline-block">${char}</span>`)
        .join('');

      const chars = headlineRef.current.querySelectorAll('span');
      
      gsap.set(chars, { y: 100, opacity: 0 });
      
      tl.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)'
      });
    }

    // Animate other elements
    if (sublineRef.current) {
      gsap.set(sublineRef.current, { y: 40, opacity: 0 });
      tl.to(sublineRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');
    }

    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('button');
      gsap.set(buttons, { y: 40, opacity: 0 });
      tl.to(buttons, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.3');
    }

    if (statsRef.current) {
      gsap.set(statsRef.current, { y: 20, opacity: 0 });
      tl.to(statsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2');
    }

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(headlineRef.current, {
        x: xPercent * 10,
        y: yPercent * 5,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(ctaRef.current, {
        x: xPercent * 5,
        y: yPercent * 3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeHero onServiceSelect={onServiceSelect} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 
          ref={headlineRef}
          className="font-heading text-6xl md:text-8xl lg:text-9xl mb-6 text-foreground"
        >
          Ideas → Impact, beautifully.
        </h1>
        
        <p 
          ref={sublineRef}
          className="font-body text-xl md:text-2xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Web & mobile products, brand experiences, and growth engines—built with craft.
        </p>

        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            onClick={onStartProject}
            size="lg"
            className="bg-[#5AA8FF] hover:bg-[#4a94e6] text-background font-medium px-8 py-4 text-lg group transition-all duration-300 hover:scale-105"
          >
            Start a Project
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
          
          <Button 
            onClick={onSeeWork}
            variant="outline"
            size="lg"
            className="border-[#B6FF5A] text-[#B6FF5A] hover:bg-[#B6FF5A] hover:text-background font-medium px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
          >
            See Our Work
          </Button>
        </div>

        <div 
          ref={statsRef}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#5AA8FF] rounded-full"></div>
            <span>50+ launches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#B6FF5A] rounded-full"></div>
            <span>avg. +38% conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#5AA8FF] rounded-full"></div>
            <span>5 countries</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}