import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <LegalLayout 
      title="Termos e Condições" 
      subtitle="ACORDO DE UTILIZAÇÃO DO PORTAL B2B"
      icon={<FileText className="w-12 h-12 text-gold" />}
    >
      <div className="space-y-12 text-navy-dark/80 leading-relaxed font-medium">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">1. ACEITAÇÃO DOS TERMOS</h2>
          <p>
            Ao aceder e utilizar o portal da <strong>NE Equipment</strong>, a sua empresa concorda em cumprir estes Termos e Condições. Este portal é uma ferramenta profissional destinada exclusivamente a entidades corporativas e profissionais do sector industrial.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">2. PROCESSO DE COTAÇÃO E PROCUREMENT</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gold/20 p-6 rounded-2xl bg-gold/5">
                <span className="text-gold font-black text-2xl mb-4 block">01</span>
                <p className="text-xs uppercase font-bold text-navy-dark">Validade</p>
                <p className="text-[11px] mt-2">Todas as cotações têm validade limitada indicada no documento Quote PDF.</p>
            </div>
            <div className="border border-gold/20 p-6 rounded-2xl bg-gold/5">
                <span className="text-gold font-black text-2xl mb-4 block">02</span>
                <p className="text-xs uppercase font-bold text-navy-dark">Preços</p>
                <p className="text-[11px] mt-2">Preços podem variar conforme incoterms (EXW, FCA, DDP) acordados.</p>
            </div>
            <div className="border border-gold/20 p-6 rounded-2xl bg-gold/5">
                <span className="text-gold font-black text-2xl mb-4 block">03</span>
                <p className="text-xs uppercase font-bold text-navy-dark">Stock</p>
                <p className="text-[11px] mt-2">A disponibilidade é confirmada apenas após a submissão do pedido formal.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">3. LOGÍSTICA E ENTREGA</h2>
          <p>
            A NE Equipment coordena a logística global. Os prazos de entrega fornecidos são estimativas baseadas na cadeia de suprimentos actual e trânsito alfandegário. Não nos responsabilizamos por atrasos decorrentes de força maior ou processos burocráticos governamentais em fronteiras.
          </p>
        </section>

        <section className="space-y-4 border-l-4 border-navy-dark pl-6">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">4. RESPONSABILIDADE FINANCEIRA</h2>
          <p>
            O pagamento deve ser efectuado conforme as condições comerciais acordadas (transferência bancária, M-Pesa corporativo ou crédito aprovado). Os equipamentos permanecem propriedade da NE Equipment até à liquidação total do valor facturado.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">5. JURISDIÇÃO</h2>
          <p>
            Para qualquer litígio emergente da utilização do portal ou de transações comerciais directas, é eleito o foro da <strong>Cidade de Maputo, Moçambique</strong>, com renúncia expressa a qualquer outro.
          </p>
        </section>

        <div className="p-8 bg-muted/30 rounded-[30px] border border-dashed border-border flex items-start gap-6">
            <div className="text-primary mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <p className="text-xs italic text-muted-foreground">
                Nota: Estes termos são dinâmicos e podem ser actualizados para reflectir mudanças na legislação comercial regional. Recomendamos a consulta regular de qualquer alteração que possa impactar o seu negócio.
            </p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TermsAndConditions;
