// Conteúdo editorial da landing de Cloud para profissionais de TI que atendem empresas.
// As afirmações sobre a MSSERVER vêm das páginas publicadas em msserver.com.br,
// consultadas em 28/10/2026 e revisadas em 30/10/2026 (fonte em cada bloco):
//   SC = /solucoes-cloud-msserver/   NP = /nuvem-privada/
//   SD = /servidores-dedicados/      BK = /backup-em-nuvem/
// A MSSERVER não publica um programa de parceiros: nenhuma condição comercial
// (comissão, percentual, exclusividade) é afirmada aqui.

import type { Scenario, Workload } from '../cloud-simulator/types';

export const HERO_PROOF = [
  // NP: "Nuvem personalizada e exclusiva", "processadores virtuais e memória", "topologia de rede"
  { icon: 'cloud', title: 'Nuvem privada sob medida', text: 'Processamento, memória, storage e rede' },
  // SC: "Todos nossos recursos em Cloud com maquinas espelhadas, garantindo 99,9% de Uptime"
  { icon: 'activity', title: '99,9% de uptime', text: 'Informado pela MSSERVER, em máquinas espelhadas' },
  // SC: "Nosso programa de migração oferece instruções de uso para toda a equipe"
  { icon: 'graduation-cap', title: 'Programa de migração', text: 'Instruções de uso para a equipe do cliente' },
  // NP: "Somos uma empresa nacional" · SD: "data center no Brasil"
  { icon: 'map-pin', title: 'Empresa nacional', text: 'Data center no Brasil' },
];

/** Situações do dia a dia de quem atende empresas. Cada uma leva ao simulador com o contexto marcado. */
export interface Situation {
  id: string;
  icon: string;
  title: string;
  text: string;
  /** Recursos que costumam entrar no projeto (rótulos, não oferta). */
  fits: string[];
  workload?: Workload;
  scenario?: Scenario;
  service?: string;
}

export const SITUATIONS: Situation[] = [
  {
    id: 'servidor-local',
    icon: 'hard-drive',
    title: 'O servidor do escritório não dá mais conta',
    text: 'Disco no limite, memória no talo e um hardware que já passou da hora. Em vez de trocar peça por peça, o ambiente pode ir para a nuvem.',
    fits: ['Nuvem privada', 'Migração', 'Backup diário'],
    scenario: 'migrate',
  },
  {
    id: 'erp-remoto',
    icon: 'layout-dashboard',
    title: 'O ERP precisa funcionar fora do escritório',
    text: 'Filial, home office, contador acessando de outro lugar. Com o sistema na nuvem e VPN com o escritório, todo mundo usa o mesmo ambiente.',
    fits: ['Memória', 'VPN', 'Backup diário'],
    workload: 'erp',
  },
  {
    // NP: "Altíssima performance de I/O" · SD: "bancos de dados complexos"
    id: 'banco-lento',
    icon: 'database',
    title: 'O banco de dados trava no horário de pico',
    text: 'Consulta lenta, fechamento de mês que não termina e usuário reclamando. Pede recursos reservados e armazenamento com boa performance de I/O.',
    fits: ['Performance de I/O', 'Memória', 'Cores'],
    workload: 'database',
  },
  {
    // NP / BK: backup diário em ambiente externo, ransomware
    id: 'arquivos-backup',
    icon: 'folder-archive',
    title: 'Arquivos espalhados e backup que ninguém confere',
    text: 'HD externo, cópia manual e o medo de um ransomware. Arquivos centralizados na nuvem, com backup diário em ambiente externo.',
    fits: ['Capacidade', 'Backup diário', 'Acesso remoto'],
    workload: 'files',
    service: 'backup',
  },
  {
    id: 'sistema-novo',
    icon: 'globe',
    title: 'Sistema novo, sem lugar adequado para rodar',
    text: 'O cliente contratou ou desenvolveu uma aplicação web, um portal ou uma API e precisa de onde hospedar, com recursos reservados.',
    fits: ['Conectividade', 'IPs', 'Monitoramento'],
    workload: 'web',
    scenario: 'new',
  },
  {
    // SC: programa de migração
    id: 'trocar-provedor',
    icon: 'arrow-right-left',
    title: 'O cliente quer sair do provedor atual',
    text: 'Custo que não fecha, suporte distante ou recurso que não acompanha. A mudança pode ser planejada com a equipe e o programa de migração.',
    fits: ['Migração', 'Orientação', 'Suporte'],
    scenario: 'switch',
  },
];

export const situationPreset = (s: Situation) =>
  [s.workload && `workload:${s.workload}`, s.scenario && `scenario:${s.scenario}`, s.service && `service:${s.service}`].filter(Boolean).join(' ');

