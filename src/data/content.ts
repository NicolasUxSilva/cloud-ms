// Conteúdo editorial da landing de Cloud. As afirmações sobre a MSSERVER vêm das
// páginas publicadas em msserver.com.br, consultadas em 28/10/2026 (fonte em cada bloco):
//   SC = /solucoes-cloud-msserver/   NP = /nuvem-privada/
//   SD = /servidores-dedicados/      BK = /backup-em-nuvem/

import type { Workload } from '../cloud-simulator/types';

export const HERO_PROOF = [
  // SC: "Todos nossos recursos em Cloud com maquinas espelhadas, garantindo 99,9% de Uptime"
  { icon: 'activity', title: '99,9% de uptime', text: 'Recursos em máquinas espelhadas' },
  // NP: "nossos especialistas estão à disposição 24/7, por telefone e portal de atendimento, falando com você em português"
  { icon: 'headset', title: 'Suporte 24/7', text: 'Em português, por telefone e portal' },
  // SC: "Nosso programa de migração oferece instruções de uso para toda a equipe"
  { icon: 'cloud-upload', title: 'Migração assistida', text: 'Com treinamento da equipe' },
  // NP: "Somos uma empresa nacional" · SD: "data center no Brasil"
  { icon: 'map-pin', title: 'Empresa nacional', text: 'Data center no Brasil' },
];

// SC: "Cloud sob demanda e sem a necessidade de altos investimentos iniciais ... escalável
// gerando inovação, redução de custos, agilidade, mobilidade e segurança."
// NP: "benefícios de uma nuvem pública, combinados a itens de performance, escalabilidade
// e custos previsíveis, além de total controle ... isolamento de dados."
export const BENEFITS = [
  { icon: 'wallet', title: 'Sem altos investimentos iniciais', text: 'Cloud sob demanda: a empresa usa a infraestrutura sem comprar equipamentos para começar.' },
  { icon: 'trending-up', title: 'Escalável', text: 'Os recursos acompanham o crescimento do negócio, sem trocar de ambiente.' },
  { icon: 'receipt', title: 'Custos previsíveis', text: 'Recursos dimensionados para a necessidade, sem pagar por tecnologia que o projeto não usa.' },
  { icon: 'globe', title: 'Mobilidade', text: 'Sistemas e arquivos acessíveis pela equipe de onde ela estiver trabalhando.' },
  { icon: 'shield-check', title: 'Segurança e isolamento', text: 'Controle de acesso de rede, isolamento de dados e requisitos de segurança exclusivos.' },
  { icon: 'zap', title: 'Agilidade', text: 'Coloque aplicativos atuais na nuvem de forma simples, com recursos sob medida.' },
];

export interface Solution {
  model: 'private' | 'dedicated' | 'hybrid';
  icon: string;
  title: string;
  text: string;
  points: string[];
  href?: string;
}

export const SOLUTIONS: Solution[] = [
  {
    // NP
    model: 'private',
    icon: 'cloud',
    title: 'Nuvem privada',
    text: 'Nuvem personalizada e exclusiva para a sua operação, dimensionada pelos arquitetos da MSSERVER sem extrapolar o orçamento.',
    points: ['Processadores virtuais, memória e latência de storage sob medida', 'Topologia de rede e critérios de segurança definidos com você', 'Periféricos específicos, como USB e placas PCI-e'],
    href: 'https://msserver.com.br/nuvem-privada/',
  },
  {
    // SC + SD
    model: 'dedicated',
    icon: 'server',
    title: 'Servidor dedicado em data center',
    text: 'Recursos exclusivos de alta performance hospedados no data center, para concentrar o ambiente sem comprar equipamento.',
    points: ['Console/KVM para ligar, reiniciar e montar ISOs', 'Baixa latência de leitura e gravação', 'VLAN privada, VPN e firewall dedicado (adicionais)'],
    href: 'https://msserver.com.br/servidores-dedicados/',
  },
  {
    // SC: "Não importa seu estágio na adoção de Cloud, se a sua necessidade é de cloud privada, multicloud ou híbrida..."
    model: 'hybrid',
    icon: 'network',
    title: 'Híbrida e multicloud',
    text: 'Não importa o estágio de adoção: os especialistas orientam a combinação da nuvem com o que a empresa já tem ou com outros provedores.',
    points: ['Análise de recursos e custos operacionais', 'Interligação com o escritório por VPN ou ponto a ponto', 'Conexão direta com grandes redes e IX.br'],
  },
];

