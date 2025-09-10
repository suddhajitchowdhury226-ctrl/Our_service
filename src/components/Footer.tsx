import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const elements = footerRef.current.querySelectorAll('.footer-element');
    
    gsap.fromTo(elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@novacraft.studio', label: 'Email' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="bg-background border-t border-border relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/10 to-transparent"></div>

      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="footer-element lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-heading text-2xl text-foreground mb-2">
                Reach-X
              </h3>
              <p className="text-[#5AA8FF] font-medium">
                "We craft products that move people."
              </p>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              We're a team of designers, developers, and strategists who believe 
              great products come from the intersection of human needs and business goals.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-muted/50 hover:bg-[#5AA8FF] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-element">
            <h4 className="font-heading text-lg text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-[#B6FF5A] transition-colors duration-300 flex items-center group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-element">
            <h4 className="font-heading text-lg text-foreground mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-[#B6FF5A] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h5 className="font-medium text-foreground mb-3">Contact</h5>
              <p className="text-muted-foreground text-sm">
                helloreachx@gmail.com
              </p>
              <p className="text-muted-foreground text-sm">
                +91 8101700038
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-element border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Reach-X. All rights reserved.
          </p>
{/*           <p className="text-muted-foreground text-sm mt-4 md:mt-0 flex items-center">
            Built with 
            <span className="mx-1 text-[#5AA8FF]">GSAP</span>
            +
            <span className="mx-1 text-[#B6FF5A]">Three.js</span>
            <span className="ml-2">⚡</span>
          </p> */}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#5AA8FF]/5 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#B6FF5A]/5 to-transparent rounded-full blur-xl"></div>
    </footer>
  );
}
