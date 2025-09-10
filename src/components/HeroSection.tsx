import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from './ui/button';
import { ThreeHero } from './ThreeHero';
import { Star, Sparkles, Zap } from 'lucide-react';

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
  const starsRef = useRef<HTMLDivElement>(null);
  const innovativeElementsRef = useRef<HTMLDivElement>(null);

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

    // Switching star animations
    if (starsRef.current) {
      const stars = starsRef.current.querySelectorAll('.switching-star');
      
      stars.forEach((star, index) => {
        const starElement = star as HTMLElement;
        
        // Initial random positions
        gsap.set(starElement, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2
        });

        // Switching animation - stars change position and properties
        gsap.to(starElement, {
          x: () => Math.random() * window.innerWidth,
          y: () => Math.random() * window.innerHeight,
          scale: () => Math.random() * 1.5 + 0.3,
          opacity: () => Math.random() * 0.9 + 0.1,
          rotation: () => Math.random() * 360,
          duration: 3 + Math.random() * 4,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });

        // Color switching
        const colors = ['#5AA8FF', '#B6FF5A', '#F5F6F8'];
        gsap.to(starElement, {
          '--star-color': () => colors[Math.floor(Math.random() * colors.length)],
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });
      });
    }

    // Innovative floating elements
    if (innovativeElementsRef.current) {
      const elements = innovativeElementsRef.current.querySelectorAll('.floating-element');
      
      elements.forEach((element, index) => {
        const el = element as HTMLElement;
        
        gsap.to(el, {
          y: () => `${Math.sin(Date.now() * 0.001 + index) * 20}px`,
          x: () => `${Math.cos(Date.now() * 0.0015 + index) * 15}px`,
          rotation: () => Math.sin(Date.now() * 0.002 + index) * 10,
          duration: 3 + index * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });
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

      // Parallax for stars
      if (starsRef.current) {
        gsap.to(starsRef.current, {
          x: xPercent * 20,
          y: yPercent * 15,
          duration: 0.5,
          ease: 'power2.out'
        });
      }

      // Parallax for innovative elements
      if (innovativeElementsRef.current) {
        gsap.to(innovativeElementsRef.current, {
          x: -xPercent * 8,
          y: -yPercent * 6,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
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
      {/* Switching Stars Background */}
      <div 
        ref={starsRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <Star
            key={i}
            className="switching-star absolute w-4 h-4 text-[#5AA8FF] opacity-60"
            style={{ 
              color: 'var(--star-color, #5AA8FF)',
              filter: 'drop-shadow(0 0 4px currentColor)'
            }}
          />
        ))}
      </div>

      {/* Innovative Floating Elements */}
      <div 
        ref={innovativeElementsRef}
        className="absolute inset-0 z-1 pointer-events-none"
      >
        {/* Geometric shapes */}
        <div className="floating-element absolute top-1/4 left-1/4 w-8 h-8 border-2 border-[#5AA8FF]/30 rotate-45"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-6 h-6 bg-[#B6FF5A]/20 rounded-full"></div>
        <div className="floating-element absolute bottom-1/3 left-1/3 w-10 h-1 bg-[#5AA8FF]/40"></div>
        
        {/* Sparkle elements */}
        <Sparkles className="floating-element absolute top-1/2 right-1/3 w-5 h-5 text-[#B6FF5A]/60" />
        <Zap className="floating-element absolute bottom-1/4 right-1/6 w-6 h-6 text-[#5AA8FF]/50" />
        <Star className="floating-element absolute top-1/6 left-1/2 w-4 h-4 text-[#B6FF5A]/70" />
        
        {/* Gradient orbs */}
        <div className="floating-element absolute top-1/5 right-1/5 w-20 h-20 bg-gradient-to-br from-[#5AA8FF]/10 to-[#B6FF5A]/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-1/5 left-1/5 w-16 h-16 bg-gradient-to-tr from-[#B6FF5A]/15 to-[#5AA8FF]/15 rounded-full blur-lg"></div>
      </div>

      {/* Three.js Background */}
      <div className="absolute inset-0 z-2">
        <ThreeHero onServiceSelect={onServiceSelect} />
      </div>

      {/* Innovative Grid Pattern */}
      <div className="absolute inset-0 z-1 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(90, 168, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(90, 168, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Innovative headline with enhanced styling */}
        <div className="relative mb-8">
          <h1 
            ref={headlineRef}
            className="font-heading text-6xl md:text-8xl lg:text-9xl mb-6 text-foreground relative"
            style={{
              background: 'linear-gradient(135deg, #F5F6F8 0%, #5AA8FF 50%, #B6FF5A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(90, 168, 255, 0.3))'
            }}
          >
            Ideas → Impact, beautifully.
          </h1>
          
          {/* Glow effect behind text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5AA8FF]/20 via-transparent to-[#B6FF5A]/20 blur-3xl -z-10"></div>
        </div>
        
        <p 
          ref={sublineRef}
          className="font-body text-xl md:text-2xl mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Web & mobile products, brand experiences, and growth engines—built with craft.
        </p>

        {/* Enhanced CTA section */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            onClick={onStartProject}
            size="lg"
            className="bg-[#5AA8FF] hover:bg-[#4a94e6] text-background font-medium px-8 py-4 text-lg group transition-all duration-300 hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10">Start a Project</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform relative z-10">→</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5AA8FF] to-[#B6FF5A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          
          {/* <Button 
            onClick={onSeeWork}
            variant="outline"
            size="lg"
            className="border-[#B6FF5A] text-[#B6FF5A] hover:bg-[#B6FF5A] hover:text-background font-medium px-8 py-4 text-lg transition-all duration-300 hover:scale-105 relative group overflow-hidden"
          >
            <span className="relative z-10">See Our Work</span>
            <div className="absolute inset-0 bg-[#B6FF5A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Button> */}
        </div>

        {/* Enhanced stats with innovative design */}
        <div 
          ref={statsRef}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-2 h-2 bg-[#5AA8FF] rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="absolute inset-0 w-2 h-2 bg-[#5AA8FF] rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="group-hover:text-[#5AA8FF] transition-colors">50+ launches</span>
          </div>
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-2 h-2 bg-[#B6FF5A] rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="absolute inset-0 w-2 h-2 bg-[#B6FF5A] rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="group-hover:text-[#B6FF5A] transition-colors">avg. +38% conversion</span>
          </div>
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-2 h-2 bg-[#5AA8FF] rounded-full group-hover:scale-150 transition-transform"></div>
              <div className="absolute inset-0 w-2 h-2 bg-[#5AA8FF] rounded-full animate-ping opacity-30"></div>
            </div>
            <span className="group-hover:text-[#5AA8FF] transition-colors">5 countries</span>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 group">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center group-hover:border-[#5AA8FF] transition-colors">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce group-hover:bg-[#5AA8FF] transition-colors"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Scroll</p>
      </div> */}
    </section>
  );
}