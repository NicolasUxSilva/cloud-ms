# Reformulação: Cloud para quem cuida da infraestrutura de TI

Revisão de 30/10/2026. Esta versão **substitui** a anterior, voltada a técnicos que levavam
projetos de clientes à MSSERVER (merge `7993b83`, publicada em `cloud-ms-beige.vercel.app`).

O público agora é o responsável pela infraestrutura de TI da própria empresa:
coordenador ou gerente de TI, analista de infraestrutura, administrador de sistemas,
técnico responsável pela operação, profissional de redes ou TI contratada que administra
o ambiente. A página não é para revendedores, afiliados, representantes nem integradores
em busca de comissão.

Mensagem central: **"Você cuida da TI. A gente entra com a infraestrutura Cloud."**

O sistema visual não mudou. Mudaram a perspectiva, a copy, a ordem das seções e a
jornada de conversão.

## Auditoria da versão anterior

- O preview publicado era idêntico à `main` (`7993b83`).
- Cerca de 80 referências ao modelo de parceria ou revenda em 16 arquivos: hero, header,
  situações, seção "A parceria", projetos, processo, FAQ, CTA final, rodapé, SEO, imagem
  de compartilhamento e todos os textos e mensagens do simulador.
- Funcionalidades corretas e preservadas: simulador de 7 etapas, resumo lateral e folha
  no celular, persistência, validações, "Outro"/"Não sei", dicas, atalhos com contexto,
  copiar resumo, envio pelo WhatsApp, CTA final que herda a mensagem, eventos de
  analytics, SEO sem canonical por padrão, testes unitários, E2E e de acessibilidade.

## Referências ao modelo de revenda/parceria removidas

| Antes | Agora |
| --- | --- |
| "Você cuida do cliente. A gente entra com a nuvem." | "Você cuida da TI. A gente entra com a infraestrutura Cloud." |
| "Apareceu uma demanda de Cloud num cliente que você atende?" | "Servidor no limite, sistema que precisa ser acessado de qualquer lugar, operação que cresceu mais que o ambiente?" |
| Kicker "Para profissionais de TI que atendem empresas" | "Para quem cuida da TI da empresa" |
| "Você segue com o cliente; a MSSERVER entra com a estrutura" | "Avaliação técnica antes de qualquer proposta" |
| "Se você atende empresas, já viu alguma dessas" | "Quando a infraestrutura começa a limitar a operação" |
| Seção "A parceria": "Cada um entra com o que faz melhor" | Seção "Apoio": "Você não precisa cuidar de toda a infraestrutura sozinho" |
| "E as condições comerciais?" (comissão, percentuais, exclusividade) | "Avaliação técnica antes de qualquer proposta" (sem tabela pública, sem cotação automática) |
| "O que dá para propor ao cliente" / "Quando indicar" | "Qual estrutura atende melhor à sua operação?" / "Quando faz sentido" |
| "Para a conversa com o cliente" | "Para levar à gestão da empresa" |
| "Da demanda ao ambiente rodando" (quem conduz: Você, Você + MSSERVER) | "Da avaliação técnica à infraestrutura em operação" (Sua TI, Sua TI + MSSERVER) |
| FAQ "Como funciona a parceria? Existe comissão?" e "Posso usar o briefing com o meu cliente?" | FAQ de quem avalia Cloud para o próprio ambiente (migração, dimensionamento, modelos, recursos, suporte, backup, avaliação) |
| CTA "Conversar sobre parceria" / "Organizar um projeto" | "Conversar com um especialista" / "Avaliar minha infraestrutura" |
| "Tem um projeto em mente? Vamos conversar." | "Vamos conversar sobre a infraestrutura da sua empresa?" |
| Mensagem "Sou profissional de TI... quero conversar sobre desenvolver projetos de Cloud em parceria" | "Vim pela página de Cloud da MSSERVER e quero conversar com um especialista sobre a infraestrutura de TI da minha empresa" |
| Título SEO "Cloud em Parceria para Profissionais de TI" | "Infraestrutura Cloud para a TI da sua Empresa" |

A palavra "parceria" não aparece mais na página. Testes unitários e E2E impedem que
"parceria", "comissão", "revenda", "afiliado" ou "cliente que você atende" voltem ao
conteúdo e às mensagens.

## Nova arquitetura