export interface UseCase {
  workload: Workload;
  icon: string;
  title: string;
  text: string;
  priorities: string[];
}

export const USE_CASES: UseCase[] = [
  {
    // SC: "Coloque aplicativos atuais em Cloud de forma simples"
    workload: 'erp',
    icon: 'layout-dashboard',
    title: 'ERP e sistemas de gestão',
    text: 'Leve os sistemas que a empresa já usa para a nuvem e acesse de qualquer lugar, com a equipe treinada na migração.',
    priorities: ['Memória', 'Backup diário', 'VPN'],
  },
  {
    // NP: "Altíssima performance de I/O" · SD: "bancos de dados complexos"
    workload: 'database',
    icon: 'database',
    title: 'Bancos de dados',
    text: 'Operações que pedem armazenamento de baixíssima latência e alto poder de leitura e gravação.',
    priorities: ['Performance de I/O', 'Memória', 'Núcleos'],
  },
  {
    workload: 'web',
    icon: 'globe',
    title: 'Aplicações e sites',
    text: 'Sistemas web, portais e APIs com recursos reservados e conexão direta com grandes redes.',
    priorities: ['Conectividade', 'IPs', 'Monitoramento'],
  },
  {
    // BK + NP (backup diário)
    workload: 'files',
    icon: 'folder-archive',
    title: 'Arquivos e cópias de segurança',
    text: 'Arquivos da equipe na nuvem, com backup em ambiente externo para recuperar de exclusões, falhas ou ransomware.',
    priorities: ['Capacidade', 'Backup diário', 'Acesso remoto'],
  },
  {
    // SD: "servidores de email com grande fluxo de mensagens"
    workload: 'email',
    icon: 'mail',
    title: 'E-mail corporativo',
    text: 'Servidores de e-mail com grande fluxo de mensagens, sem perder velocidade de resposta.',
    priorities: ['Performance de I/O', 'Armazenamento', 'Segurança de rede'],
  },
];

export const DIFFERENTIATORS = {
  // SC: "Todos nossos recursos em Cloud com maquinas espelhadas, garantindo 99,9% de Uptime, mantendo seus dados e serviços protegidos."
  uptime: {
    title: 'Recursos em máquinas espelhadas',
    text: 'Todos os recursos em Cloud ficam em máquinas espelhadas, com 99,9% de uptime informado pela MSSERVER, para manter dados e serviços protegidos.',
  },
  items: [
    {
      icon: 'graduation-cap',
      title: 'Da implantação à utilização',
      // SC
      text: 'O programa de migração traz instruções de uso para toda a equipe, das aplicações às boas práticas de uso dos recursos.',
    },
    {
      icon: 'activity',
      title: 'Monitoramento e segurança',
      // SC
      text: 'Ferramentas de monitoramento personalizado mantêm você informado para decisões de negócio e de infraestrutura.',
    },
    {
      icon: 'headset',
      title: 'Suporte e treinamento',
      // NP
      text: 'Especialistas à disposição 24/7, por telefone e portal, em português. Treinamentos para a equipe sem custos adicionais.',
    },
    {
      icon: 'lock',
      title: 'Segurança a nível de rede',
      // NP
      text: 'Controle de acesso de rede, com interligação ao escritório por rede privada ponto a ponto, VPN ou regras restritivas de firewall.',
    },
    {
      icon: 'waypoints',
      title: 'Conectividade',
      // NP / SD
      text: 'Conexão direta com Akamai, Cloudflare, Microsoft, Google, AWS e UPX, peerings do IX.br e trânsito por múltiplas operadoras.',
    },
    {
      icon: 'building-2',
      title: 'Empresa nacional',
      // NP
      text: 'Segurança jurídica, tributária e cambial de uma empresa brasileira. Você pode visitar as instalações.',
    },
  ],
  // NP / SD / BK
  backup: {
    title: 'Backup diário',
    text: 'Dados armazenados em ambiente externo e à prova de falhas, para casos de remoção indevida de arquivos, banco de dados corrompido, problemas de sistema ou ransomware. Serviço adicional.',
    link: { href: 'https://msserver.com.br/backup-em-nuvem/', label: 'Conheça o backup em nuvem' },
  },
};

