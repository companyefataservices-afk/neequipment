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
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-dark mb-2">
              {t.contactPage.title} <span className="text-gold">{t.contactPage.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground">{t.contactPage.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Consolidated Contact Card */}
            <div className="lg:col-span-7">
              <div className="glass-card p-8 md:p-10 border-gold/10 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                
                <h3 className="text-xl font-bold text-navy-dark mb-8 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gold" />
                   </div>
                   Canais de Atendimento
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {countries.map((country) => (
                    <div key={country.name} className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                        <span className="text-2xl">{country.flag}</span>
                        <h4 className="font-bold text-navy-dark tracking-tight">{country.name}</h4>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Telefones</p>
                          {country.phones.map((phone, idx) => (
                            <a key={`phone-${idx}`} href={`tel:${phone}`} className="flex items-center gap-3 group">
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                <Phone className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold" />
                              </div>
                              <span className="font-bold text-foreground group-hover:text-gold transition-colors text-sm md:text-base">
                                {phone}
                              </span>
                            </a>
                          ))}
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">E-mail</p>
                          {country.emails.map((email, idx) => (
                            <a key={`email-${idx}`} href={`mailto:${email}`} className="flex items-center gap-3 group">
                              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-navy/10 transition-colors">
                                <Mail className="w-3.5 h-3.5 text-muted-foreground group-hover:text-navy" />
                              </div>
                              <span className="text-navy font-medium text-sm hover:underline">
                                {email}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-5 h-full">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="glass-card p-8 md:p-10 shadow-2xl shadow-gold/5 h-full border- gold/10">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <Send className="w-5 h-5 text-gold" />
                    {t.contactPage.sendMessage}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.contactPage.fullName}</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1.5 h-12 rounded-xl bg-muted/30 border-none focus:ring-gold" required />
                      </div>
                      <div>
                        <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.contactPage.corporateEmail}</Label>
                        <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1.5 h-12 rounded-xl bg-muted/30 border-none focus:ring-gold" required />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.contactPage.subject}</Label>
                      <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                        <SelectTrigger className="mt-1.5 h-12 rounded-xl bg-muted/30 border-none focus:ring-gold"><SelectValue placeholder={t.contactPage.subjectPlaceholder} /></SelectTrigger>
                        <SelectContent className="rounded-xl border-none shadow-2xl">
                          <SelectItem value="procurement">{t.contactPage.subjects.procurement}</SelectItem>
                          <SelectItem value="cotacao">{t.contactPage.subjects.quote}</SelectItem>
                          <SelectItem value="transporte">{t.contactPage.subjects.transport}</SelectItem>
                          <SelectItem value="parceria">{t.contactPage.subjects.partnership}</SelectItem>
                          <SelectItem value="outro">{t.contactPage.subjects.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.contactPage.message}</Label>
                      <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t.contactPage.messagePlaceholder} rows={4} className="mt-1.5 rounded-xl bg-muted/30 border-none focus:ring-gold resize-none" required />
                    </div>
                    <Button type="submit" className="w-full bg-navy-dark hover:bg-navy text-white hover:text-gold font-bold h-12 rounded-xl transition-all shadow-lg hover:shadow-gold/20">
                      <Send className="w-4 h-4 mr-2" />
                      {t.contactPage.submit}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Google Maps Section - Horizontal and Large */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <div className="glass-card overflow-hidden h-[520px] border border-gold/10 shadow-2xl relative group rounded-[2.5rem]">
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
              <div className="absolute top-6 right-6 z-20">
                <a 
                  href="https://maps.app.goo.gl/spkwckKs4sricGKL6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-navy-dark border border-white/10 text-white px-6 py-3.5 rounded-2xl text-xs font-bold shadow-2xl hover:bg-gold hover:text-navy-dark transition-all duration-300"
                >
                  <MapPin className="w-4 h-4" />
                  ABRIR NO GOOGLE MAPS
                </a>
              </div>

              {/* Sede Info Overlay */}
              <div className="absolute bottom-6 left-6 z-20 hidden md:block">
                <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-gold/10 shadow-2xl max-w-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shrink-0 shadow-lg shadow-gold/20">
                      <MapPin className="w-6 h-6 text-navy-dark" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-dark text-lg leading-tight mb-1">Sede Central</h4>
                      <p className="text-sm text-muted-foreground">Av. Vladimir Lenine, Maputo, Moçambique</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-center gap-8 px-1 opacity-60">
                <div className="h-px bg-border flex-1 hidden sm:block" />
                <div className="text-[11px] text-muted-foreground uppercase tracking-[0.4em] font-black">
                  Logística Integrada & Procurement Regional
                </div>
                <div className="h-px bg-border flex-1 hidden sm:block" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
