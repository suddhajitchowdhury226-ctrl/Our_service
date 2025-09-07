import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Layers, 
  Target, 
  Search, 
  TrendingUp,
  ArrowRight,
  Star,
  Zap,
  Sparkles,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Next-gen websites with speed, SEO, and clean DX.',
    fullDescription: 'High-performance websites with clean architecture and maintainable code.',
    icon: Globe,
    color: '#5AA8FF',
    gradient: 'from-[#5AA8FF]/20 to-[#5AA8FF]/5',
    projects: '50+',
    metric: '99.9%',
    metricLabel: 'Uptime',
    featured: false,
    tags: ['React', 'Next.js', 'Performance']
  },
  {
    id: 'app',
    title: 'App Development', 
    description: 'Native-feel apps that users love to open.',
    fullDescription: 'iOS/Android apps with smooth UX and offline-first reliability.',
    icon: Smartphone,
    color: '#B6FF5A',
    gradient: 'from-[#B6FF5A]/20 to-[#B6FF5A]/5',
    projects: '30+',
    metric: '4.8★',
    metricLabel: 'Avg Rating',
    featured: true,
    tags: ['React Native', 'Flutter', 'Native']
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Visuals that stop the scroll and tell your story.',
    fullDescription: 'Campaign visuals, social kits, and marketing collateral that convert.',
    icon: Palette,
    color: '#5AA8FF',
    gradient: 'from-[#5AA8FF]/20 to-[#5AA8FF]/5',
    projects: '200+',
    metric: '+45%',
    metricLabel: 'Engagement',
    featured: false,
    tags: ['Branding', 'Social', 'Print']
  },
  {
    id: 'ux',
    title: 'UI/UX Design',
    description: 'Interface clarity born from research, not guesswork.',
    fullDescription: 'Research, wireframes, and interfaces that users actually understand.',
    icon: Layers,
    color: '#B6FF5A',
    gradient: 'from-[#B6FF5A]/20 to-[#B6FF5A]/5',
    projects: '80+',
    metric: '+38%',
    metricLabel: 'Conversion',
    featured: true,
    tags: ['Research', 'Prototyping', 'Testing']
  },
  {
    id: 'brand',
    title: 'Product Branding',
    description: 'A brand system that scales with your roadmap.',
    fullDescription: 'Naming, identity systems, and brand guidelines for scale.',
    icon: Target,
    color: '#5AA8FF',
    gradient: 'from-[#5AA8FF]/20 to-[#5AA8FF]/5',
    projects: '40+',
    metric: '100%',
    metricLabel: 'Brand Recall',
    featured: false,
    tags: ['Strategy', 'Identity', 'Guidelines']
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description: 'Technical wins + content that earns backlinks.',
    fullDescription: 'Technical hygiene, content strategy, and Core Web Vitals wins.',
    icon: Search,
    color: '#B6FF5A',
    gradient: 'from-[#B6FF5A]/20 to-[#B6FF5A]/5',
    projects: '60+',
    metric: '+250%',
    metricLabel: 'Organic Traffic',
    featured: false,
    tags: ['Technical', 'Content', 'Analytics']
  },
  {
    id: 'aso',
    title: 'App Store Optimization',
    description: 'Metadata, visuals, and experiments that rank.',
    fullDescription: 'App store metadata, visuals, and experiments to climb rankings.',
    icon: TrendingUp,
    color: '#5AA8FF',
    gradient: 'from-[#5AA8FF]/20 to-[#5AA8FF]/5',
    projects: '25+',
    metric: '+180%',
    metricLabel: 'Downloads',
    featured: false,
    tags: ['ASO', 'Metadata', 'A/B Testing']
  }
];

interface ServicesSectionProps {
  selectedService?: string;
}