export const STATS = [
  // /cases-de-sucesso/ ("+15 Anos no Mercado")
  { value: '+15', label: 'anos no mercado' },
  // NP ("à disposição 24/7, por telefone e portal de atendimento")
  { value: '24/7', label: 'suporte especializado' },
];

// SC ("Processos": Análise, Orientação, Cloud Computing) + contato ("Converse com um consultor para receber um orçamento").
export const PROCESS = [
  { title: 'Você descreve a necessidade', text: 'Pelo simulador ou pelo WhatsApp: usos, recursos e o que já existe na empresa.' },
  { title: 'Análise', text: 'A equipe analisa recursos e custos operacionais, buscando um ambiente enxuto, seguro e com alta disponibilidade.' },
  { title: 'Orientação e orçamento', text: 'Os especialistas indicam o modelo (privada, híbrida ou multicloud) e um consultor envia o orçamento.' },
  { title: 'Implantação e migração', text: 'Os aplicativos vão para a nuvem com o programa de migração e instruções de uso para a equipe.' },
];

export const FAQ = [
  {
    q: 'O que é a nuvem privada da MSSERVER?',
    // NP
    a: 'É uma nuvem personalizada e exclusiva para a sua operação. Os arquitetos da MSSERVER dimensionam processadores virtuais, memória, latência de storage, topologia de rede, critérios de segurança e tecnologia de virtualização conforme os pré-requisitos e o orçamento da empresa.',
  },
  {
    q: 'Preciso comprar equipamentos para usar a Cloud?',
    // SC
    a: 'Não. O conceito da MSSERVER é fornecer Cloud sob demanda e sem a necessidade de altos investimentos iniciais. A infraestrutura fica no data center e os recursos são dimensionados para a sua necessidade.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende da configuração. A MSSERVER não publica uma tabela de preços de Cloud, por isso o simulador não mostra valores: ele monta uma configuração preliminar que a equipe analisa antes de enviar o orçamento.',
  },
  {
    q: 'Vocês fazem a migração dos sistemas atuais?',
    // SC
    a: 'Sim. O programa de migração da MSSERVER oferece instruções de uso para toda a equipe, desde o uso das aplicações até as boas práticas de uso dos recursos.',
  },
  {
    q: 'Como fica a segurança do ambiente?',
    // NP / SD / SC
    a: 'O ambiente tem controle de acesso a nível de rede e pode ser interligado ao escritório por rede privada ponto a ponto, VPN ou regras restritivas de firewall. Há também ferramentas de monitoramento personalizado. Alguns recursos de rede são serviços adicionais.',
  },
  {
    q: 'Os dados têm backup?',
    // NP / BK
    a: 'O backup diário é um serviço adicional: os dados ficam em ambiente externo e à prova de falhas, para recuperar arquivos removidos, bancos de dados corrompidos, problemas de sistema e ataques de ransomware. A MSSERVER também oferece backup em nuvem com criptografia e redundância.',
  },
  {
    q: 'Como funciona o suporte?',
    // NP
    a: 'Os especialistas ficam à disposição 24/7, por telefone e portal de atendimento, em português. A MSSERVER também faz treinamentos para a sua equipe, sem custos adicionais.',
  },
  {
    q: 'Posso combinar com o que a empresa já tem?',
    // SC
    a: 'Sim. Não importa o estágio de adoção de Cloud: se a necessidade é de nuvem privada, multicloud ou híbrida, os especialistas orientam a jornada. No simulador, escolha "Híbrida ou multicloud" ou "Quero orientação".',
  },
  {
    q: 'Qual é a disponibilidade do ambiente?',
    // SC
    a: 'A MSSERVER informa que todos os recursos em Cloud ficam em máquinas espelhadas, com 99,9% de uptime. As condições de cada contratação são detalhadas na proposta.',
  },
];
