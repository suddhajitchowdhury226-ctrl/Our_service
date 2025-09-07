import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkSection } from './components/WorkSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Smooth scroll configuration
    gsap.registerPlugin(ScrollTrigger);
    
    // Refresh ScrollTrigger when layout changes
    ScrollTrigger.refresh();

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?') {
        e.preventDefault();
        // Could implement a command palette here
        console.log('Command palette (not implemented)');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: servicesSection,
          offsetY: 100
        },
        ease: 'power2.inOut'
      });
    }
  };

  const handleStartProject = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: contactSection,
          offsetY: 100
        },
        ease: 'power2.inOut'
      });
    }
  };

  const handleSeeWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: workSection,
          offsetY: 100
        },
        ease: 'power2.inOut'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-muted border-t-[#5AA8FF] rounded-full animate-spin mb-4"></div>
          <p className="font-heading text-xl text-foreground">NovaCraft Studio</p>
          <p className="text-sm text-muted-foreground">Crafting products that move people</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Skip to main content for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navigation />

      <main id="main">
        <HeroSection
          onServiceSelect={handleServiceSelect}
          onStartProject={handleStartProject}
          onSeeWork={handleSeeWork}
        />
        
        <ServicesSection selectedService={selectedService} />
        
        <WorkSection />
        
        <ProcessSection />
        
        <ContactSection />
      </main>

      <Footer />

      {/* Performance monitoring */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Core Web Vitals monitoring
            if (typeof window !== 'undefined') {
              try {
                import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                  getCLS(console.log);
                  getFID(console.log);
                  getFCP(console.log);
                  getLCP(console.log);
                  getTTFB(console.log);
                });
              } catch (e) {
                console.log('Web Vitals not available');
              }
            }
          `
        }}
      />
    </div>
  );
}