/** Divisão de papéis na parceria. Só descreve o que cada lado faz no projeto, sem condições comerciais. */
export const PARTNERSHIP = {
  you: [
    { icon: 'users', text: 'Conhece o cliente, os sistemas e o ambiente que roda hoje' },
    { icon: 'scan-search', text: 'Identifica a demanda quando ela aparece' },
    { icon: 'clipboard-list', text: 'Organiza os requisitos e leva o briefing para a MSSERVER' },
    { icon: 'messages-square', text: 'Acompanha o cliente e o dia a dia da operação' },
  ],
  us: [
    // SC / NP / SD
    { icon: 'cloud', text: 'Infraestrutura em nuvem: nuvem privada ou servidor dedicado em data center' },
    // SC ("Análise", "Orientação") · NP ("dimensionada pelos arquitetos")
    { icon: 'compass', text: 'Dimensionamento e arquitetura com os especialistas' },
    // SC
    { icon: 'graduation-cap', text: 'Programa de migração, com instruções de uso para a equipe do cliente' },
    // SC / NP
    { icon: 'shield-check', text: 'Monitoramento, segurança de rede e backup diário (adicional)' },
    // NP
    { icon: 'headset', text: 'Suporte técnico em português' },
  ],
};

export interface Project {
  model: 'private' | 'dedicated' | 'hybrid';
  icon: string;
  title: string;
  text: string;
  /** Quando costuma fazer sentido propor (orientação, não regra comercial). */
  when: string;
  points: string[];
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    // NP
    model: 'private',
    icon: 'cloud',
    title: 'Nuvem privada',
    text: 'Nuvem personalizada e exclusiva, dimensionada pelos arquitetos da MSSERVER conforme os pré-requisitos e o orçamento do cliente.',
    when: 'ERP, banco e arquivos que pedem um ambiente exclusivo e previsível.',
    points: ['Processadores virtuais, memória e latência de storage sob medida', 'Topologia de rede e critérios de segurança definidos no projeto', 'Periféricos específicos, como USB e placas PCI-e'],
    href: 'https://msserver.com.br/nuvem-privada/',
  },
  {
    // SC + SD
    model: 'dedicated',
    icon: 'server',
    title: 'Servidor dedicado em data center',
    text: 'Recursos exclusivos de alta performance hospedados no data center, para concentrar o ambiente sem o cliente comprar equipamento.',
    when: 'Cargas pesadas e estáveis que precisam de recursos só delas.',
    points: ['Console/KVM para ligar, reiniciar e montar ISOs', 'Baixa latência de leitura e gravação', 'VLAN privada, VPN e firewall dedicado (adicionais)'],
    href: 'https://msserver.com.br/servidores-dedicados/',
  },
  {
    // SC: "Não importa seu estágio na adoção de Cloud, se a sua necessidade é de cloud privada, multicloud ou híbrida..."
    model: 'hybrid',
    icon: 'network',
    title: 'Híbrida e multicloud',
    text: 'Não importa o estágio de adoção: os especialistas orientam a combinação da nuvem com o que o cliente já tem ou com outros provedores.',
    when: 'Parte do ambiente fica no escritório ou em outro provedor.',
    points: ['Análise de recursos e custos operacionais', 'Interligação com o escritório por VPN ou ponto a ponto', 'Conexão direta com grandes redes e IX.br'],
    // Consultoria: "Multicloud e Nuvem Híbrida"
    href: 'https://msserver.com.br/consultoria-em-implantacao-de-servidores/',
  },
];

// Argumentos para a conversa com o cliente.
// SC: "Cloud sob demanda e sem a necessidade de altos investimentos iniciais ... escalável"
// NP: "custos previsíveis, além de total controle ... isolamento de dados"
export const CLIENT_ARGUMENTS = [
  { icon: 'wallet', title: 'Sem altos investimentos iniciais', text: 'Cloud sob demanda: o cliente usa a infraestrutura sem comprar equipamento para começar.' },
  { icon: 'receipt', title: 'Custos previsíveis', text: 'Recursos dimensionados para a necessidade, sem pagar por tecnologia que o projeto não usa.' },
  { icon: 'trending-up', title: 'Cresce no mesmo ambiente', text: 'Os recursos acompanham o crescimento do negócio, sem trocar de estrutura.' },
  { icon: 'shield-check', title: 'Isolamento e controle', text: 'Ambiente exclusivo, controle de acesso de rede e requisitos de segurança próprios.' },
];

