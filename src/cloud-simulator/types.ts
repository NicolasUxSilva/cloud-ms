// Modelo de dados do simulador de Cloud. Independente do simulador de servidores
// dedicados (repositório landing-ms): nada aqui depende de catálogo ou preço.

export type Workload = 'erp' | 'database' | 'web' | 'files' | 'email' | 'other' | 'unsure';
export type Scenario = 'migrate' | 'new' | 'expand';
export type CloudModel = 'private' | 'dedicated' | 'hybrid' | 'unsure';
export type Criticality = 'high' | 'standard' | 'unsure';
export type StorageProfile = 'performance' | 'capacity' | 'unsure';
export type StorageUnit = 'GB' | 'TB';

export const UNSURE = 'unsure';
export const OTHER = 'other';

export interface SimState {
  workloads: Workload[];
  otherWorkload: string;
  scenario: Scenario | null;
  model: CloudModel | null;
  criticality: Criticality | null;
  /** Id do processador (ex.: 'c8') ou 'unsure'. */
  processor: string | null;
  /** GB ('8'…'64'), 'other' ou 'unsure'. */
  memory: string | null;
  memoryOther: string;
  /** GB ('300'…'2000'), 'other' ou 'unsure'. */
  storage: string | null;
  storageOther: string;
  storageOtherUnit: StorageUnit;
  storageProfile: StorageProfile | null;
  /** '1'…'6'. */
  ips: string | null;
  services: string[];
}

export interface Option {
  value: string;
  title: string;
  description?: string;
  meta?: string;
  icon?: string;
  group?: string;
}

export interface Notice {
  tone: 'info' | 'warning';
  text: string;
}

export type StepId = 'objetivo' | 'modelo' | 'processamento' | 'memoria' | 'armazenamento' | 'rede' | 'resumo';

export interface StepDef {
  id: StepId;
  label: string;
  title: string;
  lead: string;
}

export const emptyState = (): SimState => ({
  workloads: [],
  otherWorkload: '',
  scenario: null,
  model: null,
  criticality: null,
  processor: null,
  memory: null,
  memoryOther: '',
  storage: null,
  storageOther: '',
  storageOtherUnit: 'GB',
  storageProfile: null,
  ips: null,
  services: [],
});
