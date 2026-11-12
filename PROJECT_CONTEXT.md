# PROJECT_CONTEXT — Portfólio Lucas Cecareli Ribeiro

> Documento de referência técnica para quem continua o desenvolvimento.
> Última atualização: 12/11/2026 — estado pós-V3 (integração fotográfica), antes da V3.1.

---

## 1. Visão geral

Portfólio pessoal de **Lucas Cecareli Ribeiro**, estudante de Ciência da Computação no **Instituto Mauá de Tecnologia (IMT)**, 2025–2029 (previsão).

- SPA em **React 19 + TypeScript**, build com **Vite 8**, estilos com **Tailwind CSS v4** (via `@tailwindcss/vite`) e tokens CSS próprios.
- Animações: **GSAP 3 + ScrollTrigger**, rolagem suave com **Lenis**, transições de página com **framer-motion**.
- Bilíngue **PT-BR / EN** e tema **Dark / Light** com transição radial.
- Lint: `oxlint` (`npm run lint`). Build: `tsc -b && vite build` (`npm run build`).
- Node/npm locais em `D:\LCR@Maua` (prefixar o `PATH` no PowerShell antes de rodar npm).

### Regras de conteúdo (obrigatórias)

- Não inventar certificações, experiências, métricas, links ou resultados.
- Projetos reais: **ELO** (Hackathon de Saúde e Tecnologia, **Nov 2026**), **Sistema de Agendamento de Laboratórios**, **Jogo Educacional — Show do Milhão**, **Velore** (sempre marcado como *Em Desenvolvimento*).
- E-mail e LinkedIn ainda **não confirmados**: ficam vazios em `portfolioData.ts` e aparecem como "Em atualização". Não exibir placeholders falsos.
- Certificações: lista vazia até o usuário fornecer certificações reais.

---

## 2. Estrutura do repositório

```
index.html                 Bootstrap anti-FOUC (tema + idioma) antes do React; fontes Google (Syne, Inter, JetBrains Mono)
src/main.tsx               Entrada
src/App.tsx                Providers + roteamento manual + AnimatePresence
src/index.css              Design tokens, tipografia fluida, utilitários, transição de tema
src/router/index.tsx       Router próprio (History API) + navegação por âncora
src/context/ThemeContext.tsx     Tema Dark/Light + View Transitions radial
src/context/LanguageContext.tsx  Idioma PT/EN + animação de troca de textos
src/data/portfolioData.ts  Dados pessoais, projetos, formação, caminhos de fotos
src/locales/pt-BR.json     Textos PT (fonte do tipo `Translations`)
src/locales/en.json        Textos EN (mesma estrutura do PT)
src/pages/                 Home, About (/sobre), Projects, Certifications, Resume (/curriculo), Contact, ProjectCaseStudy (/projetos/:id)
src/components/            Seções editoriais e utilitários (ver §4)
public/images/profile/     Fotos pessoais (dark/light) em PNG + WebP
references/                Vídeo de referência (não versionado, não ler via ferramenta)
```

### Componentes em uso

| Componente | Papel |
| --- | --- |
| `EditorialHero` | Hero + **Intro cinematográfica de 3,55 s** + cartão de identidade / terminal |
| `StorytellingBridge` | Transição "FUNDAMENTO → PRÁTICA → EVOLUÇÃO" (`#bridge`) |
| `EditorialProjects` + `ProjectVisualPreview` | Vitrine editorial dos 4 projetos (`#projects`) |
| `EditorialAbout` | Sobre Mim com revelação fotográfica por scroll (`#about`) |
| `EditorialSkillsAndCerts` | Competências + certificações (vazio) (`#skills`) |
| `EditorialContact` | Contato (`#contact`) |
| `Navbar`, `Footer` | Navegação fixa em pílula e rodapé |
| `SmoothScroll` | Instância Lenis sincronizada com o ticker do GSAP |
| `CustomCursor` | Indicador contextual (só desktop/pointer fine; cursor nativo preservado) |
| `MagneticButton`, `TerminalWidget`, `Icons` | Utilitários |

### Código legado não utilizado (candidato a remoção futura, sem urgência)

