import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { ShieldCheck, Scale, Heart, Globe } from 'lucide-react';

const Compliance = () => {
  return (
    <LegalLayout 
      title="Compliance e Integridade" 
      subtitle="NOSSO CÓDIGO DE EXCELÊNCIA ÉTICA"
      icon={<ShieldCheck className="w-12 h-12 text-gold" />}
    >
      <div className="space-y-16 text-navy-dark/80 leading-relaxed font-medium">
        
        {/* Intro */}
        <section className="space-y-6">
          <p className="text-xl italic border-l-4 border-gold pl-8 py-2">
            "A integridade é o motor que move a NE Equipment. Não aceitamos atalhos. Nossa reputação é construída sobre a transparência total em cada negociação."
          </p>
        </section>

        {/* Pillar 1: Anti-Corruption */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-navy-dark rounded-xl text-gold">
                <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">POLÍTICA ANTI-CORRUPÇÃO</h2>
          </div>
          <p>
            A NE Equipment adopta uma postura de <strong>Tolerância Zero</strong> para qualquer forma de suborno ou corrupção. Proibimos estritamente o oferecimento ou aceitação de pagamentos de facilitação ou vantagens indevidas a terceiros, sejam eles funcionários públicos ou parceiros privados.
          </p>
          <div className="bg-muted/30 p-8 rounded-[40px] border border-border/50">
             <h4 className="text-sm font-black uppercase mb-4 text-navy-dark">Directrizes Estritas:</h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wide">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> Auditoria de Fornecedores</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> Registos Financeiros Transparentes</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> Canal de Denúncia Seguro</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> Formação Ética Contínua</li>
             </ul>
          </div>
        </section>

        {/* Pillar 2: Human Rights */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-navy-dark rounded-xl text-gold">
                <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">DIREITOS HUMANOS E DIGNIDADE</h2>
          </div>
          <p>
            Estamos comprometidos com a erradicação de práticas de trabalho forçado e trabalho infantil em toda a nossa cadeia de suprimentos. Exigimos que todos os nossos parceiros globais adiram aos padrões da <strong>Organização Internacional do Trabalho (OIT)</strong>.
          </p>
        </section>

        {/* Pillar 3: Sustainability */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-navy-dark rounded-xl text-gold">
                <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">GOVERNAÇÃO E LOGÍSTICA VERDE</h2>
          </div>
          <p>
            Entendemos o impacto ambiental do transporte industrial. Optimizamos as nossas rotas e processos de desalfandegamento para reduzir a pegada de carbono do seu procurement, promovendo uma governação sustentável e responsável.
          </p>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-navy-dark to-navy text-white p-12 rounded-[50px] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <h3 className="text-3xl font-black text-gold mb-6 uppercase italic">Dignos de Confiança</h3>
            <p className="max-w-2xl mx-auto text-white/70 text-sm mb-10 leading-loose">
               Se tiver conhecimento de qualquer prática que viole estes princípios éticos no contexto da nossa colaboração, por favor utilize o nosso canal de integridade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-bold">
                <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/20 text-xs tracking-widest">
                    ETHICS LINE: (+258) XXX XXX XXX
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-2xl border border-white/20 text-xs tracking-widest uppercase">
                    integrity@neequipment.co.mz
                </div>
            </div>
        </section>

      </div>
    </LegalLayout>
  );
};

export default Compliance;
