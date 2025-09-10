import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Code, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: 1,
    title: 'Discover',
    description: 'Deep research into your users, market, and technical requirements. We uncover the real problems worth solving.',
    icon: Search,
    color: '#5AA8FF'
  },
  {
    id: 2,
    title: 'Design',
    description: 'Wireframes, prototypes, and visual design that puts user experience first. Every pixel serves a purpose.',
    icon: Lightbulb,
    color: '#B6FF5A'
  },
  {
    id: 3,
    title: 'Build',
    description: 'Clean, scalable code with modern architecture. Performance and maintainability are non-negotiable.',
    icon: Code,
    color: '#5AA8FF'
  },
  {
    id: 4,
    title: 'Grow',
    description: 'Launch, measure, iterate. We optimize based on real user data and business metrics.',
    icon: TrendingUp,
    color: '#B6FF5A'
  }
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

    // Path drawing animation
    if (pathRef.current && stepsRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Steps animation
    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll('.process-step');
      
      steps.forEach((step, index) => {
        const stepElement = step as HTMLElement;
        const icon = stepElement.querySelector('.step-icon');
        const content = stepElement.querySelector('.step-content');

        // Initial state
        gsap.set([icon, content], { opacity: 0, y: 50 });

        // Animation
        gsap.to([icon, content], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Hover effects
        const handleMouseEnter = () => {
          gsap.to(stepElement, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });

          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(stepElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });

          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        };

        stepElement.addEventListener('mouseenter', handleMouseEnter);
        stepElement.addEventListener('mouseleave', handleMouseLeave);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="process"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(90,168,255,0.1)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="font-heading text-4xl md:text-6xl mb-6 text-foreground"
          >
            Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that turns ideas into successful products.
          </p>
        </div>

        <div 
          ref={stepsRef}
          className="relative max-w-6xl mx-auto"
        >
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 w-full h-px hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 1000 2" preserveAspectRatio="none">
              <path
                ref={pathRef}
                d="M0,1 Q250,0 500,1 T1000,1"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                className="opacity-50"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5AA8FF" />
                  <stop offset="50%" stopColor="#B6FF5A" />
                  <stop offset="100%" stopColor="#5AA8FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className="process-step text-center relative"
                >
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-background border-2 border-border rounded-full flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div 
                    className="step-icon w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center relative"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <IconComponent 
                      className="w-8 h-8" 
                      style={{ color: step.color }}
                    />
                    
                    {/* Glow effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-20 blur-xl"
                      style={{ backgroundColor: step.color }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="step-content">
                    <h3 
                      className="font-heading text-2xl mb-4 text-foreground"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline for mobile */}
          <div className="lg:hidden mt-16">
            <div className="flex flex-col space-y-8">
              {processSteps.map((step, index) => (
                <div key={`mobile-${step.id}`} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-muted-foreground mb-6">Ready to start your project?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#5AA8FF] hover:bg-[#4a94e6] text-background px-8 py-3 rounded-lg font-medium transition-colors">
              Get a Free Consultation
            </button>
            {/* <button className="border border-[#B6FF5A] text-[#B6FF5A] hover:bg-[#B6FF5A] hover:text-background px-8 py-3 rounded-lg font-medium transition-colors">
              View Pricing
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}