import { CLOUD_CPUS, CLOUD_IPS, CLOUD_MEMORY_GB, CLOUD_STORAGE_GB, storageLabel } from '../data/cloud';
import type { Option, StepDef } from './types';
import { OTHER, UNSURE } from './types';

export const STEPS: StepDef[] = [
  { id: 'objetivo', label: 'Objetivo', title: 'O que a sua empresa quer levar para a nuvem?', lead: 'Escolha um ou mais usos e o momento do projeto. Isso orienta as dicas das próximas etapas.' },
  { id: 'modelo', label: 'Modelo', title: 'Qual modelo de Cloud faz mais sentido?', lead: 'Se ainda não souber, escolha a orientação: a equipe indica o modelo a partir do seu cenário.' },
  { id: 'processamento', label: 'Processador', title: 'Quanto processamento o ambiente precisa?', lead: 'Opções do configurador de Cloud da MSSERVER, em núcleos e threads.' },
  { id: 'memoria', label: 'Memória', title: 'Quanta memória RAM?', lead: 'De 8 a 64 GB, ou informe outra quantidade.' },
  { id: 'armazenamento', label: 'Disco', title: 'Quanto espaço de armazenamento?', lead: 'De 300 GB a 2 TB, ou informe outra capacidade. A tecnologia dos discos é definida na análise.' },
  { id: 'rede', label: 'Rede', title: 'Rede, proteção e serviços', lead: 'Defina a quantidade de IPs. Os demais itens são opcionais e entram na avaliação; alguns são serviços adicionais.' },
  { id: 'resumo', label: 'Resumo', title: 'Revise e envie para a equipe da MSSERVER', lead: 'Esta é uma configuração preliminar para avaliação. Valores, disponibilidade e arquitetura final são definidos pela equipe comercial.' },
];

export const WORKLOADS: Option[] = [
  { value: 'erp', title: 'Sistemas de gestão e ERP', description: 'ERP, sistemas fiscais, CRM e aplicações internas da empresa.', icon: 'layout-dashboard' },
  { value: 'database', title: 'Banco de dados', description: 'Bases que pedem leitura e gravação rápidas.', icon: 'database' },
  { value: 'web', title: 'Aplicações e sites', description: 'Sistemas web, portais e APIs.', icon: 'globe' },
  { value: 'files', title: 'Arquivos e compartilhamento', description: 'Arquivos da equipe acessíveis de qualquer lugar.', icon: 'folder-archive' },
  { value: 'email', title: 'Servidor de e-mail', description: 'Correio corporativo com grande fluxo de mensagens.', icon: 'mail' },
  { value: OTHER, title: 'Outro cenário', description: 'Descreva rapidamente a sua necessidade.', icon: 'pen-line' },
  { value: UNSURE, title: 'Ainda não sei', description: 'A equipe ajuda a definir a partir da sua operação.', icon: 'circle-help' },
];

export const SCENARIOS: Option[] = [
  { value: 'migrate', title: 'Migrar o que já existe', description: 'Levar sistemas que hoje rodam na empresa para a nuvem.', icon: 'cloud-upload' },
  { value: 'new', title: 'Novo projeto', description: 'Um ambiente que ainda não existe.', icon: 'sparkles' },
  { value: 'expand', title: 'Ampliar um ambiente', description: 'Mais recursos para um ambiente que já está na nuvem.', icon: 'trending-up' },
];

// Modalidades listadas em "Soluções em Cloud" e na página de Nuvem Privada.
export const MODELS: Option[] = [
  {
    value: 'private',
    title: 'Nuvem privada',
    description: 'Ambiente exclusivo e sob medida, com isolamento de dados e controle de acesso de rede.',
    icon: 'cloud',
  },
  {
    value: 'dedicated',
    title: 'Servidor dedicado em data center',
    description: 'Recursos exclusivos hospedados no data center, sem comprar equipamento.',
    icon: 'server',
  },
  {
    value: 'hybrid',
    title: 'Híbrida ou multicloud',
    description: 'Combinar a nuvem com o que a empresa já tem ou com outros provedores.',
    icon: 'network',
  },
  { value: UNSURE, title: 'Quero orientação', description: 'Os especialistas indicam o modelo para o seu estágio de adoção.', icon: 'compass' },
];

