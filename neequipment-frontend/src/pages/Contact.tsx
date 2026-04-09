import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';

const countries = [
  { 
    name: 'MOÇAMBIQUE',
    flag: '🇲🇿',
    phones: ['+258 84 311 4354', '+258 87 319 71 52'],
    emails: ['sales@neequipment.co.mz', 'geral@neequipment.co.mz']
  },
  { 
    name: 'SOUTH AFRICA',
    flag: '🇿🇦',
    phones: ['+27 (63) 123 34 07', '+27 (78) 951-5256'],
    emails: ['sales@neequipment.co.za']
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waNumber = '258843114354';
    
    let subjectName = formData.subject;
    if (formData.subject === 'procurement') subjectName = t.contactPage.subjects.procurement;
    else if (formData.subject === 'cotacao') subjectName = t.contactPage.subjects.quote;
    else if (formData.subject === 'transporte') subjectName = t.contactPage.subjects.transport;
    else if (formData.subject === 'parceria') subjectName = t.contactPage.subjects.partnership;
    else if (formData.subject === 'outro') subjectName = t.contactPage.subjects.other;
    else if (!subjectName) subjectName = 'Não especificado';

    const text = `*Nova Mensagem do Site NE Equipment*\n\n*Nome:* ${formData.name}\n*Email:* ${formData.email}\n*Assunto:* ${subjectName}\n*Mensagem:* ${formData.message}`;
    
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    toast.success(t.contactPage.success);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20 pb-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-2">
              {t.contactPage.title} <span className="text-gold">{t.contactPage.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground mb-8">{t.contactPage.subtitle}</p>
            
            <div className="grid grid-cols-1 gap-6">
              {countries.map((country) => (
                <div key={country.name} className="glass-card p-5 md:p-6">
                  <h3 className="font-bold text-navy-dark text-lg mb-4 pb-3 border-b border-gold/20 flex items-center gap-3">
                    <span className="text-xl">{country.flag}</span>
                    {country.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {country.phones.map((phone, idx) => (
                        <div key={`phone-${idx}`} className="flex items-center gap-3 text-muted-foreground">
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <a href={`tel:${phone}`} className="font-semibold text-foreground hover:text-gold transition-colors text-sm md:text-base">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                    
                    <div className="w-full h-px bg-white/5" />

                    <div className="space-y-3">
                      {country.emails.map((email, idx) => (
                        <div key={`email-${idx}`} className="flex items-center gap-3 text-muted-foreground">
                          <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3.5 h-3.5 text-navy" />
                          </div>
                          <a href={`mailto:${email}`} className="text-navy font-medium hover:underline text-xs md:text-sm">
                            {email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <div className="glass-card overflow-hidden h-[450px] border border-gold/20 shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.814324838575!2d32.58783547596041!3d-25.95056307718023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee69a4396aa2367%3A0x23bfd27594111bdd!2sAv.%20Vladimir%20Lenine%2C%20Maputo!5e0!3m2!1spt-BR!2smz!4v1712678600000!5m2!1spt-BR!2smz" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização NE Equipment"
                  className="filter grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Floating Map Action */}
                <div className="absolute top-4 right-4 z-20">
                  <a 
                    href="https://maps.app.goo.gl/spkwckKs4sricGKL6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-navy-dark/90 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-white/10 shadow-xl hover:bg-gold hover:text-navy-dark transition-all duration-300"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    ABRIR NO GOOGLE MAPS
                  </a>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
                <div className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 text-gold" />
                  </div>
                  <span className="font-medium text-foreground/80">Av. Vladimir Lenine, Maputo, Moçambique</span>
                </div>
                <div className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] font-semibold">
                  Sede Central • Maputo
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="lg:sticky lg:top-24 h-fit">
            <div className="glass-card p-8 shadow-2xl shadow-gold/5">
              <h3 className="text-xl font-bold text-foreground mb-6">{t.contactPage.sendMessage}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">{t.contactPage.fullName}</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 rounded-xl" required />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">{t.contactPage.corporateEmail}</Label>
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 rounded-xl" required />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">{t.contactPage.subject}</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="mt-1 rounded-xl focus:ring-gold"><SelectValue placeholder={t.contactPage.subjectPlaceholder} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="procurement">{t.contactPage.subjects.procurement}</SelectItem>
                      <SelectItem value="cotacao">{t.contactPage.subjects.quote}</SelectItem>
                      <SelectItem value="transporte">{t.contactPage.subjects.transport}</SelectItem>
                      <SelectItem value="parceria">{t.contactPage.subjects.partnership}</SelectItem>
                      <SelectItem value="outro">{t.contactPage.subjects.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">{t.contactPage.message}</Label>
                  <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t.contactPage.messagePlaceholder} rows={5} className="mt-1 rounded-xl focus:ring-gold" required />
                </div>
                <Button type="submit" className="w-full bg-navy-dark hover:bg-navy text-white hover:text-gold font-bold rounded-xl transition-all shadow-lg hover:shadow-gold/20">
                  <Send className="w-4 h-4 mr-2" />
                  {t.contactPage.submit}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