`AboutSection.tsx`, `Hero.tsx`, `ProjectsSection.tsx`, `ContactSection.tsx`, `CertificationsSection.tsx`, `TechStackSection.tsx`, `AnimatedCard.tsx`, `src/assets/hero.png`. Nenhum é importado. A dependência `@gsap/react` está instalada mas `useGSAP` não é usado.

---

## 3. Design system

### Tokens (`src/index.css`)

| Token | Dark | Light |
| --- | --- | --- |
| `--bg-primary` | `#090909` | `#f8f8f6` |
| `--bg-surface` | `#141414` | `#ffffff` |
| `--bg-elevated` | `#1c1c1c` | `#efefed` |
| `--text-primary` | `#f5f5f5` | `#141414` |
| `--text-secondary` | `#a8a8b3` | `#585858` |
| `--text-muted` | `#82828c` | `#737370` |
| `--border-subtle` / `--border-strong` | `#292929` / `#3f3f46` | `#ddddda` / `#b8b8b2` |
| `--accent-bg` / `--accent-text` | `#f5f5f5` / `#090909` | `#141414` / `#f8f8f6` |

Easings: `--ease-cinematic: cubic-bezier(0.76, 0, 0.24, 1)`, `--ease-out-expo`, `--ease-smooth`.

### Tipografia

- Display: **Syne** 600–800 (`.font-display`, `.text-hero-display`, `.text-section-title`, `.text-monumental`, `.text-bridge-flow`).
- Texto: **Inter**. Técnico/metadados: **JetBrains Mono** (`.font-mono-tech`).
- Tamanhos fluidos com `clamp()`.

### Layout

- `.editorial-container` (máx. 1360 px, padding fluido) e `.editorial-grid` (12 colunas).
- Estética monocromática, linhas finas (`1px`), metadados em mono maiúsculo, grade arquitetônica sutil (`.bg-architectural-grid`).

---

## 4. Funcionalidades e decisões técnicas

### 4.1 Intro cinematográfica (V2.1) — **não modificar sem pedido explícito**

Arquivo: `src/components/EditorialHero.tsx`.

- Chave de sessão: `sessionStorage['lcr-intro-seen-v2_1'] === '1'`. Roda só na primeira visita da sessão e só quando `EditorialHero` monta (rota `/`).
- Pulada com `prefers-reduced-motion: reduce`, botão **"Pular Intro [ESC]"** ou tecla `Escape` (`timeline.progress(1)`).
- Coreografia de 3,55 s em 4 atos: preparação (0–0,5 s) → revelação mascarada das 3 linhas (0,5–1,7 s) → pausa de leitura (1,7–2,2 s) → transformação contínua do `<h1>` para a posição final da Hero + entrada dos elementos (2,2–3,55 s).
- Decisões que eliminaram travamentos (V2.1):
  - Relógio isolado em `LiveSaoPauloClock` (`React.memo`) para não re-renderizar a Hero durante a timeline.
  - Cores das linhas interpoladas pelo GSAP (sem estado React durante a animação).
  - `scrollbar-gutter: stable` + bloqueio de scroll por listeners `{ passive: false }` (sem alternar `overflow` do `body`).
  - `useLayoutEffect` + espera de `document.fonts.ready` (máx. 250 ms) + `requestAnimationFrame` antes de medir com `getBoundingClientRect()`.
  - `gsap.ticker.lagSmoothing(500, 33)` em `SmoothScroll`.
- O backdrop da intro é `fixed z-[60]` (acima da Navbar `z-50`).

### 4.2 Navegação e roteamento

- Router próprio em `src/router/index.tsx` (`pushState` + `popstate`). Rotas: `/`, `/sobre`, `/projetos`, `/projetos/:id`, `/certificacoes`, `/curriculo`, `/contato`.
- `navigate('/', { sectionId })`: se já em `/`, chama `scrollToSection`; senão faz `pushState('/')` e agenda `scrollToSection` após **90 ms**.
- `scrollToSection`: `getBoundingClientRect().top + scrollY - 88` (offset da navbar) e `window.scrollTo({ behavior: 'smooth' })`.
- Navbar: itens `Início · Sobre Mim · Projetos · Competências · Contato · Currículo`. A seção ativa é detectada no `scroll` pela posição real (`getBoundingClientRect`) dos ids `home, projects, about, skills, contact`.
- Páginas internas usam `motion.div` com `exit` de 350–450 ms dentro de `AnimatePresence mode="wait"`.

