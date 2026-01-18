import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  language?: 'en' | 'ar';
}

export function SEO({ title, description, keywords, canonicalUrl, language = 'ar' }: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) {
        metaDesc.content = description;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }

      // Update OG description
      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (ogDesc) {
        ogDesc.content = description;
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = description;
        document.head.appendChild(meta);
      }

      // Update Twitter description
      const twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
      if (twitterDesc) {
        twitterDesc.content = description;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'twitter:description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.name = 'keywords';
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.content = keywords;
    }

    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonicalUrl;
    }

    // Inject Structured Data (JSON-LD)
    const injectStructuredData = () => {
      // Remove existing structured data
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Areeb Tech",
        "alternateName": "Areeb Technology",
        "url": "https://www.areebb.com",
        "logo": "https://www.areebb.com/logo.png",
        "description": language === 'ar' 
          ? "أريب تك - شركة تقنية معلومات وحلول ذكاء اصطناعي رائدة في الأردن. نقدم خدمات تقنية ذكية وماهرة تشمل وكلاء الذكاء الاصطناعي الصوتي، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات، وحلول مركز الاتصال ونقاط البيع."
          : "Areeb Tech - Leading IT and AI company in Jordan. Specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale (POS) systems, Digital Transformation, and AI-powered technology services.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al-Madina Al-Monawara St 219",
          "addressLocality": "Amman",
          "addressCountry": "JO",
          "postalCode": "XVV9+7R"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+962-777-470-302",
          "contactType": "Customer Service",
          "email": "info@areebtech.com",
          "areaServed": "JO",
          "availableLanguage": ["en", "ar"]
        },
        "sameAs": [
          "https://www.areebb.com"
        ],
        "knowsAbout": [
          "Information Technology",
          "Artificial Intelligence",
          "AI Solutions",
          "IT Services",
          "Call Center Solutions",
          "Point of Sale Systems",
          "POS Solutions",
          "Software Solutions",
          "Odoo ERP",
          "Digital Transformation",
          "IT Managed Services",
          "Voice AI",
          "AI Agents"
        ]
      };

      // LocalBusiness Schema
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.areebb.com",
        "name": "Areeb Tech",
        "image": "https://www.areebb.com/logo.png",
        "description": language === 'ar'
          ? "شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن متخصصة في حلول البرمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، والتحول الرقمي."
          : "IT and AI company in Jordan specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale systems, and Digital Transformation.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al-Madina Al-Monawara St 219",
          "addressLocality": "Amman",
          "addressRegion": "Amman Governorate",
          "postalCode": "XVV9+7R",
          "addressCountry": "JO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.9539,
          "longitude": 35.8800
        },
        "url": "https://www.areebb.com",
        "telephone": "+962-777-470-302",
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      };

      // Service Schema
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "IT Services",
        "provider": {
          "@type": "Organization",
          "name": "Areeb Tech",
          "url": "https://www.areebb.com"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Jordan"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "IT and AI Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Transformation",
                "description": "Consulting and strategy to digitize processes, automate workflows, and drive innovation."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "IT Managed Services",
                "description": "Comprehensive IT infrastructure management and support services."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Solutions",
                "description": "AI-powered tools and solutions including Voice AI agents and intelligent automation."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Agent Call Center Solutions",
                "description": "Advanced AI-powered call center solutions for automated customer support."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Point of Sale (POS) Solutions",
                "description": "Comprehensive POS systems integration and customization for retail operations."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Software Solutions",
                "description": "Custom software development and enterprise solutions including Odoo ERP."
              }
            }
          ]
        }
      };

      // FAQ Schema
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": language === 'ar' ? "ما هي أفضل شركة تقنية معلومات في الأردن؟" : "What is the best IT company in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar' 
                ? "أريب تك هي شركة تقنية معلومات رائدة في الأردن متخصصة في حلول البرمجيات، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات، وحلول الذكاء الاصطناعي."
                : "Areeb Tech is a leading IT company in Jordan specializing in Software Solutions, Digital Transformation, IT Managed Services, and AI solutions. Based in Amman, we provide comprehensive technology services to businesses across Jordan."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "ما هي أفضل شركة ذكاء اصطناعي في الأردن؟" : "What is the best AI company in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك تقدم حلول ذكاء اصطناعي متقدمة بما في ذلك وكلاء الذكاء الاصطناعي الصوتي، وأدوات الذكاء الاصطناعي، وأتمتة ذكية للشركات في الأردن."
                : "Areeb Tech provides advanced AI solutions including Voice AI agents, AI tools, and intelligent automation for businesses in Jordan. Our AI-powered services help companies automate processes and enhance customer experiences."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "أين يمكنني العثور على حلول مركز الاتصال في الأردن؟" : "Where can I find Call Center solutions in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك توفر حلول مركز الاتصال المتقدمة المدعومة بالذكاء الاصطناعي لدعم العملاء الآلي، التوجيه الفعال، وتجربة عملاء محسنة في الأردن."
                : "Areeb Tech offers advanced AI-powered call center solutions in Jordan. Our Agent Call Center Solutions provide automated customer support, efficient routing, and enhanced customer experience using Voice AI technology."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "أين يمكنني العثور على أنظمة نقاط البيع (POS) في الأردن؟" : "Where can I find Point of Sale (POS) systems in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك تقدم حلول نقاط البيع الشاملة مع التكامل والتخصيص لتبسيط عمليات البيع بالتجزئة وتحسين تجربة دفع العملاء في الأردن."
                : "Areeb Tech provides comprehensive Point of Sale (POS) solutions in Jordan. Our POS systems include integration solutions, payment processing, inventory management, and real-time reporting for retail and hospitality businesses."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "ما هي خدمات التحول الرقمي المتاحة في الأردن؟" : "What Digital Transformation services are available in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك توفر خدمات التحول الرقمي الشاملة في الأردن تشمل الاستشارات والاستراتيجيات لأتمتة العمليات وسير العمل، ودفع الابتكار عبر المؤسسات."
                : "Areeb Tech offers comprehensive Digital Transformation services in Jordan including consulting and strategy to digitize processes, automate workflows, and drive innovation across organizations."
            }
          }
        ]
      };

      // Product Schema (Voice AI Agent)
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Areeb Voice AI Agent",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Cloud-based",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": language === 'ar'
          ? "وكيل ذكاء اصطناعي صوتي متقدم يدعم اللهجة الأردنية والعربية، يوفر دعم عملاء آلي طبيعي وتفاعلي."
          : "Advanced Voice AI Agent supporting Jordanian and Arabic dialects, providing natural and interactive automated customer support.",
        "provider": {
          "@type": "Organization",
          "name": "Areeb Tech"
        }
      };

      // Inject all schemas
      const schemas = [organizationSchema, localBusinessSchema, serviceSchema, faqSchema, productSchema];
      
      schemas.forEach((schema, index) => {
        // Check if script already exists
        let script = document.getElementById(`structured-data-${index}`) as HTMLScriptElement;
        if (script) {
          script.textContent = JSON.stringify(schema);
        } else {
          script = document.createElement('script');
          script.type = 'application/ld+json';
          script.id = `structured-data-${index}`;
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        }
      });
    };

    injectStructuredData();
  }, [title, description, keywords, canonicalUrl, language]);

  return null;
}