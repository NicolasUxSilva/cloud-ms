import { describe, expect, it } from 'vitest';
import { CLOUD_CPUS, CLOUD_IPS, CLOUD_MEMORY_GB, CLOUD_STORAGE_GB } from '../../src/data/cloud';
import { memoryOptions, processorOptions, SERVICES, STEPS, storageOptions } from '../../src/cloud-simulator/options';
import { applyChange, customMemoryGb, customStorageGb, firstIncompleteStep, isComplete, parseAmount, validateStep } from '../../src/cloud-simulator/rules';
import { configLines, GENERAL_MESSAGE, plainSummary, summarize, whatsappMessage } from '../../src/cloud-simulator/summary';
import { emptyState, type SimState } from '../../src/cloud-simulator/types';
import { CONTACT, SITE, whatsappUrl } from '../../src/config/site';

const full = (over: Partial<SimState> = {}): SimState => ({
  ...emptyState(),
  workloads: ['erp', 'database'],
  scenario: 'migrate',
  model: 'private',
  criticality: 'high',
  processor: 'c8',
  memory: '32',
  storage: '900',
  storageProfile: 'performance',
  ips: '2',
  services: ['backup', 'vpn'],
  ...over,
});

describe('opções do configurador oficial', () => {
  it('processadores de 2 a 22 cores, com o dobro de threads', () => {
    expect(CLOUD_CPUS.map((c) => c.cores)).toEqual([2, 4, 8, 10, 12, 16, 18, 20, 22]);
    expect(CLOUD_CPUS.every((c) => c.threads === c.cores * 2)).toBe(true);
    expect(processorOptions().at(-1)?.value).toBe('unsure');
  });

  it('memória, armazenamento e IPs iguais ao site, com "Outro" e "Não sei"', () => {
    expect([...CLOUD_MEMORY_GB]).toEqual([8, 16, 32, 48, 64]);
    expect([...CLOUD_STORAGE_GB]).toEqual([300, 600, 900, 1200, 1500, 2000]);
    expect([...CLOUD_IPS]).toEqual([1, 2, 3, 4, 5, 6]);
    expect(memoryOptions().map((o) => o.value).slice(-2)).toEqual(['other', 'unsure']);
    expect(storageOptions().map((o) => o.title)).toContain('1,2 TB');
  });

  it('nenhuma opção ou texto do simulador traz preço', () => {
    const texts = [...processorOptions(), ...memoryOptions(), ...storageOptions(), ...SERVICES].flatMap((o) => [o.title, o.description, o.meta]).join(' ');
    expect(texts).not.toMatch(/R\$|\bpreço\b|mensal/i);
    expect(whatsappMessage(full(), true)).not.toMatch(/R\$/);
  });
});

describe('validação das etapas', () => {
  it('sem escolhas, todas as etapas obrigatórias ficam pendentes', () => {
    const s = emptyState();
    for (const step of STEPS.filter((x) => x.id !== 'resumo')) expect(validateStep(step.id, s)).not.toBeNull();
    expect(firstIncompleteStep(s)).toBe(0);
    expect(isComplete(s)).toBe(false);
  });

  it('configuração completa libera o resumo', () => {
    expect(isComplete(full())).toBe(true);
    expect(firstIncompleteStep(full())).toBe(STEPS.length - 1);
  });

  it('exige descrever "Outro cenário" e informar o momento do projeto', () => {
    expect(validateStep('objetivo', full({ workloads: ['other'], otherWorkload: 'a' }))).toMatch(/Descreva/);
    expect(validateStep('objetivo', full({ workloads: ['other'], otherWorkload: 'VDI' }))).toBeNull();
    expect(validateStep('objetivo', full({ scenario: null }))).toMatch(/migração/);
  });

  it('modelo pede criticidade', () => {
    expect(validateStep('modelo', full({ criticality: null }))).toMatch(/criticidade/);
    expect(validateStep('modelo', full({ model: 'unsure', criticality: 'unsure' }))).toBeNull();
  });

  it('memória "Outro" aceita só inteiros dentro do limite', () => {
    expect(validateStep('memoria', full({ memory: 'other', memoryOther: '' }))).toMatch(/GB/);
    expect(validateStep('memoria', full({ memory: 'other', memoryOther: '12,5' }))).toMatch(/inteiro/);
    expect(validateStep('memoria', full({ memory: 'other', memoryOther: '5000' }))).not.toBeNull();
    expect(customMemoryGb(full({ memory: 'other', memoryOther: '128' }))).toBe(128);
    expect(validateStep('memoria', full({ memory: 'other', memoryOther: '128' }))).toBeNull();
  });

  it('armazenamento "Outro" converte TB e aceita vírgula decimal', () => {
    expect(parseAmount('1,5')).toBe(1.5);
    expect(parseAmount('abc')).toBeNull();
    expect(customStorageGb(full({ storage: 'other', storageOther: '4', storageOtherUnit: 'TB' }))).toBe(4000);
    expect(customStorageGb(full({ storage: 'other', storageOther: '2,5', storageOtherUnit: 'TB' }))).toBe(2500);
    expect(validateStep('armazenamento', full({ storage: 'other', storageOther: '5' }))).toMatch(/10 GB/);
    expect(validateStep('armazenamento', full({ storage: 'other', storageOther: '5000', storageOtherUnit: 'TB' }))).toMatch(/1\.000 TB/);
  });

  it('IPs são obrigatórios; itens adicionais não', () => {
    expect(validateStep('rede', full({ ips: null }))).toMatch(/IPs/);
    expect(validateStep('rede', full({ services: [] }))).toBeNull();
  });
});

