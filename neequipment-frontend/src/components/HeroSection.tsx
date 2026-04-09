import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Users, Award, Target, Eye, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { getProductImageUrl } from '@/utils/imageUtils';

interface HeroSectionProps {
  onQuoteClick: () => void;
}

const DEFAULT_HERO_IMAGE = "/logo-ne-equipment.png";

const HeroSection = ({ onQuoteClick }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const ref = useRef(null);
  const [productImages, setProductImages] = useState<{id?: string | number, src: string, alt: string}[]>([{
    src: DEFAULT_HERO_IMAGE,
    alt: 'NE Equipment'
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get('/products');
        const productsWithImages = response.data.filter((p: any) => p.images && p.images.length > 0);
        
        if (productsWithImages.length > 0) {
          const dynamicImages = productsWithImages.map((p: any) => {
            const primaryImg = p.images.find((i: any) => i.is_primary) || p.images[0];
            return {
              id: p.id,
              src: getProductImageUrl(primaryImg.image_path),
              alt: p.name
            };
          });
          
          setProductImages(dynamicImages);
        }
      } catch (error) {
        console.error('Error fetching products for hero:', error);
        // Em caso de erro, já existe a logo inserida no state inicial falback.
      }
    };
    fetchImages();
  }, []);

  // Auto-play interval for carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [productImages.length]);

  const stats = [
    { value: '8+', label: t.hero.stats.experience },
    { value: '3', label: t.hero.stats.offices },
    { value: '500+', label: t.hero.stats.products },
    { value: '100%', label: t.hero.stats.commitment },
  ];

  const brands = [
    { name: 'Marca 1', logo: '/logos/logo1.jpeg' },
    { name: 'Marca 2', logo: '/logos/logo2.jpeg' },
    { name: 'Marca 3', logo: '/logos/logo3.jpeg' },
    { name: 'Marca 4', logo: '/logos/logo4.jpeg' },
    { name: 'Marca 5', logo: '/logos/logo5.jpeg' },
    { name: 'Marca 6', logo: '/logos/logo6.jpeg' },
    { name: 'Marca 7', logo: '/logos/logo7.jpeg' },
    { name: 'Marca 8', logo: '/logos/logo8.jpeg' },
    { name: 'Marca 9', logo: '/logos/logo9.jpeg' },
    { name: 'Marca 10', logo: '/logos/logo10.jpeg' },
  ];


  const values = [
    { icon: Users, title: t.about.values.professionalism },
    { icon: Award, title: t.about.values.quality },
    { icon: Shield, title: t.about.values.ethics },
    { icon: Target, title: t.about.values.commitment },
    { icon: Eye, title: t.about.values.transparency },
    { icon: Zap, title: t.about.values.efficiency },
  ];

  return (
    <section id="home" className="relative pt-16 md:pt-20">
      <div 
        className="relative min-h-[600px] md:min-h-[700px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
              <span className="inline-block px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-sm font-semibold mb-6">
                {t.hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t.hero.title}{' '}
                <span className="text-gold">{t.hero.titleHighlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {!isAuthenticated && (
                  <Button onClick={onQuoteClick} size="lg" className="bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 rounded-full shadow-lg shadow-gold/30">
                    {t.hero.requestQuote}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
                <Button variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 rounded-full backdrop-blur-sm" asChild>
                  <a href="#catalogo">{t.hero.viewCatalog}</a>
                </Button>
              </div>

              {/* Compact Stats inside Hero */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-white/10 pt-12">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.4 + (0.1 * index) }} 
                    className="text-center"
                  >
                    <p className="text-xl md:text-2xl font-bold text-gold mb-1">{stat.value}</p>
                    <p className="text-[9px] md:text-[10px] text-white/50 uppercase tracking-widest font-medium leading-tight">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>


      </div>

      {/* Integrated Brands Carousel Bar */}
      <div className="bg-[#fafafa] py-10 md:py-12 relative overflow-hidden border-y border-gray-100 -mt-2 md:-mt-4">
        <div className="container mx-auto px-4 mb-6 text-center">
          <h3 className="text-gold text-xs font-bold uppercase tracking-[0.3em]">{t.brands.subtitle}</h3>
        </div>
        <div className="relative">
          <div className="flex animate-scroll-fast items-center">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 mx-6"
              >
                <div className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 rounded-xl p-6 md:p-8 flex items-center justify-center w-40 h-24 md:w-56 md:h-32 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] hover:border-gold/40 transition-all duration-500 group">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll-fast {
          animation: scroll-fast 40s linear infinite;
        }
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Conheça-nos Section - Full Integration */}
      <div id="sobre" className="bg-background py-10 md:py-16" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3 block">{t.about.subtitle}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-dark mt-1 mb-6 leading-tight">
                Liderança em <span className="text-gold">Procurement Industrial</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
                <p>{t.about.p2}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {values.map((value, index) => (
                  <motion.div 
                    key={value.title} 
                    initial={{ opacity: 0, y: 15 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * index }} 
                    className="bg-slate-50 shadow-xl shadow-gray-200/50 p-4 text-center border border-gray-100 rounded-xl hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300 group"
                  >
                    <value.icon className="w-5 h-5 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">{value.title}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-xl mx-auto lg:ml-auto">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Industrial warehouse NE Equipment" 
                  className="w-full h-[350px] md:h-[450px] object-cover" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-navy-dark/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 glass-card p-6 rounded-tr-2xl m-0 border-none shadow-none bg-white/95 backdrop-blur-md">
                  <p className="text-4xl md:text-5xl font-black text-gold mb-1 italic leading-none">100%</p>
                  <p className="text-[10px] md:text-xs font-bold text-navy-dark uppercase tracking-widest leading-tight">{t.about.commitment}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }} 
              className="glass-card p-8 border border-white/10 hover:border-gold/20 transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-navy-dark mb-4">{t.about.mission}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.about.missionText}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }} 
              className="glass-card p-8 border border-white/10 hover:border-gold/20 transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-navy-dark mb-4">{t.about.vision}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t.about.visionText}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }} 
              className="bg-gradient-to-br from-gold to-gold-light rounded-2xl p-8 shadow-xl shadow-gold/10"
            >
              <h3 className="text-xl font-bold text-navy-dark mb-4">{t.about.commitmentTitle}</h3>
              <p className="text-navy-dark/80 text-sm leading-relaxed">{t.about.commitmentText}</p>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
