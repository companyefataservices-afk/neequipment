import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const LegalLayout = ({ title, subtitle, children, icon }: LegalLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-navy-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-8"
          >
            <div className="p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
              {icon || <Shield className="w-12 h-12 text-gold animate-pulse" />}
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight uppercase">
                {title}
              </h1>
              <p className="text-gold font-bold tracking-[0.2em] text-sm uppercase">
                {subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Navigation/Table of Contents Sidebar */}
          <aside className="lg:col-span-3">
             <div className="sticky top-24 space-y-8">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-navy-dark hover:text-gold hover:bg-gold/5 rounded-xl font-bold transition-all"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    VOLTAR
                </Button>
                
                <div className="p-8 bg-muted/30 rounded-3xl border border-border/50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">Informação Legal</h3>
                    <ul className="space-y-4">
                        <li className="text-sm font-bold text-navy-dark border-l-2 border-gold pl-4">Documento Vigente</li>
                        <li className="text-xs text-muted-foreground uppercase font-medium">Última Actualização: Abril 2024</li>
                    </ul>
                </div>
                
                <div className="p-8 bg-navy-dark rounded-3xl text-white shadow-xl shadow-navy-dark/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield className="w-16 h-16" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 relative z-10">Dúvidas Jurídicas?</h4>
                    <p className="text-xs text-white/60 mb-6 relative z-10 font-medium">Nossa equipa de compliance está disponível para esclarecimentos.</p>
                    <Button className="w-full bg-gold hover:bg-gold-light text-navy-dark font-black text-[10px] uppercase tracking-wider rounded-xl relative z-10">
                        Contactar Suporte
                    </Button>
                </div>
             </div>
          </aside>

          {/* Main Legal Content */}
          <article className="lg:col-span-9 prose prose-navy max-w-none">
            <div className="bg-card border border-border/50 rounded-[40px] p-8 lg:p-16 shadow-sm shadow-navy-dark/5">
                {children}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