describe('dependências entre escolhas', () => {
  it('"Ainda não sei" é exclusivo entre os usos', () => {
    let s = applyChange(emptyState(), { workloads: ['erp', 'database'] }).state;
    s = applyChange(s, { workloads: [...s.workloads, 'unsure'] }).state;
    expect(s.workloads).toEqual(['unsure']);
    s = applyChange(s, { workloads: ['unsure', 'web'] }).state;
    expect(s.workloads).toEqual(['web']);
  });

  it('sair de "Outro" limpa o valor digitado', () => {
    let s = applyChange(emptyState(), { memory: 'other', memoryOther: '256', storage: 'other', storageOther: '3', storageOtherUnit: 'TB' }).state;
    s = applyChange(s, { memory: '64', storage: '2000' }).state;
    expect([s.memoryOther, s.storageOther, s.storageOtherUnit]).toEqual(['', '', 'GB']);
    s = applyChange(s, { workloads: ['other'], otherWorkload: 'VDI' }).state;
    s = applyChange(s, { workloads: ['erp'] }).state;
    expect(s.otherWorkload).toBe('');
  });
});

describe('resumo e mensagem para o comercial', () => {
  it('resumo com 6 linhas obrigatórias e estados corretos', () => {
    const rows = summarize(full());
    expect(rows.map((r) => r.label)).toEqual(['Uso', 'Modelo', 'Processamento', 'Memória', 'Armazenamento', 'IPs']);
    expect(rows.every((r) => r.status === 'set')).toBe(true);
    expect(rows[2]).toMatchObject({ value: '8 cores', detail: '16 threads' });
    const tbd = summarize(full({ processor: 'unsure', memory: 'unsure' }));
    expect(tbd[2].status).toBe('expert');
    expect(summarize(emptyState()).every((r) => r.status === 'pending')).toBe(true);
  });

  it('mensagem completa leva exatamente as escolhas feitas', () => {
    const msg = whatsappMessage(full({ memory: 'other', memoryOther: '128', storage: 'other', storageOther: '4', storageOtherUnit: 'TB' }), true);
    expect(msg).toMatch(/^Olá! Montei uma configuração preliminar no simulador de Cloud da MSSERVER/);
    expect(msg).toContain('• Uso: Sistemas de gestão e ERP, Banco de dados');
    expect(msg).toContain('• Momento: Migrar o que já existe');
    expect(msg).toContain('• Modelo: Nuvem privada');
    expect(msg).toContain('• Criticidade: Crítico');
    expect(msg).toContain('• Processamento: 8 cores / 16 threads');
    expect(msg).toContain('• Memória: 128 GB (outro)');
    expect(msg).toContain('• Armazenamento: 4 TB (outro)');
    expect(msg).toContain('• IPs: 2 IPs');
    expect(msg).toContain('• Itens para avaliar: Backup diário, VPN com o escritório');
    expect(msg).toContain('dependem da análise da equipe');
  });

  it('mensagem parcial e geral', () => {
    expect(whatsappMessage(emptyState(), false)).toBe(GENERAL_MESSAGE);
    const partial = whatsappMessage({ ...emptyState(), workloads: ['web'] }, false);
    expect(partial).toMatch(/^Olá! Comecei uma configuração/);
    expect(partial).toContain('• Uso: Aplicações e sites');
    expect(partial).not.toContain('Processamento');
  });

  it('não inclui dados pessoais e usa o número oficial', () => {
    expect(configLines(full()).map(([k]) => k)).not.toEqual(expect.arrayContaining(['Nome', 'E-mail', 'Telefone']));
    expect(whatsappUrl('x')).toBe(`https://wa.me/5511985991837?text=x`);
    expect(CONTACT.whatsappNumber).toBe('5511985991837');
    expect(plainSummary(full())).toContain('Sem valores');
  });

  it('metadados próprios de Cloud, sem canonical de outras landings', () => {
    expect(SITE.title).toMatch(/Cloud/);
    expect(SITE.canonical).not.toMatch(/servidores-dedicados|servidores-fisicos/);
  });
});
