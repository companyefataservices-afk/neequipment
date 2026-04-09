import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
const logoNE = "/logo-ne-equipment.png";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t.footer.quickLinks.home, href: '#' },
    { name: t.footer.quickLinks.about, href: '#' },
    { name: t.footer.quickLinks.b2b, href: '#' },
    { name: t.footer.quickLinks.services, href: '#' },
    { name: t.footer.quickLinks.contact, href: '#' },
  ];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-6">
              <img src={logoNE} alt="NE Equipment" className="h-20 w-auto" />
            </div>
            <p className="text-white/60 text-sm mb-8 italic max-w-md">
              {t.header.quote}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-all duration-300 group">
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://instagram.com/neequipment.mz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-all duration-300 group">
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-all duration-300 group">
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="md:text-right flex flex-col md:items-end">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gold">{t.footer.navigation}</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors font-medium">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} NE EQUIPMENT MOÇAMBIQUE. {t.footer.allRights} Website: www.neequipment.co.mz</p>
            
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Pagamento:</span>
              <div className="flex gap-2">
                <div className="bg-white p-1 rounded">
                  <img src="/m-pesa.png" alt="M-Pesa" className="h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
                <div className="bg-white p-1 rounded">
                  <img src="/e-mola.png" alt="e-Mola" className="h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="#" className="hover:text-gold transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-gold transition-colors">{t.footer.terms}</a>
              <a href="#" className="hover:text-gold transition-colors">{t.footer.compliance}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
