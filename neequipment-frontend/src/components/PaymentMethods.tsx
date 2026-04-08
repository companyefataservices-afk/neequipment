import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const PaymentMethods = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, language } = useLanguage();

  const paymentMethods = [
    { 
      region: language === 'PT' ? "Móvel & Carteiras" : "Mobile & Wallets", 
      color: 'gold',
      methods: [
        { name: 'M-Pesa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/M-Pesa_Logo.svg/1200px-M-Pesa_Logo.svg.png' },
        { name: 'E-Mola', image: 'https://seeklogo.com/images/E/e-mola-logo-30646D08BE-seeklogo.com.png' },
        { name: 'Visa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/d1/Visa_2014_logo_detail.svg/2560px-Visa_2014_logo_detail.svg.png' }
      ]
    },
    { 
      region: language === 'PT' ? "Bancos Moçambique" : "Mozambique Banks", 
      color: 'gold',
      methods: [
        { name: 'Millennium bim', image: 'https://logospng.org/download/millennium-bim/millennium-bim.png' },
        { name: 'Standard Bank', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Standard_Bank_logo.svg/2560px-Standard_Bank_logo.svg.png' }
      ]
    },
    { 
      region: "B2B Solutions", 
      color: 'navy',
      methods: [
        { name: 'Invoiceing', image: 'https://cdn-icons-png.flaticon.com/512/2933/2933116.png' },
        { name: 'B2B Terms', image: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png' }
      ]
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy-dark to-navy" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.payment.title} <span className="text-gold">{t.payment.titleHighlight}</span>
          </h2>
          <p className="text-white/70">{t.payment.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {paymentMethods.map((payment, index) => (
            <motion.div key={payment.region} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className={`p-8 rounded-2xl backdrop-blur-xl ${payment.color === 'gold' ? 'bg-gold/10 border border-gold/30' : 'bg-white/5 border border-white/20'}`}>
              <h3 className="text-xl font-bold text-white mb-6 text-center">{payment.region}</h3>
              <div className="grid grid-cols-1 gap-4">
                {payment.methods.map((method) => (
                  <div key={method.name} className="bg-white rounded-xl p-4 flex items-center justify-center transition-transform hover:scale-105 shadow-md h-20">
                    <img 
                      src={method.image} 
                      alt={`${method.name} logo`} 
                      className={`object-contain max-h-full max-w-full ${method.name === 'Invoiceing' || method.name === 'B2B Terms' ? 'w-10 h-10 opacity-70' : 'w-28'}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className="flex items-center justify-center gap-2 mt-10 text-white/60 text-sm">
          <Shield className="w-4 h-4" />
          <span>{t.payment.secure}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethods;
