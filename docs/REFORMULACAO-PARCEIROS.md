# Reformulação: Cloud para profissionais de TI parceiros

Revisão de 30/10/2026. A landing deixou de falar com a empresa que contrata Cloud e
passou a falar com quem atende empresas: técnicos, analistas de infraestrutura e redes,
consultores, integradores e prestadores de suporte. A MSSERVER aparece como parceira de
infraestrutura para quando esses profissionais encontram uma demanda de Cloud num cliente.

O sistema visual não mudou. Mudaram a narrativa, a ordem das seções, a linguagem e a
jornada de conversão.

## Auditoria da versão anterior

| # | Seção anterior | Para quem falava | Decisão |
| --- | --- | --- | --- |
| — | Hero "Cloud sob medida, sem altos investimentos iniciais" | Empresa cliente | Reescrito para o profissional; CTA principal vira conversa sobre parceria |
| — | Logos de clientes | Todos | Mantido (credibilidade) |
| 01 | Benefícios (6 cartões) | Leigo em Cloud | Removido como seção. Quatro argumentos viraram "Para a conversa com o cliente", dentro de Projetos |
| 02 | Soluções (3 modelos) | Empresa cliente | Virou **Projetos**: "o que dá para propor", com "Quando indicar" em cada modelo |
| 03 | Simulador | Empresa cliente | Mantido e reenquadrado como **briefing de projeto** do cliente |
| 04 | Aplicações (5 usos) | Empresa cliente | Virou **Situações**: seis cenários do dia a dia de quem atende empresas |
| 05 | Diferenciais (bento) | Empresa cliente | Mantido, com texto voltado a "o que sustenta o projeto" |
| 06 | Contratação (4 passos) | Empresa cliente | Virou **Como funciona** (5 passos, com quem conduz cada um) |
| 07 | Quem atende | Todos | Mantido como "Do outro lado" |
| 08 | FAQ | Empresa cliente | Reescrito com as dúvidas do parceiro |
| — | CTA final | Empresa cliente | "Tem um projeto em mente? Vamos conversar." |

