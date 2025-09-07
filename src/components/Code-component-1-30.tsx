import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Layers, 
  Target, 
  Search, 
  TrendingUp 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Next-gen websites with speed, SEO, and clean DX.',
    fullDescription: 'High-performance websites with clean architecture and maintainable code.',
    icon: Globe,
    color: '#5AA8FF'
  },
  {
    id: 'app',
    title: 'App Development', 
    description: 'Native-feel apps that users love to open.',
    fullDescription: 'iOS/Android apps with smooth UX and offline-first reliability.',
    icon: Smartphone,
    color: '#B6FF5A'
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Visuals that stop the scroll and tell your story.',
    fullDescription: 'Campaign visuals, social kits, and marketing collateral that convert.',
    icon: Palette,
    color: '#5AA8FF'
  },
  {
    id: 'ux',
    title: 'UI/UX',
    description: 'Interface clarity born from research, not guesswork.',
    fullDescription: 'Research, wireframes, and interfaces that users actually understand.',
    icon: Layers,
    color: '#B6FF5A'
  },
  {
    id: 'brand',
    title: 'Product Branding',
    description: 'A brand system that scales with your roadmap.',
    fullDescription: 'Naming, identity systems, and brand guidelines for scale.',
    icon: Target,
    color: '#5AA8FF'
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Technical wins + content that earns backlinks.',
    fullDescription: 'Technical hygiene, content strategy, and Core Web Vitals wins.',
    icon: Search,
    color: '#B6FF5A'
  },
  {
    id: 'aso',
    title: 'ASO',
    description: 'Metadata, visuals, and experiments that rank.',
    fullDescription: 'App store metadata, visuals, and experiments to climb rankings.',
    icon: TrendingUp,
    color: '#5AA8FF'
  }
];

interface ServicesSectionProps {
  selectedService?: string;
}

export function ServicesSection({ selectedService }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Cards animation
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.service-card');
      
      gsap.fromTo(cards,
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Hover effects for cards
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        let hoverTween: gsap.core.Tween;

        const handleMouseEnter = () => {
          hoverTween = gsap.to(cardElement, {
            y: -10,
            rotateY: 5,
            rotateX: -5,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Magnetic effect for button
          const button = cardElement.querySelector('button');
          if (button) {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.2,
              ease: 'power2.out'
            });
          }
        };

        const handleMouseLeave = () => {
          if (hoverTween) hoverTween.kill();
          
          gsap.to(cardElement, {
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });

          const button = cardElement.querySelector('button');
          if (button) {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          }
        };

        cardElement.addEventListener('mouseenter', handleMouseEnter);
        cardElement.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    // Highlight selected service
    if (selectedService) {
      const targetCard = document.querySelector(`[data-service="${selectedService}"]`);
      if (targetCard) {
        gsap.to(targetCard, {
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        });

        // Scroll to services section
        gsap.to(window, {
          duration: 1,
          scrollTo: sectionRef.current,
          ease: 'power2.inOut'
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedService]);

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(90,168,255,0.1)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <h2 
          ref={titleRef}
          className="font-heading text-4xl md:text-6xl text-center mb-16 text-foreground"
        >
          Services
        </h2>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id}
                data-service={service.id}
                className="service-card bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <IconComponent 
                      className="w-6 h-6" 
                      style={{ color: service.color }}
                    />
                  </div>
                  <CardTitle className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {service.fullDescription}
                  </CardDescription>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-between text-muted-foreground hover:text-foreground transition-colors"
                  >
                    View Details
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Need something custom?</p>
          <Button 
            size="lg"
            variant="outline"
            className="border-[#B6FF5A] text-[#B6FF5A] hover:bg-[#B6FF5A] hover:text-background"
          >
            Let's Talk About Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}