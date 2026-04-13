import React from 'react';
import LegalLayout from '@/components/LegalLayout';
import { Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <LegalLayout 
      title="Política de Privacidade" 
      subtitle="PROTEÇÃO DE DADOS & CONFIDENCIALIDADE"
      icon={<Lock className="w-12 h-12 text-gold" />}
    >
      <div className="space-y-12 text-navy-dark/80 leading-relaxed font-medium">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">1. COMPROMISSO COM A PRIVACIDADE</h2>
          <p>
            Na <strong>NE Equipment</strong>, a privacidade e a segurança das informações dos nossos clientes sâo prioridades absolutas. Esta Política de Privacidade descreve como recolhemos, utilizamos e protegemos os seus dados, em estrita conformidade com a <strong>Lei de Protecção de Dados de Moçambique</strong> e o <strong>Protection of Personal Information Act (POPIA)</strong> da África do Sul.
          </p>
        </section>

        <section className="space-y-4 border-l-4 border-gold/20 pl-6">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">2. RECOLHA DE DADOS NO CONTEXTO B2B</h2>
          <p>
            Dada a nossa natureza estritamente corporativa (B2B), recolhemos dados essenciais para a facilitação de transações comerciais, procurement e logística internacional:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Dados da Entidade: Razão Social, NUIT/NIF, Morada Fiscal.</li>
            <li>Contactos Profissionais: Nome, cargo, e-mail e telefone de representantes.</li>
            <li>Informação Logística: Endereços de entrega e detalhes de cadeia de suprimentos.</li>
            <li>Documentação B2B: Arquivos de RFQ, facturas e comprovativos de pagamento.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">3. FINALIDADE DO TRATAMENTO</h2>
          <p>Utilizamos a informação recolhida exclusivamente para:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-muted/20 rounded-2xl border border-border/50">
              <h4 className="font-bold text-navy-dark mb-2">Execução de Contratos</h4>
              <p className="text-sm">Processamento de encomendas, cotações e coordenação logística transfronteiriça.</p>
            </div>
            <div className="p-6 bg-muted/20 rounded-2xl border border-border/50">
              <h4 className="font-bold text-navy-dark mb-2">Conformidade Legal</h4>
              <p className="text-sm">Cumprimento de obrigações fiscais, alfandegárias e normas anti-branqueamento de capitais.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-navy-dark uppercase tracking-tight">4. SEGURANÇA E RETENÇÃO</h2>
          <p>
            Implementamos protocolos de segurança de nível bancário para garantir que os dados das suas negociações permaneçam confidenciais. Não vendemos nem partilhamos dados com terceiros para fins de marketing. Os dados são retidos apenas pelo período necessário para fins fiscais e jurídicos.
          </p>
        </section>

        <section className="space-y-4 bg-navy-dark text-white p-8 rounded-[30px]">
          <h2 className="text-2xl font-black text-gold uppercase tracking-tight italic">5. OS SEUS DIREITOS</h2>
          <p className="text-sm text-white/80">
            Como utilizador do Portal NE Equipment, tem o direito de aceder, rectificar ou solicitar a eliminação dos seus dados (salvo obrigações legais de retenção). Para questões relacionadas com privacidade, contacte diretamente o nosso <strong>Data Protection Officer</strong> através de <strong>compliance@neequipment.co.mz</strong>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
