import { CLOUD_CPUS, storageLabel } from '../data/cloud';
import { criticalityTitle, modelTitle, roleTitle, scenarioTitle, serviceTitle, storageProfileTitle, workloadTitle } from './options';
import { customMemoryGb, customStorageGb } from './rules';
import type { SimState, StepId } from './types';
import { NOTES_MAX, OTHER, UNSURE } from './types';

export interface SummaryRow {
  step: StepId;
  label: string;
  value: string;
  detail?: string;
  status: 'set' | 'pending' | 'expert';
}

export const TBD = 'A definir com a equipe';

export function workloadsText(s: SimState): string {
  if (s.workloads.length === 0) return '';
  if (s.workloads.includes(UNSURE)) return TBD;
  return s.workloads.map((w) => (w === OTHER ? `Outro: ${s.otherWorkload.trim()}` : workloadTitle(w))).join(', ');
}

export function modelText(s: SimState): string {
  if (!s.model) return '';
  return s.model === UNSURE ? 'Orientação da equipe' : modelTitle(s.model);
}

export function processorText(s: SimState): { value: string; detail?: string } {
  if (!s.processor) return { value: '' };
  if (s.processor === UNSURE) return { value: TBD };
  const cpu = CLOUD_CPUS.find((c) => c.id === s.processor);
  return cpu ? { value: `${cpu.cores} cores`, detail: `${cpu.threads} threads` } : { value: '' };
}

export function memoryText(s: SimState): string {
  if (!s.memory) return '';
  if (s.memory === UNSURE) return TBD;
  if (s.memory === OTHER) {
    const gb = customMemoryGb(s);
    return gb === null ? '' : `${gb.toLocaleString('pt-BR')} GB (outro)`;
  }
  return `${s.memory} GB`;
}

export function storageText(s: SimState): string {
  if (!s.storage) return '';
  if (s.storage === UNSURE) return TBD;
  if (s.storage === OTHER) {
    const gb = customStorageGb(s);
    return gb === null ? '' : `${storageLabel(gb)} (outro)`;
  }
  return storageLabel(Number(s.storage));
}

export const ipsText = (s: SimState) => (s.ips ? `${s.ips} ${s.ips === '1' ? 'IP' : 'IPs'}` : '');

export const servicesText = (s: SimState) => (s.services.length ? s.services.map(serviceTitle).join(', ') : 'Nenhum item adicional');

/** Observações em uma linha, sem espaços extras e dentro do limite. */
export const notesText = (s: SimState) => s.notes.replace(/\s+/g, ' ').trim().slice(0, NOTES_MAX);

/** Linhas do resumo. Só as etapas obrigatórias contam no progresso ("x de 6"). */
export function summarize(s: SimState): SummaryRow[] {
  const row = (step: StepId, label: string, value: string, detail?: string): SummaryRow => ({
    step,
    label,
    value: value || 'Pendente',
    detail: value ? detail : undefined,
    status: !value ? 'pending' : value === TBD ? 'expert' : 'set',
  });
  const cpu = processorText(s);
  const crit = s.criticality && s.criticality !== UNSURE ? `Ambiente ${criticalityTitle(s.criticality).toLowerCase()}` : undefined;
  const profile = s.storageProfile && s.storageProfile !== UNSURE ? `Prioridade: ${storageProfileTitle(s.storageProfile).toLowerCase()}` : undefined;
  return [
    row('objetivo', 'Demanda', s.scenario ? workloadsText(s) : '', scenarioTitle(s.scenario) || undefined),
    row('modelo', 'Modelo', s.criticality ? modelText(s) : '', crit),
    row('processamento', 'Processamento', cpu.value, cpu.detail),
    row('memoria', 'Memória', memoryText(s)),
    row('armazenamento', 'Armazenamento', storageText(s), profile),
    row('rede', 'IPs', ipsText(s)),
  ];
}

/** Pares rótulo/valor das escolhas feitas (para a mensagem e o texto copiado). */
export function configLines(s: SimState): [string, string][] {
  const lines: [string, string][] = [];
  const push = (k: string, v: string) => v && lines.push([k, v]);
  push('Demanda', workloadsText(s));
  push('Momento', scenarioTitle(s.scenario));
  push('Modelo', modelText(s));
  push('Criticidade', s.criticality ? (s.criticality === UNSURE ? TBD : criticalityTitle(s.criticality)) : '');
  const cpu = processorText(s);
  push('Processamento', cpu.detail ? `${cpu.value} / ${cpu.detail}` : cpu.value);
  push('Memória', memoryText(s));
  push('Armazenamento', storageText(s));
  push('Prioridade do armazenamento', s.storageProfile ? (s.storageProfile === UNSURE ? TBD : storageProfileTitle(s.storageProfile)) : '');
  push('IPs', ipsText(s));
  if (s.services.length) push('Itens para avaliar', servicesText(s));
  push('Minha atuação', roleTitle(s.role));
  push('Observações', notesText(s));
  return lines;
}

/** Mensagem padrão dos CTAs de WhatsApp: deixa claro de onde veio o contato e o interesse em parceria. */
export const GENERAL_MESSAGE = 'Olá! Sou profissional de TI, vim pela página de Cloud da MSSERVER para quem atende empresas e quero conversar sobre desenvolver projetos de Cloud em parceria.';

/** Mensagem do FAQ. */
export const QUESTION_MESSAGE = 'Olá! Vim pela página de Cloud da MSSERVER para profissionais de TI e tenho uma dúvida sobre trabalhar projetos de Cloud em parceria.';

/**
 * Mensagem do WhatsApp com o briefing montado. Não contém dados pessoais:
 * links wa.me podem ser registrados como URL de saída pelo analytics.
 */
export function whatsappMessage(s: SimState, complete: boolean): string {
  const lines = configLines(s);
  if (lines.length === 0) return GENERAL_MESSAGE;
  return [
    complete
      ? 'Olá! Sou profissional de TI e vim pela página de Cloud da MSSERVER. Organizei no simulador a demanda de um cliente e quero avaliar o projeto em parceria com vocês.'
      : 'Olá! Sou profissional de TI e vim pela página de Cloud da MSSERVER. Comecei a organizar a demanda de um cliente no simulador e quero ajuda para concluir.',
    '',
    'Briefing preliminar:',
    ...lines.map(([k, v]) => `• ${k}: ${v}`),
    '',
    'Sei que valores, arquitetura e condições dependem da análise da equipe.',
  ].join('\n');
}

/** Texto para copiar e usar na conversa com o cliente ou em um e-mail (mesmo conteúdo, sem a saudação). */
export function plainSummary(s: SimState): string {
  return [
    'Briefing preliminar de Cloud (simulador MSSERVER)',
    ...configLines(s).map(([k, v]) => `${k}: ${v}`),
    'Sem valores: arquitetura, proposta e condições dependem da análise da equipe MSSERVER.',
  ].join('\n');
}
