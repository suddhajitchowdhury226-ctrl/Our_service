import React, { useEffect, useRef, useState,  } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Send, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Web Development',
  'App Development',
  'Graphic Design',
  'UI/UX',
  'Product Branding',
  'SEO',
  'ASO'
];

const budgetRanges = [
  'Under $10k',
  '$10k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k+'
];

export function ContactSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [] as string[],
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Form animation
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('.form-element');

      gsap.fromTo(formElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("🚀 handleSubmit called with data:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.services.join(", "),
          budget: formData.budget,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", services: [], budget: "", message: "" });
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setIsSubmitting(false);
      alert("Something went wrong, please try again.");
    }
  };



  if (isSubmitted) {
    return (
      <section
        ref={sectionRef}
        id="contact"
        className="py-20 lg:py-32 bg-muted/20 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#B6FF5A] rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-background" />
            </div>
            <h2 className="font-heading text-4xl md:text-6xl mb-6 text-foreground">
              Message Sent! 🎉
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Thanks for reaching out! We'll get back to you within 24 hours with next steps.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-[#5AA8FF] text-[#5AA8FF] hover:bg-[#5AA8FF] hover:text-background"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 lg:py-32 bg-muted/20 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(182,255,90,0.1)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="font-heading text-4xl md:text-6xl mb-6 text-foreground"
          >
            Let's ship something great.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to turn your idea into a product that moves people? Let's talk.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-foreground">
                  Start Your Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-element space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="bg-input-background border-border"
                      />
                    </div>
                    <div className="form-element space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="bg-input-background border-border"
                      />
                    </div>
                  </div>

                  {/* Services */}
                  <div className="form-element space-y-3">
                    <Label>Services Needed</Label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <Badge
                          key={service}
                          variant={formData.services.includes(service) ? "default" : "outline"}
                          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${formData.services.includes(service)
                            ? 'bg-[#5AA8FF] text-background'
                            : 'border-border hover:border-[#5AA8FF]'
                            }`}
                          onClick={() => handleServiceToggle(service)}
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="form-element space-y-3">
                    <Label>Budget Range</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                          className={`p-3 rounded-lg border transition-all duration-200 text-sm ${formData.budget === range
                            ? 'bg-[#B6FF5A] text-background border-[#B6FF5A]'
                            : 'bg-input-background border-border hover:border-[#B6FF5A]'
                            }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-element space-y-2">
                    <Label htmlFor="message">Tell us about your project</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="bg-input-background border-border resize-none"
                      placeholder="What are you looking to build? What's your timeline? Any specific requirements?"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-element" onClick={(e) => {
                    console.log("🚀 Submit button clicked");
                  }}>
                    <div className="form-element">
                      <Button
                        type="submit"
                       
                        className="w-full bg-[#5AA8FF] hover:bg-[#4a94e6] text-background font-medium group"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Get a Quote in 24h
                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>

                  </div>

                </form>
              </CardContent>
            </Card>
          </div>

          {/* Alternative CTA */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-foreground">
                  Prefer to chat first?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Book a 20-minute discovery call to discuss your project and see if we're a good fit.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#B6FF5A] text-[#B6FF5A] hover:bg-[#B6FF5A] hover:text-background"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Discovery Call
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Average response time
                  </p>
                  <p className="text-2xl font-heading text-[#5AA8FF]">
                     4 hours
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We're usually much faster than that
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground">
              <p>By submitting this form, you agree to our privacy policy.</p>
              <p className="mt-2">We'll never spam you or share your data.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}