| # | Seção | `id` | Papel na jornada |
| --- | --- | --- | --- |
| — | Hero | `inicio` | Mensagem central, suporte especializado; CTAs "Conversar com um especialista" (WhatsApp) e "Avaliar minha infraestrutura" (simulador) |
| — | Logos | — | Prova social |
| 01 | Desafios | `desafios` | Seis situações do dia a dia da TI; cada uma abre o simulador com o contexto marcado |
| 02 | Apoio | `apoio` | O que fica com a sua TI e o que a MSSERVER assume; avaliação técnica antes de proposta |
| 03 | Soluções | `solucoes` | Nuvem privada, servidor dedicado em data center e híbrida/multicloud, com "Quando faz sentido" e argumentos para a gestão |
| 04 | Simulador | `simulador` | "Vamos entender o que a sua infraestrutura precisa" |
| 05 | Diferenciais | `diferenciais` | Disponibilidade, migração, monitoramento, suporte, segurança, conectividade, backup |
| 06 | Implantação | `implantacao` | Levantamento → avaliação técnica → arquitetura e proposta → migração e implantação → operação e suporte |
| 07 | Quem atende | `equipe` | Equipe, +15 anos, +10.250 projetos e depoimentos (mantida como pedido) |
| 08 | Dúvidas | `duvidas` | Migração, dimensionamento, diferença entre modelos, recursos, segurança, backup, suporte, disponibilidade, preço, como pedir avaliação |
| — | CTA final | — | "Vamos conversar sobre a infraestrutura da sua empresa?" |

Os desafios cobrem: servidor local no limite, ERP com acesso remoto, banco de dados lento,
crescimento da operação, arquivos e backup, troca de provedor. A estrutura não repete a
landing de servidores físicos.

O servidor dedicado aparece como infraestrutura **hospedada em data center**, sem compra
ou instalação de equipamento pela empresa.

## Simulador

| Item | Versão de parceiros | Agora |
| --- | --- | --- |
| Título da seção | "Organize a demanda do cliente em um briefing" | "Vamos entender o que a sua infraestrutura precisa" |
| Etapa 1 | "O que o cliente precisa levar para a nuvem?" (Demanda) | "O que a sua infraestrutura precisa atender?" (Necessidade) |
| Etapa 2 | "Qual modelo de Cloud atende esse cliente?" | "Qual modelo de Cloud atende melhor à operação?" |
| Momento | Migrar um servidor local, trocar de provedor, novo projeto, ampliar | Migrar o servidor local, trocar de provedor, novo ambiente, ampliar o ambiente |
| Etapa final | "Revise o briefing" + "Como você atua com este cliente?" (suporte ao cliente, consultor/integrador, TI interna) | "Revise o levantamento" + "Como você atua na TI da empresa?" (equipe interna, TI contratada, coordenação/gestão) |
| Observações | Pedia para não incluir dados do cliente | "Como o ambiente está hoje, usuários, prazo e o que ainda precisa ser avaliado" |
| Resumo | "Briefing do projeto", "Copiar briefing" | "Resumo do ambiente", "Copiar resumo" |
| Mensagem | Profissional de TI, demanda de um cliente, parceria | Origem (página de Cloud), requisitos da infraestrutura da minha empresa, pedido de avaliação técnica |
| Persistência | `msserver-cloud-simulador-v2` | `msserver-cloud-simulador-v3` |

As opções técnicas continuam as do configurador oficial (2 a 22 cores, 8 a 64 GB,
300 GB a 2 TB, 1 a 6 IPs, itens de rede, backup, migração e monitoramento). Não há preço,
cotação nem regra comercial.

## Classificação das informações

### Confirmadas (msserver.com.br, consultadas em 28/10 e revisadas em 30/10/2026)

- Configurador de Cloud, Cloud sob demanda sem altos investimentos iniciais, máquinas
  espelhadas com "99,9% de uptime", programa de migração com instruções de uso
  (`/solucoes-cloud-msserver/`).
- Nuvem privada sob medida, segurança a nível de rede, conectividade, empresa nacional,
  backup diário como serviço adicional (`/nuvem-privada/`).
- Console/KVM, I/O, VLAN, VPN e firewall dedicado como adicionais, data center no Brasil
  (`/servidores-dedicados/`).
- Backup em nuvem com criptografia e redundância (`/backup-em-nuvem/`).
- Multicloud e nuvem híbrida como serviço de consultoria
  (`/consultoria-em-implantacao-de-servidores/`).
- Depoimentos de Perfilados Nardi e RD Concretos (`/sobre/`).

### Precisam de validação

- **Suporte 24/7:** `/nuvem-privada/` diz "24/7, por telefone e portal"; o rodapé do site
  diz "8 am as 18 pm". A página mantém técnico 24/7 e comercial das 8h às 18h.
- **99,9%** como SLA contratual (o site não traz termos).
- **+15 anos** (`/cases-de-sucesso/`) e **+10.250 projetos** (informado pela MSSERVER em
  28/10/2026; o site publica "+250").
- **"Programa de migração":** o site descreve instruções de uso para a equipe, não a
  execução da migração. A página não promete migração feita pela MSSERVER; o plano é
  "definido na avaliação técnica".
- Sistemas operacionais, hipervisores e tecnologia de disco oferecidos (não constam no
  site; não viraram opção do simulador).
- `PUBLIC_CANONICAL_URL` ainda não definida: a página sai com `noindex`.

## O que a página não promete

Preço, cotação automática, SLA contratual, prazos de migração, sistemas operacionais ou
hipervisores específicos, condições de parceria, comissão ou revenda. Um teste garante que
o único percentual no conteúdo é o 99,9% de uptime informado.
