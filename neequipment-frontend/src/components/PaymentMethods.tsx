import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const PaymentMethods = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, language } = useLanguage();

  const paymentLogos = [
    { name: 'M-Pesa', image: '/logos/mpesa.png' },
    { name: 'E-Mola', image: '/logos/emola.png' },
    { name: 'Visa', image: '/logos/visa.png' },
    { name: 'Mastercard', image: '/logos/mastercard.png' }
  ];

  return (
    <section className="py-12 bg-navy" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6 }} 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 transition-opacity duration-500"
        >
          {paymentLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="cursor-pointer"
            >
              <img 
                src={logo.image} 
                alt={logo.name} 
                className="h-8 md:h-10 w-auto object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={isInView ? { opacity: 1 } : {}} 
          transition={{ duration: 0.6, delay: 0.8 }} 
          className="flex items-center justify-center gap-2 mt-8 text-white/40 text-xs"
        >
          <Shield className="w-3 h-3" />
          <span>{t.payment.secure}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethods;
