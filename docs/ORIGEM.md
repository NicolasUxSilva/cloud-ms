# Origem, auditoria e decisões

## Projetos da MSSERVER

| Projeto | Repositório | Versão | Papel |
| --- | --- | --- | --- |
| Landing completa de servidores dedicados (com simulador) | `NicolasUxSilva/landing-ms` | tag `landing-completa-v1` = `main` = `archive/landing-completa`, commit `a5436cc` | Referência visual e técnica |
| Landing enxuta de servidores físicos | `NicolasUxSilva/landins-servidores-fisicos` | `main` `a8439e1` (o plugin WordPress está na branch local `feat/plugin-wordpress`, `4523480`) | Não alterada |
| **Landing de Cloud** (este projeto) | `NicolasUxSilva/cloud-ms` | partiu da tag `landing-completa-v1` (`a5436cc`) | Novo |

Este projeto foi exportado da tag `landing-completa-v1` com `git archive`, sem o
histórico. Os outros repositórios não foram alterados.

## O que veio da landing completa

- **Mantido:**
  - layout base, tokens e estilos globais;
  - fontes, ícones (`src/lib/icons.ts`) e animações de entrada (`data-reveal`);
  - header, menu móvel, footer, logos de clientes;
  - seção da equipe, FAQ, CTA final e botão flutuante de WhatsApp.
- **Adaptado para Cloud:**
  - hero, com uma nova ilustração de cluster de máquinas virtuais no mesmo estilo da
    ilustração de servidor;
  - aplicações (cenários de Cloud), diferenciais (bento com uptime e backup) e processo;
  - imagem de compartilhamento (`public/og-cloud-msserver.jpg`).
- **Criado:**
  - Benefícios;
  - Soluções (nuvem privada, servidor dedicado em data center, híbrida/multicloud).
- **Simulador:**
  - a interface vem do simulador original: etapas, barra de progresso, resumo lateral,
    folha de resumo no celular, persistência, atalhos e eventos;
  - os dados, as regras e o resumo foram reescritos em `src/cloud-simulator/`.
- **Removido:**
  - catálogo de servidores físicos e preços (`catalog.json`, `sync-catalog`);
  - modalidades de compra/locação, extensão de garantia, fotos de produtos, vídeo;
  - catálogo de hardware do data center (`datacenter.ts`);
  - formulário Elementor e endpoint mock;
  - plugin WordPress.

### Simulador original (referência, não alterado)

`landing-ms`, pasta `src/simulator/`:
- **Arquivos:** `types.ts`, `options.ts`, `rules.ts`, `summary.ts`, `ui.ts`,
  `contact.ts`, `lead.ts` e `analytics.ts`.
- **Etapas e opções:** sete etapas (objetivo, modalidade, processador, memória,
  armazenamento, serviços, envio), com caminhos "físico" e "data center".
- **Preços:** referência de preço publicada do catálogo (só na compra).
- **Envio:** formulário Elementor (página /orcamento/, post 509).

## Conteúdo de Cloud verificado (consultado em 28/10/2026)

| Fonte | O que foi usado |
| --- | --- |
| [/solucoes-cloud-msserver/](https://msserver.com.br/solucoes-cloud-msserver/) | Conceito "Cloud sob demanda e sem altos investimentos iniciais" (escalável, inovação, redução de custos, agilidade, mobilidade, segurança); soluções (Servidores Dedicados, Nuvem Privada, SaaS); configurador (Processador 2–22 cores, Memória 8–64 GB + outro, Armazenamento 300 GB–2 TB + outro, IP 1–6); processos (Análise, Orientação, Cloud Computing); diferenciais (máquinas espelhadas e 99,9% de uptime, programa de migração com instruções de uso, monitoramento personalizado) |
| [/nuvem-privada/](https://msserver.com.br/nuvem-privada/) | Nuvem sob medida e exclusiva; itens especificáveis (latência de storage, topologia de rede, criticidade, processadores virtuais, memória, periféricos, segurança, virtualização); custos previsíveis e isolamento de dados; 100% personalizável; segurança a nível de rede (ponto a ponto, VPN, firewall); suporte 24/7 em português e treinamentos sem custos adicionais; conectividade; empresa nacional; backup diário (serviço adicional) |
| [/servidores-dedicados/](https://msserver.com.br/servidores-dedicados/) | Console/KVM, desempenho de I/O, VLAN privada, VPN, firewall dedicado e link ponto a ponto (serviços adicionais); data center no Brasil; servidores de e-mail com grande fluxo |
| [/backup-em-nuvem/](https://msserver.com.br/backup-em-nuvem/) | Criptografia, redundância, automatização, recuperação |
| /cases-de-sucesso/ | "+15 anos no mercado" |

## Não verificado (por isso não aparece como fato)

- **Preços de Cloud:** não são publicados. O simulador não calcula valores.
- **SLA contratual:** o 99,9% aparece como "informado pela MSSERVER", e as condições
  ficam para a proposta.
- **Sistemas operacionais e hipervisores oferecidos:** não constam no site. Não viraram
  opção do simulador.
- **SaaS:** o site cita, mas não detalha. Ficou fora.
- **Valores máximos de "Outro":** são só limites de digitação (até 4.096 GB de memória
  e 1.000 TB de disco), não oferta comercial.

## Decisões

- **Contato só pelo WhatsApp:** o formulário Elementor só funciona servido no domínio
  do WordPress. Fora dele, um formulário pareceria enviar sem enviar.
- **Canonical:** sem `PUBLIC_CANONICAL_URL`, a página não tem canonical e sai com
  `noindex`.
- **Híbrida/multicloud:** entra como orientação, conforme o site ("Não importa seu
  estágio na adoção de Cloud..."), e não como produto com especificação própria.
