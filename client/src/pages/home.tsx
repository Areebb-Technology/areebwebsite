import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { About } from "@/components/sections/about";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WaveBackground } from "@/components/ui/wave-background";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { SEO } from "@/components/seo";

function CTA() {
  const { t } = useI18n();
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">{t('cta.title.prefix')} <span className="text-primary">{t('cta.title.suffix')}</span></h2>
             <p className="text-xl text-white/60 max-w-lg leading-relaxed">
               {t('cta.desc')}
             </p>
             
             <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-white/80">info@areebtech.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-white/80" dir="ltr">+962 777 470 302</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-white/80">{t('footer.address')}</span>
                </div>
             </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">{t('cta.form.title')}</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">{t('cta.form.name')}</label>
                  <Input placeholder={t('cta.form.name.ph')} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">{t('cta.form.email')}</label>
                  <Input placeholder={t('cta.form.email.ph')} type="email" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-white/70">{t('cta.form.subject')}</label>
                 <Input placeholder={t('cta.form.subject.ph')} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-white/70">{t('cta.form.message')}</label>
                 <Textarea placeholder={t('cta.form.message.ph')} className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary resize-none" />
              </div>
              <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                {t('cta.form.submit')} <Send className="ml-2 w-4 h-4 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const { language, t } = useI18n();

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const seoTitle = language === 'ar'
    ? 'أريب تك | شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن'
    : 'Areeb Tech | IT & AI Company in Jordan';
  
  const seoDescription = language === 'ar'
    ? 'أريب تك - شركة تقنية معلومات وحلول ذكاء اصطناعي رائدة في الأردن. متخصصة في حلول البرمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، والتحول الرقمي. أفضل شركات تقنية المعلومات في الأردن.'
    : 'Areeb Tech - Leading IT and AI company in Jordan. Specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale (POS) systems, Digital Transformation, and AI-powered technology services. Best IT companies in Jordan.';
  
  const seoKeywords = language === 'ar'
    ? 'شركات تقنية معلومات الأردن، شركات ذكاء اصطناعي الأردن، خدمات تقنية معلومات الأردن، خدمات ذكاء اصطناعي الأردن، حلول برمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات'
    : 'IT companies in Jordan, AI companies in Jordan, IT services Jordan, AI services Jordan, Software Solutions, Odoo ERP, Call Center solutions, Agent Call Center, Point of Sale, POS systems, Digital Transformation, IT Managed Services, Voice AI, AI Agents, Technology services Amman, Software development Jordan';

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl="https://www.areebb.com/"
        language={language}
      />
      <WaveBackground />
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <Services />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
