// Fatos institucionais e de contato da MSSERVER. Fonte: rodapé e páginas de
// msserver.com.br (consultadas em 28/10/2026). Altere aqui, nunca nos componentes.

export const SITE = {
  name: 'MSSERVER',
  origin: 'https://msserver.com.br',
  /**
   * URL publicada desta landing (canonical e og:url). Ainda não definida: sem
   * PUBLIC_CANONICAL_URL, a página sai sem canonical e com noindex, para não
   * concorrer com /solucoes-cloud-msserver/ nem com outras landings.
   */
  canonical: (import.meta.env.PUBLIC_CANONICAL_URL as string | undefined) ?? '',
  title: 'Cloud em Parceria para Profissionais de TI | MSSERVER',
  description:
    'Atende empresas e surgiu uma demanda de Cloud? Desenvolva o projeto com a MSSERVER: nuvem privada sob medida, migração e suporte. Monte o briefing no simulador.',
  locale: 'pt_BR',
} as const;

export const CONTACT = {
  whatsappNumber: '5511985991837',
  whatsappDisplay: '(11) 98599-1837',
  phoneE164: '+551148585358',
  phoneDisplay: '(11) 4858-5358',
  emailCommercial: 'comercial@msserver.com.br',
  emailGeneral: 'contato@msserver.com.br',
  hours: 'Atendimento das 8h às 18h',
  address: {
    street: 'R. Salvador de Sá, 182',
    district: 'Santa Terezinha',
    city: 'Santo André',
    region: 'SP',
    country: 'BR',
  },
} as const;

export const SOCIAL = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/msserver/' },
  { name: 'Instagram', url: 'https://www.instagram.com/msserver/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@msserversolucoesemservidor9811' },
  { name: 'Facebook', url: 'https://www.facebook.com/msserverinformatica/' },
] as const;

export const APP_STORES = {
  ios: 'https://apps.apple.com/br/app/msserver/id6444350263',
  android: 'https://play.google.com/store/apps/details?id=br.com.msserver',
} as const;

export const LINKS = {
  home: 'https://msserver.com.br/',
  about: 'https://msserver.com.br/sobre/',
  servers: 'https://msserver.com.br/servidores',
  cloud: 'https://msserver.com.br/solucoes-cloud-msserver/',
  privateCloud: 'https://msserver.com.br/nuvem-privada/',
  dedicatedHosting: 'https://msserver.com.br/servidores-dedicados/',
  backup: 'https://msserver.com.br/backup-em-nuvem/',
  consulting: 'https://msserver.com.br/consultoria-em-implantacao-de-servidores/',
  app: 'https://msserver.com.br/aplicativo-ms-server/',
  cases: 'https://msserver.com.br/cases-de-sucesso/',
  blog: 'https://msserver.com.br/blog/',
  support: 'https://msserver.com.br/obter-suporte/',
  quote: 'https://msserver.com.br/orcamento/',
} as const;

export const ANALYTICS = {
  // ID do container GTM encontrado no site atual: GTM-KTDRRP3. Só é carregado
  // quando PUBLIC_GTM_ID é definido no build de produção.
  gtmId: (import.meta.env.PUBLIC_GTM_ID as string | undefined) ?? '',
} as const;

export const whatsappUrl = (text: string) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