### 4.3 Ordem atual das seções na Home (`src/pages/Home.tsx`)

| DOM | Seção | Eyebrow exibido |
| --- | --- | --- |
| 1 | `#home` Hero | `00 / 05` |
| 2 | `#bridge` StorytellingBridge | `01 / TRAJETÓRIA & ABORDAGEM` |
| 3 | `#projects` | `02 / PROJETOS REAIS & ESTUDOS DE CASO` |
| 4 | `#about` | `01 / SOBRE MIM` (stageEyebrow) |
| 5 | `#skills` | `04 / COMPETÊNCIAS & FERRAMENTAS` |
| 6 | `#contact` | `05 / CONTATO & CONEXÃO` |

### 4.4 Scroll suave e animações por scroll

- `SmoothScroll`: Lenis (`duration 1.12`, `wheelMultiplier 0.95`) dirigido por `gsap.ticker` com `gsap.ticker.lagSmoothing(500, 33)` (configuração estável da V2.1 que absorve picos iniciais da main thread sem saltar frames); `lenis.on('scroll', ScrollTrigger.update)`. Desativado com `prefers-reduced-motion`. A instância **não é exposta** ao resto do app; a CSS recomendada do Lenis não é importada.
- ScrollTriggers: Bridge, Projects (refeitos ao trocar filtro), About (pin + reveals), SkillsAndCerts.
- `EditorialAbout` (V3):
  - `gsap.matchMedia()`: **desktop ≥1024 px** = timeline única com `pin: true`, `end: '+=85%'`, `scrub: 0.18`; **<1024 px** = sem pin, máscara com `scrub` e textos com `toggleActions`.
  - Máscara: `clip-path: inset(0% 35% → 0% round 1rem)` + escala interna `1.06 → 1`.
  - Fotos dark/light empilhadas; troca por CSS (`.theme-portrait-dark/light` + `[data-theme]`), sem re-render React. `onLoad → ScrollTrigger.refresh()`.
  - Ciclo de vida: `gsap.context()` + `mm.revert()` no cleanup; efeito com dependências vazias (troca de tema/idioma não recria a timeline).

### 4.5 Tema (Dark/Light)

- `ThemeContext`: persistência em `localStorage['portfolio-theme']`; bootstrap síncrono no `index.html`.
- Com View Transitions API: troca dentro de `startViewTransition` + `clip-path: circle()` em `::view-transition-new(root)` por **1020 ms**. Sem a API: classe `html.theme-transitioning` interpola cores por 950 ms.
- Trava anti-concorrência (`lockRef`).

### 4.6 Idioma (PT/EN)

- `LanguageContext`: persistência em `localStorage['portfolio-locale']`; `t` tipado a partir de `pt-BR.json` (o `en.json` precisa ter a mesma estrutura).
- Animação: todos os `[data-i18n]` saem (opacity/y), troca o dicionário, entram de novo; `scrollY` é preservado; ao final `ScrollTrigger.refresh()` + restauração do scroll.
- Convenção: **`data-i18n` vai em elementos internos**; elementos animados por ScrollTrigger usam wrappers sem `data-i18n` (evita conflito de `clearProps`).

### 4.7 Fotografias

| Arquivo | Uso | Tamanho |
| --- | --- | --- |
| `public/images/profile/lucas-dark.webp` | Dark Mode (WebP q92) | ~103 KB |
| `public/images/profile/lucas-light.webp` | Light Mode (WebP q92) | ~82 KB |
| `lucas-dark.webp.png` / `lucas-light.webp.png` | Originais PNG (fallback) | ~1,9 MB cada |

Dimensões: dark 1089×1444, light 1086×1448 (≈3:4). Os PNGs têm extensão dupla `.webp.png` (são PNG de fato).

---

## 5. Checkpoints Git

| Branch | Commit | Estado |
| --- | --- | --- |
| `checkpoint/pre-premium-redesign` | `eb84822` | Arquitetura multipágina inicial |
| `checkpoint/v1-before-v2-refinement` | `476b9e8` | V1 — redesign monocromático, tema, i18n, GSAP, Lenis |
| `checkpoint/v2-before-v2.1-intro-refinement` | `b73c343` | V2 — identidade pessoal, 4 projetos reais |
| `checkpoint/v2.1-before-v3-about-refinement` | `516a37e` | V2.1 — intro de 3,55 s |
| `checkpoint/v3-before-v3.1-refinement` | `baa1069` | V3 — Sobre Mim cinematográfico + fotografias Dark/Light |

