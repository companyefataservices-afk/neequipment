import { motion } from 'framer-motion';
import { Truck, CheckCircle, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const WhySection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Truck, title: t.hero.features.logistics, description: t.hero.features.logisticsDesc },
    { icon: CheckCircle, title: t.hero.features.quality, description: t.hero.features.qualityDesc },
    { icon: Shield, title: t.hero.features.transparency, description: t.hero.features.transparencyDesc },
  ];

  return (
    <div id="diferencial" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-16"
        >
          <span className="text-sm text-gold font-semibold uppercase tracking-wider">{t.hero.whySubtitle}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
            {t.hero.whyTitle} <span className="text-gold">NE Equipment</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.hero.whyDescription}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.1 * index }} 
              className="glass-card p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-navy-dark" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhySection;
