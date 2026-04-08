import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const PaymentMethods = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, language } = useLanguage();

  const paymentLogos = [
    { name: 'M-Pesa', image: 'https://www.enmedhealth.co.mz/_next/image?url=%2Fmpesa.png&w=64&q=75' },
    { name: 'E-Mola', image: 'https://www.enmedhealth.co.mz/_next/image?url=%2Femola.png&w=64&q=75' },
    { name: 'Visa', image: 'https://www.enmedhealth.co.mz/_next/image?url=%2Fvisa.png&w=64&q=75' },
    { name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' },
    { name: 'Millennium bim', image: 'https://logospng.org/download/millennium-bim/millennium-bim.png' },
    { name: 'Standard Bank', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Standard_Bank_logo.svg/2560px-Standard_Bank_logo.svg.png' }
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="transition-all duration-300"
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
