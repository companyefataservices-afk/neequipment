import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Landmark, BadgePercent } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const PaymentMethods = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const paymentLogos = [
    { name: 'M-Pesa', image: '/mpesa.png', subtitle: 'Carteira Móvel', scale: 'scale-125 md:scale-150' },
    { name: 'E-Mola', image: '/emola.png', subtitle: 'Carteira Móvel', scale: 'scale-125 md:scale-150' },
    { name: 'Visa', image: 'https://cdn.jsdelivr.net/gh/rdimascio/icons@master/icons/visa.svg', subtitle: 'Crédito / Débito' },
    { name: 'Mastercard', image: 'https://cdn.jsdelivr.net/gh/rdimascio/icons@master/icons/mastercard.svg', subtitle: 'Crédito / Débito' }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-gold font-semibold uppercase tracking-wider mb-3 block">
              {t.payment.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.payment.title} <span className="text-gold">{t.payment.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Estão disponíveis como método de pagamento <span className="text-foreground font-semibold italic">POS, carteiras móveis, transferência bancária</span> e outras <span className="text-foreground font-semibold italic">condições comerciais flexíveis</span>.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {paymentLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="glass-card h-full p-8 flex flex-col items-center justify-center text-center transition-all duration-500 border-white/20 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10">
                <div className="h-20 md:h-24 w-full relative flex items-center justify-center mb-6 px-4">
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className={`max-h-full max-w-full object-contain transition-transform duration-300 ${logo.scale || ''}`}
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-foreground group-hover:text-gold transition-colors duration-300 text-sm md:text-base">
                  {logo.name}
                </h3>
                <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 font-medium">
                  {logo.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security and Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16 text-muted-foreground/60 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em]"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span>{t.payment.secure}</span>
          </div>
          <span className="hidden md:inline text-navy-dark/10">•</span>
          <div className="flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-gold" />
            <span>Transferência Bancária</span>
          </div>
          <span className="hidden md:inline text-navy-dark/10">•</span>
          <div className="flex items-center gap-2">
            <BadgePercent className="w-3.5 h-3.5 text-gold" />
            <span>Condições Flexíveis</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethods;