// "Especifique itens como ... criticidade do ambiente" (página de Nuvem Privada).
export const CRITICALITY: Option[] = [
  { value: 'high', title: 'Crítico', description: 'A operação não pode parar.' },
  { value: 'standard', title: 'Importante', description: 'Aceita janelas de manutenção.' },
  { value: UNSURE, title: 'Não sei' },
];

export const processorOptions = (): Option[] => [
  ...CLOUD_CPUS.map((c) => ({ value: c.id, title: `${c.cores} cores`, meta: `${c.threads} threads`, icon: 'cpu' })),
  { value: UNSURE, title: 'Quero recomendação', description: 'A equipe dimensiona a partir do seu uso.', icon: 'circle-help' },
];

export const memoryOptions = (): Option[] => [
  ...CLOUD_MEMORY_GB.map((gb) => ({ value: String(gb), title: `${gb} GB` })),
  { value: OTHER, title: 'Outro', description: 'Informe a quantidade' },
  { value: UNSURE, title: 'Não sei' },
];

export const storageOptions = (): Option[] => [
  ...CLOUD_STORAGE_GB.map((gb) => ({ value: String(gb), title: storageLabel(gb) })),
  { value: OTHER, title: 'Outro', description: 'Informe a capacidade' },
  { value: UNSURE, title: 'Não sei' },
];

// "Altíssima performance de I/O" e "latência de storage" (página de Nuvem Privada).
export const STORAGE_PROFILES: Option[] = [
  { value: 'performance', title: 'Velocidade de leitura e gravação', description: 'Baixa latência para bancos de dados e sistemas transacionais.', icon: 'zap' },
  { value: 'capacity', title: 'Capacidade', description: 'Mais espaço para arquivos e cópias.', icon: 'hard-drive' },
  { value: UNSURE, title: 'Não sei', description: 'A equipe indica a tecnologia de armazenamento.', icon: 'circle-help' },
];

export const ipOptions = (): Option[] => CLOUD_IPS.map((n) => ({ value: String(n), title: String(n) }));

// Recursos citados nas páginas de Soluções Cloud, Nuvem Privada, Servidores Dedicados
// e Backup em Nuvem. "Serviço adicional" quando o site informa assim.
export const SERVICES: (Option & { additional?: boolean })[] = [
  { value: 'backup', title: 'Backup diário', description: 'Cópias em ambiente externo, para recuperar arquivos, bancos e sistemas.', meta: 'Serviço adicional', icon: 'cloud-upload', additional: true },
  { value: 'vpn', title: 'VPN com o escritório', description: 'Interligação segura entre a nuvem e a rede da empresa.', icon: 'lock' },
  { value: 'p2p', title: 'Link ponto a ponto', description: 'Rede privada direta entre a nuvem e o escritório.', icon: 'cable' },
  { value: 'firewall', title: 'Firewall com regras restritivas', description: 'Controle de acesso a nível de rede.', icon: 'brick-wall' },
  { value: 'vlan', title: 'VLAN privada', description: 'Rede interna isolada para o tráfego entre servidores.', icon: 'network' },
  { value: 'migration', title: 'Migração e treinamento', description: 'Programa de migração com instruções de uso para a equipe.', icon: 'graduation-cap' },
  { value: 'monitoring', title: 'Monitoramento personalizado', description: 'Acompanhamento do ambiente para decisões de negócio e infraestrutura.', icon: 'activity' },
];

const titleOf = (list: Option[], v: string | null) => list.find((o) => o.value === v)?.title ?? '';

export const workloadTitle = (v: string) => titleOf(WORKLOADS, v);
export const scenarioTitle = (v: string | null) => titleOf(SCENARIOS, v);
export const modelTitle = (v: string | null) => titleOf(MODELS, v);
export const criticalityTitle = (v: string | null) => titleOf(CRITICALITY, v);
export const storageProfileTitle = (v: string | null) => titleOf(STORAGE_PROFILES, v);
export const serviceTitle = (v: string) => titleOf(SERVICES, v) || v;