export function ServicesSection({ selectedService }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Floating elements animation
    if (floatingElementsRef.current) {
      const elements = floatingElementsRef.current.querySelectorAll('.floating-service-element');
      
      elements.forEach((element, index) => {
        const el = element as HTMLElement;
        
        gsap.to(el, {
          y: () => `${Math.sin(Date.now() * 0.001 + index) * 30}px`,
          x: () => `${Math.cos(Date.now() * 0.0008 + index) * 20}px`,
          rotation: () => Math.sin(Date.now() * 0.0015 + index) * 15,
          duration: 4 + index * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true
        });
      });
    }

    // Title animation with enhanced effects
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        { y: 100, opacity: 0, rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Hero card animation
    if (heroCardRef.current) {
      gsap.fromTo(heroCardRef.current,
        { scale: 0.8, opacity: 0, rotateY: -15 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      
      gsap.fromTo(statItems,
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Cards animation with sophisticated stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.service-card');
      
      gsap.fromTo(cards,
        { y: 120, opacity: 0, rotateX: 25, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: {
            amount: 0.8,
            from: "random"
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Enhanced hover effects for cards
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        let hoverTween: gsap.core.Tween;

        const handleMouseEnter = () => {
          setHoveredService(cardElement.dataset.service || null);
          
          hoverTween = gsap.to(cardElement, {
            y: -15,
            rotateY: 3,
            rotateX: -3,
            scale: 1.03,
            duration: 0.4,
            ease: 'power3.out'
          });

          // Glow effect
          gsap.to(cardElement.querySelector('.card-glow'), {
            opacity: 1,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Icon animation
          const icon = cardElement.querySelector('.service-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 5,
              duration: 0.3,
              ease: 'back.out(1.7)'
            });
          }

          // Button animation
          const button = cardElement.querySelector('button');
          if (button) {
            gsap.to(button, {
              scale: 1.05,
              x: 5,
              duration: 0.2,
              ease: 'power2.out'
            });
          }
        };

        const handleMouseLeave = () => {
          setHoveredService(null);
          
          if (hoverTween) hoverTween.kill();
          
          gsap.to(cardElement, {
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out'
          });

          gsap.to(cardElement.querySelector('.card-glow'), {
            opacity: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });

          const icon = cardElement.querySelector('.service-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }

          const button = cardElement.querySelector('button');
          if (button) {
            gsap.to(button, {
              scale: 1,
              x: 0,
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
          scale: 1.08,
          duration: 0.6,
          ease: 'back.out(1.7)',
          yoyo: true,
          repeat: 1
        });

        // Scroll to services section
        gsap.to(window, {
          duration: 1.5,
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
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#5AA8FF]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#B6FF5A]/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(90, 168, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(90, 168, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 25s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div 
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none"
      >
        <Sparkles className="floating-service-element absolute top-1/6 left-1/5 w-6 h-6 text-[#5AA8FF]/40" />
        <Zap className="floating-service-element absolute top-1/3 right-1/6 w-5 h-5 text-[#B6FF5A]/50" />
        <Star className="floating-service-element absolute bottom-1/4 left-1/3 w-4 h-4 text-[#5AA8FF]/30" />
        <div className="floating-service-element absolute top-1/2 left-1/6 w-3 h-3 bg-[#B6FF5A]/20 rounded-full"></div>
        <div className="floating-service-element absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#5AA8FF]/30 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="font-heading text-5xl md:text-7xl mb-6 text-foreground relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #F5F6F8 0%, #5AA8FF 50%, #B6FF5A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Our Services
            <div className="absolute inset-0 bg-gradient-to-r from-[#5AA8FF]/20 via-transparent to-[#B6FF5A]/20 blur-2xl -z-10"></div>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crafting digital experiences that drive growth and captivate audiences
          </p>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          <div className="stat-item text-center group">
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl text-[#5AA8FF] mb-2">500+</h3>
              <div className="absolute inset-0 bg-[#5AA8FF]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <p className="text-sm text-muted-foreground">Projects Delivered</p>
          </div>
          <div className="stat-item text-center group">
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl text-[#B6FF5A] mb-2">98%</h3>
              <div className="absolute inset-0 bg-[#B6FF5A]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
          <div className="stat-item text-center group">
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl text-[#5AA8FF] mb-2">5</h3>
              <div className="absolute inset-0 bg-[#5AA8FF]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <p className="text-sm text-muted-foreground">Countries Served</p>
          </div>
          <div className="stat-item text-center group">
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl text-[#B6FF5A] mb-2">24/7</h3>
              <div className="absolute inset-0 bg-[#B6FF5A]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <p className="text-sm text-muted-foreground">Support Available</p>
          </div>
        </div>

        {/* Hero Service Card - Featured */}
        <div 
          ref={heroCardRef}
          className="mb-16"
        >
          {services.filter(s => s.featured).slice(0, 1).map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id}
                data-service={service.id}
                className="service-card relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border-2 border-[#B6FF5A]/30 hover:border-[#B6FF5A]/60 transition-all duration-500 group max-w-4xl mx-auto"
              >
                {/* Card glow effect */}
                <div className="card-glow absolute inset-0 bg-gradient-to-br from-[#B6FF5A]/10 to-[#5AA8FF]/10 opacity-0 transition-opacity duration-300"></div>
                
                <div className="relative p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                          style={{ backgroundColor: `${service.color}15` }}
                        >
                          <IconComponent 
                            className="w-8 h-8 relative z-10" 
                            style={{ color: service.color }}
                          />
                          <div 
                            className="absolute inset-0 opacity-20"
                            style={{ backgroundColor: service.color }}
                          ></div>
                        </div>
                        <Badge variant="secondary" className="bg-[#B6FF5A]/20 text-[#B6FF5A] border-[#B6FF5A]/30">
                          ⭐ Featured
                        </Badge>
                      </div>
                      
                      <CardTitle className="font-heading text-3xl md:text-4xl text-foreground mb-4 group-hover:text-[#B6FF5A] transition-colors">
                        {service.title}
                      </CardTitle>
                      
                      <CardDescription className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {service.fullDescription}
                      </CardDescription>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        size="lg"
                        className="bg-[#B6FF5A] hover:bg-[#B6FF5A]/90 text-background font-medium group/btn"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-background/50 to-background/20 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                        <div className="text-3xl font-heading text-[#B6FF5A] mb-2">
                          {service.metric}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          {service.metricLabel}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {service.projects} projects completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Services Grid - Modern Bento Layout */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {services.filter(s => !s.featured).map((service, index) => {
            const IconComponent = service.icon;
            const isLarge = index === 0 || index === 3; // Make some cards larger
            
            return (
              <Card 
                key={service.id}
                data-service={service.id}
                className={`service-card relative overflow-hidden bg-gradient-to-br ${service.gradient} backdrop-blur-xl border border-border/30 hover:border-border/60 transition-all duration-500 group ${
                  isLarge ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
              >
                {/* Card glow effect */}
                <div className="card-glow absolute inset-0 bg-gradient-to-br from-current/5 to-transparent opacity-0 transition-opacity duration-300" style={{ color: service.color }}></div>
                
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="service-icon w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: `${service.color}15` }}
                    >
                      <IconComponent 
                        className="w-7 h-7 relative z-10" 
                        style={{ color: service.color }}
                      />
                      <div 
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundColor: service.color }}
                      ></div>
                    </div>
                    
                    <div className="text-right">
                      <div 
                        className="text-lg font-heading mb-1"
                        style={{ color: service.color }}
                      >
                        {service.metric}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.metricLabel}
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="font-heading text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors mb-2">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 relative">
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {service.fullDescription}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-6">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs opacity-70">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {service.projects} projects
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground transition-colors group/btn p-2"
                    >
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/30 max-w-3xl mx-auto">
            <h3 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let's discuss your project and create something extraordinary together. Custom solutions tailored to your unique needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#5AA8FF] hover:bg-[#5AA8FF]/90 text-background font-medium group"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-[#B6FF5A] text-[#B6FF5A] hover:bg-[#B6FF5A] hover:text-background font-medium"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}