O que já funcionava bem e foi preservado sem mudança de comportamento: header com menu
móvel, entradas `data-reveal`, botão flutuante de WhatsApp, simulador (etapas, barra de
progresso, resumo lateral, folha no celular, persistência, validações, "Outro" e "Não
sei", dicas, eventos), CTA final que herda a mensagem do simulador, SEO sem canonical por
padrão, testes unitários, E2E e de acessibilidade.

Não havia problemas técnicos abertos: build, `astro check`, 17 testes unitários e os E2E
passavam antes da mudança.

## Nova arquitetura

| # | Seção | `id` | Papel na jornada |
| --- | --- | --- | --- |
| — | Hero | `inicio` | "Você cuida do cliente. A gente entra com a nuvem." CTA: conversar sobre parceria (WhatsApp) e organizar um projeto (simulador) |
| — | Logos | — | Prova social |
| 01 | Situações | `situacoes` | Identificação: seis demandas reconhecíveis, cada uma abre o simulador com o contexto marcado |
| 02 | A parceria | `parceria` | Quem faz o quê (você × MSSERVER) e transparência sobre condições comerciais |
| 03 | Simulador | `simulador` | Organiza a demanda num briefing preliminar e envia pelo WhatsApp ou copia |
| 04 | Projetos | `projetos` | Os três modelos como propostas possíveis + argumentos para o cliente |
| 05 | Diferenciais | `diferenciais` | A retaguarda técnica que sustenta o projeto |
| 06 | Como funciona | `como-funciona` | Da demanda ao ambiente rodando, com "Você", "Você + MSSERVER" ou "MSSERVER" em cada passo |
| 07 | Do outro lado | `equipe` | Equipe e números |
| 08 | Dúvidas | `duvidas` | Parceria, simulador, modelos, migração, segurança, backup, disponibilidade |
| — | CTA final | — | Conversa sobre parceria; leva o briefing quando existe |

A estrutura não repete a landing de servidores físicos (oferta → diferenciais → catálogo →
processo) nem a landing completa (aplicações → modalidades → simulador → catálogo).

## Jornada de conversão

1. **Conversa direta:** hero, seção da parceria, header, menu, FAQ, CTA final e botão
   flutuante abrem o WhatsApp com uma mensagem que identifica a origem (página de Cloud
   da MSSERVER para profissionais de TI) e o interesse em parceria.
2. **Projeto concreto:** as situações, os cartões de projeto e os CTAs "Organizar um
   projeto" levam ao simulador, já com o contexto marcado quando vêm de um atalho.
3. **Envio:** na última etapa o profissional informa, opcionalmente, como atua com o
   cliente e escreve observações. O botão "Enviar briefing pelo WhatsApp" monta a
   mensagem com a origem, o interesse em parceria, a demanda, a configuração, a atuação e
   as observações. "Copiar briefing" gera o mesmo conteúdo, sem saudação, para usar na
   conversa com o cliente.
4. O CTA final e o resumo lateral passam a levar o briefing assim que há escolhas feitas.

## Simulador: o que mudou

| Item | Antes | Agora |
| --- | --- | --- |
| Enquadramento | "Monte uma configuração preliminar da sua Cloud" | "Organize a demanda do cliente em um briefing" |
| Etapa 1 | "O que a sua empresa quer levar para a nuvem?" | "O que o cliente precisa levar para a nuvem?" (cargas de trabalho) |
| Momento do projeto | Migrar, novo, ampliar | + **Trocar de provedor** (`switch`) |
| Etapa final | Revisão e envio | + **Como você atua com este cliente?** (opcional) e **Observações para a equipe** (opcional, até 400 caracteres) |
| Resumo lateral | "Sua configuração", "Valor" | "Briefing do projeto", "Proposta: sob avaliação", linha "Atuação" |
| Mensagem | Pedido de orçamento da empresa | Profissional de TI, origem da página, interesse em parceria, "Briefing preliminar" |
| Atalhos | `workload:x` ou `model:x` | Vários itens por atalho: `workload:files service:backup`, `scenario:switch`, etc., com aviso do que foi marcado |
| Persistência | `msserver-cloud-simulador-v1` | `msserver-cloud-simulador-v2` |

As opções técnicas (2 a 22 cores, 8 a 64 GB, 300 GB a 2 TB, 1 a 6 IPs) continuam iguais
às do configurador oficial. Não há preço, cálculo de valor nem regra comercial nova.

## Classificação das informações

### Confirmadas (publicadas em msserver.com.br, consultadas em 28/10 e revisadas em 30/10/2026)

- Configurador de Cloud: processador 2–22 cores (4–44 threads), memória 8–64 GB e
  "outro", armazenamento 300 GB–2 TB e "outro", IP 1–6 (`/solucoes-cloud-msserver/`).
- Cloud sob demanda, sem altos investimentos iniciais (`/solucoes-cloud-msserver/`).
- Soluções: servidores dedicados, nuvem privada e SaaS (este último sem detalhe, por isso
  fora da página).
- Máquinas espelhadas e "99,9% de uptime" (`/solucoes-cloud-msserver/`).
- Programa de migração com instruções de uso para toda a equipe
  (`/solucoes-cloud-msserver/`). A página **não** descreve execução de migração, por isso
  a landing deixou de usar "migração assistida".
- Nuvem privada sob medida: latência de storage, topologia de rede, criticidade,
  processadores virtuais, memória, periféricos (USB, PCI-e), segurança, virtualização
  (`/nuvem-privada/`).
- Segurança a nível de rede (ponto a ponto, VPN, firewall), conectividade (Akamai,
  Cloudflare, Microsoft, Google, AWS, UPX, IX.br, múltiplas operadoras), empresa nacional,
  backup diário como serviço adicional (`/nuvem-privada/`).
- Multicloud e nuvem híbrida como serviço de consultoria
  (`/consultoria-em-implantacao-de-servidores/`).
- Contato: WhatsApp 5511985991837, (11) 4858-5358, comercial@msserver.com.br.

### Antigas ou conflitantes

- **Horário de suporte:** `/nuvem-privada/` diz "24/7, por telefone e portal"; o rodapé
  de todas as páginas diz "8 am as 18 pm". A landing mantém a leitura já adotada antes
  (técnico 24/7, comercial das 8h às 18h), mas **precisa de validação**.
- **Dois configuradores:** `/nuvem-privada/` não tem a opção de 2 cores; a landing segue
  `/solucoes-cloud-msserver/`.
- **Catálogo de hardware** em `/nuvem-privada/` (SSD, NVMe, HDD, processadores físicos)
  não corresponde às opções do configurador. Não foi usado.
- Rodapé do site com "© 2023".

### Precisam de validação antes de publicar

- Existência e formato de um programa de parceria (não há página: `/parceiros/`,
  `/seja-parceiro/`, `/seja-um-parceiro/`, `/revenda/` e `/programa-de-parceiros/`
  retornam 404).
- Condições comerciais (comissão, desconto, faturamento, quem contrata, exclusividade).
- Suporte 24/7 (ver acima) e o 99,9% como SLA contratual.
- "+15 anos no mercado" (citado em `/cases-de-sucesso/`, não em `/sobre/`).
- Sistemas operacionais, hipervisores e tecnologia de disco oferecidos (não constam no
  site; por isso não viraram opção do simulador).

### Hipóteses de posicionamento (decisão editorial, não fato)

- "Você cuida do cliente. A gente entra com a nuvem." e "Você segue com o cliente; a
  MSSERVER entra com a estrutura": direção definida no briefing da reformulação.
- A divisão de papéis da seção "A parceria" e os passos de "Como funciona" descrevem um
  caminho possível e dizem expressamente que o formato é combinado com a equipe
  comercial.
- As seis situações são cenários comuns de quem atende empresas, não casos de clientes.

## O que a página não promete

Comissão, percentual, remuneração, exclusividade, território, desconto, preço, SLA
contratual, sistemas operacionais ou hipervisores específicos. A seção "A parceria" e a
primeira pergunta do FAQ dizem isso de forma explícita. Um teste unitário garante que o
único percentual no conteúdo é o 99,9% de uptime.
