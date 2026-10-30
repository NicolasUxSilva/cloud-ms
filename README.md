# Landing de Cloud da MSSERVER para quem cuida da TI

Landing page de Cloud da MSSERVER voltada ao responsável pela infraestrutura de TI de uma
empresa (equipe interna ou contratada): coordenadores, analistas de infraestrutura,
administradores de sistemas e profissionais de redes. A página tem um simulador em que a
pessoa organiza os requisitos do próprio ambiente num levantamento preliminar, enviado à
equipe pelo WhatsApp ou copiado.

A reformulação para esse público (auditoria, referências de parceria removidas, nova
arquitetura, classificação das informações e o que a página não promete) está em
[docs/REFORMULACAO-RESPONSAVEL-TI.md](docs/REFORMULACAO-RESPONSAVEL-TI.md).

- Astro 7, TypeScript, CSS próprio (sem framework de UI) e build estático.
- Mesma identidade visual da landing completa de servidores dedicados: tokens,
  tipografia (Sora, Inter, JetBrains Mono), componentes, animações e
  comportamento responsivo.
- Conteúdo exclusivo de Cloud, tirado das páginas oficiais da MSSERVER (fontes em
  `src/data/content.ts` e em [docs/ORIGEM.md](docs/ORIGEM.md)).

## Requisitos

- Node.js 22.23 ou superior.
- npm.

## Instalar e rodar

```bash
npm ci
```

```bash
npm run dev
```

O site abre em http://localhost:4321.

## Testes

```bash
npm test
```

Testes unitários (Vitest) das opções, regras, validações e mensagens do simulador.

```bash
npx playwright install chromium
```

```bash
npm run test:e2e
```

Testes de navegador (Playwright, desktop 1440 px e celular 390 px), rodados contra o
build de produção. Cobrem o fluxo completo do simulador, as validações, os campos
"Outro", a navegação, a persistência, os links de WhatsApp, a acessibilidade (axe), o
SEO e a rolagem horizontal. Os links de WhatsApp são interceptados: nenhuma mensagem
é enviada.

Para revisão visual em 360, 390, 768, 1024, 1440 e 1920 px, com o `npm run dev`
rodando na porta 4500:

```bash
node scripts/qa-screenshots.mjs http://localhost:4500/
```

## Build

```bash
npm run build
```

Roda o `astro check` e gera `dist/`.

## Deploy (Vercel)

1. Na Vercel, importe o repositório em Add New → Project. O framework (Astro), o
   comando `npm run build` e a pasta `dist` são detectados.
2. Variáveis de ambiente (veja `.env.example`):
   - `PUBLIC_CANONICAL_URL`: URL publicada desta landing.
     - Sem ela, a página sai **sem canonical e com `noindex`**, para não concorrer
       com `/solucoes-cloud-msserver/` nem com as outras landings.
   - `PUBLIC_GTM_ID=GTM-KTDRRP3`: carrega o Google Tag Manager do site. Deixe vazio
     se a página for servida dentro do WordPress, que já carrega o GTM.
   - `PUBLIC_NOINDEX=true`: força `noindex` em homologação.
3. A branch `main` vira produção. As outras branches geram previews.

## Simulador

| Etapa | Campos | Origem |
| --- | --- | --- |
| Necessidade | Sistemas e cargas de trabalho (ERP, banco de dados, aplicações, arquivos, e-mail, outro, não sei) e momento (migrar o servidor local, trocar de provedor, novo ambiente, ampliar o ambiente) | Páginas de Cloud e servidores dedicados |
| Modelo | Nuvem privada, servidor dedicado em data center, híbrida/multicloud, orientação; criticidade | Soluções Cloud e Nuvem Privada |
| Processador | 2 a 22 cores (4 a 44 threads), ou recomendação | Configurador oficial ("Processador") |
| Memória | 8, 16, 32, 48 ou 64 GB, outro (GB) ou não sei | Configurador oficial ("Memória") |
| Disco | 300 GB a 2 TB, outro (GB/TB) ou não sei; prioridade (opcional) | Configurador oficial ("Armazenamento") |
| Rede | 1 a 6 IPs; itens opcionais: backup diário, VPN, ponto a ponto, firewall, VLAN, migração, monitoramento | Configurador oficial ("IP") e páginas oficiais |
| Resumo | Revisão; papel na TI da empresa e observações (opcionais); envio pelo WhatsApp; copiar resumo | |

- **Não há preço.** A MSSERVER não publica tabela de preços de Cloud. O simulador
  gera uma configuração preliminar e informa que valores e arquitetura dependem da
  análise da equipe. Nenhum preço do simulador de servidores dedicados é reaproveitado.
- **Contato pelo WhatsApp** (número oficial 5511985991837):
  - a mensagem identifica a origem (página de Cloud da MSSERVER) e o pedido de
    avaliação técnica, e traz só as escolhas feitas, sem dados pessoais;
  - as observações livres pedem para não incluir senhas nem dados pessoais;
  - o simulador não tem formulário porque não há endpoint de Cloud disponível fora do
    WordPress.
- **Persistência:**
  - a configuração fica em `sessionStorage` (`msserver-cloud-simulador-v3`) e só nele;
  - o CTA final usa a configuração salva para preparar a mensagem.
- **Código:** `src/cloud-simulator/` (tipos, opções, regras, resumo e interface) e
  `src/data/cloud.ts` (opções oficiais). Esse código é independente do simulador de
  servidores dedicados.

## Rastreamento

Eventos enviados ao `dataLayer`:
- `cta_click` (`location`: `header`, `menu`, `hero`, `hero-console`, `desafio-*`,
  `solucao-*`, `cta-final`);
- `simulation_start` (`entry`);
- `simulation_step_complete` (`step_id`, `step_number`);
- `simulation_complete` (`cloud_model`);
- `simulation_summary_copy` (`ok`);
- `contact_whatsapp_click` (`location`: `header`, `menu`, `hero`, `apoio`, `faq`,
  `cta-final`, `cta-final-simulacao`, `flutuante`, `simulador-resumo`, `simulador-envio`).

`contact_whatsapp_click` registra o **clique**, não uma conversa iniciada nem uma
venda. Sem `PUBLIC_GTM_ID`, nenhum script de terceiros é carregado.