export const DIFFERENTIATORS = {
  // SC: "Todos nossos recursos em Cloud com maquinas espelhadas, garantindo 99,9% de Uptime, mantendo seus dados e serviços protegidos."
  uptime: {
    title: 'Recursos em máquinas espelhadas',
    text: 'Todos os recursos em Cloud ficam em máquinas espelhadas, com 99,9% de uptime informado pela MSSERVER, para manter os dados e serviços do cliente protegidos.',
  },
  items: [
    {
      icon: 'graduation-cap',
      title: 'Da implantação à utilização',
      // SC
      text: 'O programa de migração traz instruções de uso para toda a equipe do cliente, das aplicações às boas práticas de uso dos recursos.',
    },
    {
      icon: 'activity',
      title: 'Monitoramento personalizado',
      // SC
      text: 'Ferramentas de monitoramento personalizado dão informação para decisões de negócio e de infraestrutura.',
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
      text: 'Segurança jurídica, tributária e cambial de uma empresa brasileira. Dá para visitar as instalações.',
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

/**
 * Como a relação pode acontecer, do ponto de vista do profissional.
 * SC ("Processos": Análise, Orientação, Cloud Computing) + programa de migração.
 * O formato de cada parceria é combinado com a equipe comercial: os passos não definem condições.
 */
export const PROCESS: { who: 'you' | 'both' | 'us'; title: string; text: string }[] = [
  { who: 'you', title: 'Identificação da demanda', text: 'No suporte, numa visita ou numa reclamação: falta recurso, o servidor está no limite, o sistema precisa sair do escritório.' },
  { who: 'you', title: 'Briefing', text: 'Pelo simulador ou direto no WhatsApp: cargas de trabalho, recursos, rede e o que já existe. O que ainda não se sabe pode ficar em aberto.' },
  { who: 'both', title: 'Avaliação técnica', text: 'A equipe da MSSERVER analisa recursos e custos operacionais com você, buscando um ambiente enxuto, seguro e com alta disponibilidade.' },
  { who: 'both', title: 'Proposta e formato', text: 'Os especialistas indicam o modelo e a arquitetura, e vocês combinam como cada um participa do projeto.' },
  { who: 'us', title: 'Implantação e acompanhamento', text: 'O ambiente sobe com o programa de migração e segue com monitoramento e suporte da MSSERVER.' },
];

export const WHO_LABEL = { you: 'Você', both: 'Você + MSSERVER', us: 'MSSERVER' } as const;

export const FAQ = [
  {
    q: 'Como funciona a parceria? Existe comissão?',
    a: 'O formato de cada parceria, inclusive como cada lado participa do projeto e as condições comerciais, é conversado diretamente com a equipe comercial da MSSERVER. Esta página não define comissões, percentuais nem exclusividade. Chame no WhatsApp e conte como você atende os seus clientes.',
  },
  {
    q: 'Preciso ter todos os dados do cliente para usar o simulador?',
    a: 'Não. As etapas aceitam "Não sei" e "Quero recomendação", e a equipe completa o dimensionamento com você. O simulador também não pede dados pessoais, nem seus nem do cliente.',
  },
  {
    q: 'O simulador mostra preço?',
    a: 'Não. A MSSERVER não publica tabela de preços de Cloud. O simulador monta um briefing preliminar de requisitos, e a equipe analisa o cenário antes de qualquer proposta.',
  },
  {
    q: 'Posso usar o briefing na conversa com o meu cliente?',
    a: 'Pode. Na última etapa, o botão "Copiar briefing" gera um texto com as escolhas feitas, sem valores. A arquitetura final e a proposta vêm da equipe da MSSERVER depois da análise.',
  },
  {
    q: 'Quais modelos de Cloud dá para propor?',
    // SC / NP / SD
    a: 'Nuvem privada sob medida, servidor dedicado hospedado no data center e combinações híbridas ou multicloud com o que o cliente já tem. Se o modelo ainda não estiver claro, escolha "Quero orientação" no simulador.',
  },
  {
    q: 'A MSSERVER ajuda na migração?',
    // SC
    a: 'Sim. O programa de migração da MSSERVER oferece instruções de uso para toda a equipe do cliente, desde o uso das aplicações até as boas práticas de uso dos recursos. O plano de cada migração é definido na avaliação técnica.',
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
    q: 'Qual é a disponibilidade e como funciona o suporte?',
    // SC / NP
    a: 'A MSSERVER informa que todos os recursos em Cloud ficam em máquinas espelhadas, com 99,9% de uptime, e que os especialistas ficam à disposição 24/7 por telefone e portal, em português. O atendimento comercial é das 8h às 18h. As condições de cada contratação são detalhadas na proposta.',
  },
];
