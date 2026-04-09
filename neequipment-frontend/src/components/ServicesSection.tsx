import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Globe, Package, FileCheck, Warehouse, Truck, MapPin, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

interface ServicesSectionProps {
  // onTransportClick removed as per freight removal task
}

const ServicesSection = ({ }: ServicesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const procurementServices = [
    { icon: Globe, title: t.services.procurement.sourcing, description: t.services.procurement.sourcingDesc },
    { icon: Package, title: t.services.procurement.supplyChain, description: t.services.procurement.supplyChainDesc },
  ];

  return (
    <section id="servicos" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-sm text-gold font-semibold uppercase tracking-wider">{t.services.subtitle}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
            {t.services.title} <span className="text-gold">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.services.description}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-navy-dark text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
                <Globe className="w-12 h-12 text-gold mb-6 relative z-10" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
                  {t.services.procurementTitle}
                </h3>
                <p className="text-white/80 relative z-10 leading-relaxed">
                  {t.services.description}
                </p>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-8 bg-white/40">
                {procurementServices.map((service) => (
                  <div key={service.title} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 border border-gold/20">
                      <service.icon className="w-6 h-6 text-navy-dark" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-2">{service.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
