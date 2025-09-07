import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    problem: 'Outdated checkout flow causing 40% cart abandonment',
    approach: 'User research, A/B testing, progressive checkout',
    outcome: '+65% conversion rate, -30% bounce rate',
    tags: ['Web', 'UX', 'SEO'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    color: '#5AA8FF'
  },
  {
    id: 2,
    title: 'Fintech Mobile App',
    problem: 'Complex financial tools intimidating first-time users',
    approach: 'Progressive disclosure, micro-interactions, onboarding',
    outcome: '+120% user retention, 4.8★ app store rating',
    tags: ['App', 'UI/UX', 'ASO'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
    color: '#B6FF5A'
  },
  {
    id: 3,
    title: 'SaaS Rebrand & Growth',
    problem: 'Generic brand struggling in competitive market',
    approach: 'Brand positioning, visual identity, content strategy',
    outcome: '+200% organic traffic, +85% qualified leads',
    tags: ['Brand', 'SEO', 'Design'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    color: '#5AA8FF'
  },
  {
    id: 4,
    title: 'Healthcare Portal',
    problem: 'Patients unable to easily access medical records',
    approach: 'Accessibility-first design, clear information architecture',
    outcome: '+90% patient satisfaction, WCAG AAA compliance',
    tags: ['Web', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    color: '#B6FF5A'
  },
  {
    id: 5,
    title: 'Gaming Platform Launch',
    problem: 'New gaming platform needed viral growth strategy',
    approach: 'Social features, gamification, referral system',
    outcome: '1M+ users in 6 months, 40% organic growth',
    tags: ['App', 'Brand', 'ASO'],
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    color: '#5AA8FF'
  },
  {
    id: 6,
    title: 'Real Estate Platform',
    problem: 'Agents spending too much time on manual tasks',
    approach: 'Workflow automation, CRM integration, mobile-first',
    outcome: '-60% task completion time, +150% agent productivity',
    tags: ['Web', 'App', 'SEO'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    color: '#B6FF5A'
  }
];

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Grid animation
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.case-study-card');
      
      gsap.fromTo(cards,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Individual card hover effects
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const image = cardElement.querySelector('.case-study-image');
        const content = cardElement.querySelector('.case-study-content');

        let hoverTween: gsap.core.Tween;

        const handleMouseEnter = () => {
          hoverTween = gsap.to(cardElement, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });

          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out'
            });
          }

          if (content) {
            gsap.to(content, {
              y: -5,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        };

        const handleMouseLeave = () => {
          if (hoverTween) hoverTween.kill();
          
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
          }

          if (content) {
            gsap.to(content, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        };

        cardElement.addEventListener('mouseenter', handleMouseEnter);
        cardElement.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="work"
      className="py-20 lg:py-32 bg-muted/20 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(182,255,90,0.1)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="font-heading text-4xl md:text-6xl mb-6 text-foreground"
          >
            Work / Case Studies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real problems, thoughtful solutions, measurable results.
          </p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => (
            <Card 
              key={study.id}
              className="case-study-card bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={study.image}
                  alt={study.title}
                  className="case-study-image w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-background/80 backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <CardContent className="case-study-content p-6">
                <h3 className="font-heading text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-destructive">Problem: </span>
                    <span className="text-muted-foreground">{study.problem}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-[#5AA8FF]">Approach: </span>
                    <span className="text-muted-foreground">{study.approach}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-[#B6FF5A]">Outcome: </span>
                    <span className="text-muted-foreground">{study.outcome}</span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full mt-6 justify-between text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Case Study
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-[#5AA8FF] hover:bg-[#4a94e6] text-background"
          >
            View All Case Studies
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}