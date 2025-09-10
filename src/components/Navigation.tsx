import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Menu, X, Star } from 'lucide-react';
import logo from "../Assets/image-24.png";

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    if (!navRef.current) return;

    // Initial animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
    );

    // Scroll effects
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Logo animation
    if (logoRef.current) {
      const stars = logoRef.current.querySelectorAll('.nav-star');
      
      gsap.to(stars, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 0.5
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: element,
          offsetY: 100
        },
        ease: 'power2.inOut'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            ref={logoRef}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('#main')}
          >
             <img src={logo} alt="" 
                  className="w-30 h-20 rounded-full object-cover"

                  />
            {/* <div className="relative w-10 h-0">
              
              <Star 
                className="nav-star absolute inset-0 w-10 h-10 text-[#5AA8FF] opacity-40" 
                style={{ transform: 'rotate(0deg)' }}
              />
              <Star 
                className="nav-star absolute inset-0 w-6 h-6 top-2 left-2 text-[#B6FF5A] opacity-60" 
                style={{ transform: 'rotate(45deg)' }}
              />
              
              {/* Central NC logo */}

                 

              {/* <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-heading font-bold text-foreground group-hover:text-[#5AA8FF] transition-colors">
                  RX
                </span>
              </div> */}
            {/* </div>  */}
            
            {/* <div>
              <h1 className="font-heading text-xl font-bold text-foreground group-hover:text-[#5AA8FF] transition-colors">
                Reach-X
              </h1>
              <p className="text-xs text-muted-foreground leading-none"></p>
            </div> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-[#5AA8FF] transition-all duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5AA8FF] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-[#5AA8FF] hover:bg-[#4a94e6] text-background font-medium px-6 py-2 group"
            >
              Start Project
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-[#5AA8FF] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-muted-foreground hover:text-[#5AA8FF] transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-[#5AA8FF] hover:bg-[#4a94e6] text-background font-medium mt-4 w-full"
              >
                Start Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}