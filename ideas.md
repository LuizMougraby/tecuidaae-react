# TeCuidaAÊ - Ideias de Design React

## Abordagem Escolhida: Design Moderno com Foco em Saúde Pública

### Design Movement
**Healthcare Modern** - Combinação de design limpo, acessível e confiável com toques de modernidade. Inspirado em plataformas de saúde contemporâneas que precisam transmitir segurança, clareza e profissionalismo.

### Core Principles

1. **Clareza Hierárquica**: Informações médicas complexas apresentadas de forma progressiva e compreensível
2. **Confiança Visual**: Cores que remetem à saúde (verde, azul-teal) com suficiente contraste para acessibilidade
3. **Acessibilidade Nativa**: Tipografia legível, espaçamento generoso, suporte a ajuste de tamanho de fonte
4. **Fluxo Intuitivo**: Navegação clara entre seções, com indicadores de progresso em formulários

### Color Philosophy

- **Primária**: `#0D7377` (Teal escuro) - Transmite confiança, profissionalismo e calma
- **Secundária**: `#14FFEC` (Cyan brilhante) - Energia, modernidade, destaque em CTAs
- **Accent**: `#FF6B6B` (Vermelho suave) - Alertas e situações urgentes, mas sem ser alarmante
- **Success**: `#4CAF50` (Verde) - Confirmação, resultado positivo
- **Warning**: `#FF9800` (Laranja) - Atenção moderada
- **Background**: `#F8F9FA` (Cinza muito claro) - Reduz fadiga visual
- **Dark**: `#323232` (Cinza escuro) - Texto principal, alta legibilidade

**Intenção Emocional**: Transmitir profissionalismo médico sem parecer frio; modernidade sem sacrificar clareza.

### Layout Paradigm

- **Hero Section Assimétrica**: Imagem/gradiente à direita, texto à esquerda com CTA destacado
- **Card Grid Responsivo**: Features em grid 2x2 (desktop), 1x4 (mobile) com hover elevation
- **Sidebar + Main Content**: Padrão para mapa (sidebar com lista, mapa principal)
- **Full-Screen Modals**: Para triagem (sem distrações) e detalhes de UBS
- **Sticky Header**: Navegação sempre acessível com logo + menu hamburger mobile

### Signature Elements

1. **Ícones Emoji Grandes**: Usados em cards e seções para comunicação rápida (🏥, 🤖, 📍, ✅)
2. **Gradientes Suaves**: Transições de cor (primária → secundária) em headers e CTAs
3. **Progress Indicators**: Barras de progresso em triagem, badges de status em UBS
4. **Badges/Tags**: Para serviços, horários, status de UBS (aberto/fechado)

### Interaction Philosophy

- **Hover Effects**: Elevação sutil (translateY), mudança de cor em links
- **Loading States**: Indicador de digitação no chatbot, skeleton screens em listas
- **Feedback Imediato**: Toast notifications para ações, validação em tempo real
- **Mobile-First Gestures**: Sidebar deslizável, botões com min-height 48px (acessibilidade)

### Animation Guidelines

- **Transições Suaves**: `all 0.3s ease` como padrão
- **Fade-In na Entrada**: Elementos aparecem suavemente ao carregar
- **Micro-interações**: Botões escalam 1.05x no hover, cards sobem 5px
- **Indicador de Digitação**: Pulsação suave no chatbot
- **Scroll Suave**: `scroll-behavior: smooth` em navegação interna

### Typography System

- **Display/Headings**: `font-weight: 700` para h1/h2, `font-size: clamp(2rem, 5vw, 3rem)` para responsividade
- **Body**: `font-weight: 400-500`, `line-height: 1.6` para legibilidade
- **Buttons**: `font-weight: 600`, `font-size: 1rem`, `min-height: 48px`
- **Font Stack**: `'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif` (sem serifa, moderno)
- **Hierarquia**: H1 (3rem) > H2 (2rem) > H3 (1.25rem) > Body (1rem) > Small (0.9rem)

---

## Decisões Implementadas

✅ **Mantém a identidade visual original** do projeto HTML
✅ **Otimizado para React** com componentes reutilizáveis
✅ **Acessibilidade nativa** com Tailwind + shadcn/ui
✅ **Responsivo mobile-first** com breakpoints claros
✅ **Animações suaves** sem sacrificar performance