---

## 6. Riscos de regressão conhecidos

1. **V3 sem checkpoint** — qualquer `git checkout`/reset perde a V3.
2. **`photoUrl` compartilhado entre Hero e Sobre Mim** — a Hero exibe a foto sempre que `photoUrl` está preenchido.
3. **Navegação entre rotas com âncora** — o atraso de 90 ms é menor que a animação de saída das páginas (350–450 ms).
4. **Mudança de altura acima do pin** (filtro de Projetos, troca de idioma, carregamento de fontes/imagens) desloca o início do pin do About se não houver `ScrollTrigger.refresh()`.
5. **Pin dentro de ancestral transformado** (`motion.div` da rota `/sobre`) — `position: fixed` do pin depende do ancestral ficar sem `transform`.
6. **Palco fixado com `overflow-hidden`** — conteúdo mais alto que a viewport fica cortado durante o pin (telas de 768 px de altura ou menos).
7. **`scrollTo` nativo com Lenis ativo** — rolagens programáticas não passam pela instância Lenis.
8. **Intro** — qualquer re-render, troca de `overflow` ou medição antes das fontes reintroduz travamentos.
9. **Paridade PT/EN** — chave ausente no `en.json` quebra o tipo ou mostra texto vazio.

---

## 7. Diretrizes Arquiteturais da V3.1 (Planejamento Ativo)

1. **Alinhamento entre Navbar e Ordem Visual (`Home.tsx`)**:
   - Ordem visual canônica na `Home.tsx`: `#home` (`EditorialHero`) → `#about` (`EditorialAbout`) → `#bridge` (`StorytellingBridge`) → `#projects` (`EditorialProjects`) → `#skills` (`EditorialSkillsAndCerts`) → `#contact` (`EditorialContact`).
   - Numeração editorial sequencial: `01` (Sobre Mim), `02` (Trajetória & Abordagem), `03` (Projetos Reais & Estudos de Caso), `04` (Competências & Ferramentas), `05` (Contato & Conexão).
   - Posicionar `#about` antes de `#projects` também elimina o risco #4 (troca de filtro em `#projects` não afeta mais a posição do pin de `#about`).
2. **Exclusividade da Fotografia na Seção Sobre Mim (`EditorialHero.tsx`)**:
   - A Hero Section deve exibir exclusivamente o emblema autoral geométrico `[LCR]` no card de identidade à direita, preservando a revelação da fotografia pessoal como surpresa exclusiva da seção `#about`.
3. **Protagonismo Monumental da Fotografia (`EditorialAbout.tsx`)**:
   - **Desktop (`>= 1024px`)**: Composição editorial com **~52–54% da largura** dedicada à fotografia (sem a trava anterior de `max-w-[420px]`) e **altura visual de `75vh–82vh`**, respeitando o topo da `Navbar` fixa e preservando o enquadramento do rosto (`aspect-[3/4]`, `object-fit: cover`, `object-position: center top`).
   - **Mobile (`< 1024px`)**: Fotografia ampla (`w-full aspect-[3/4]`) com rolagem natural sem pinning forçado.
   - **Composição Textual Limpa**: Manter no palco fixado apenas o índice discreto, o título (`"Muito além do código."` / `"Far beyond code."`), os parágrafos de narrativa pessoal e a citação sutil — transferindo os 3 cards de métricas para o início da Parte 2 (abaixo do palco fixado) para eliminar disputa visual com o retrato.
4. **Revelação Contínua por Máscara Horizontal com Geometria Fixa (`EditorialAbout.tsx`)**:
   - O contêiner externo da fotografia mantém suas dimensões finais e posição estática desde o início (`opacity: 1, y: 0`), sem saltos ou deslocamentos verticais.
   - Apenas a máscara horizontal (`clip-path: inset(0% 42% 0% 42% round 1.25rem)` → `inset(0% 0% 0% 0% round 1.25rem)`) se abre continuamente do centro para as bordas conforme o scroll avança, acompanhada de sutil acomodação de escala interna (`1.03 → 1.0`).
