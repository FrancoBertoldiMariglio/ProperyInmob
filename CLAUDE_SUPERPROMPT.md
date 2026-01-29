Prueba la IA directamente en tus aplicaciones favoritas … Usa Gemini para generar borradores y pulir contenido, y disfruta de Gemini Pro con acceso a la IA de nueva generación de Google por 19,99 US$ 9,99 US$ durante 2 meses
# 🏢 PROPERY AGENTS - Super Prompt para Claude Code

## Aplicación para Agentes Inmobiliarios (Dashboard Web + Mobile)

---

## ⚠️ INSTRUCCIONES CRÍTICAS DE CONTEXTO

### Sistema de Gestión de Contexto
Antes de comenzar CUALQUIER tarea, Claude DEBE:

1. **Leer el archivo `TASK_TRACKER_AGENTS.md`** en esta carpeta
2. **Evaluar tokens estimados** para la tarea actual
3. **Si la tarea requiere >50% del contexto disponible**: NO iniciarla, marcarla como `BLOCKED: CONTEXT_LIMIT` y notificar al usuario
4. **Al completar cada subtarea**: Actualizar `TASK_TRACKER_AGENTS.md` con estado y notas

### Notificación de Límite de Contexto
Cuando detectes que una tarea consumirá demasiado contexto:
```
🚨 ALERTA DE CONTEXTO - PROPERY AGENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tarea: [nombre de la tarea]
Estimación: [alto/muy alto consumo de contexto]
Acción: Tarea pausada para continuar en nueva sesión

📋 Para continuar:
1. Abrir nueva conversación
2. Pegar este prompt
3. Claude continuará desde: [ID de subtarea]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 CONTEXTO DEL PROYECTO

### Descripción
Propery Agents es la plataforma para corredores inmobiliarios y agencias. Proporciona herramientas de análisis de mercado, gestión de propiedades, CRM de leads, valuación con ML, y publicación multi-portal.

### Apps a Desarrollar
| App | Framework | Descripción |
|-----|-----------|-------------|
| **Agent Dashboard** | React + Vite | Dashboard web completo para desktop |
| **Agent Mobile** | React Native + Expo | App móvil para gestión on-the-go |

### Usuarios Target
- Corredores inmobiliarios independientes
- Agencias inmobiliarias (múltiples agentes)
- Desarrolladores inmobiliarios
- Tasadores

### Funcionalidades Core
1. **Dashboard de KPIs**: Leads, conversión, performance
2. **Valuador ML**: Reportes de precio sugerido
3. **Comparables**: Propiedades similares vendidas/alquiladas
4. **Tendencias de zona**: Evolución de precios
5. **Gestión de Listings**: Publicación multi-portal
6. **CRM de Leads**: Pipeline de seguimiento
7. **Calendario de visitas**: Agenda integrada
8. **AI Assistant**: Generar descripciones, análisis, reportes

---

## 🛠️ STACK TECNOLÓGICO

### Core
| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.x | UI Library |
| Vite | 6.x | Build tool (Dashboard) |
| React Native | 0.76+ | Mobile App |
| Expo | SDK 52+ | Mobile tooling |
| TypeScript | 5.x | Type safety |
| Turborepo | latest | Monorepo management |

### UI/Styling
| Tecnología | Uso |
|------------|-----|
| Tailwind CSS v4 | Utility-first styling |
| shadcn/ui | Componentes accesibles (web) |
| NativeWind | Tailwind para React Native |
| Radix UI | Primitivos headless |
| Lucide Icons | Iconografía |

### Data Visualization
| Tecnología | Uso |
|------------|-----|
| ApexCharts | Gráficos interactivos avanzados |
| Recharts | Gráficos simples |
| Leaflet | Mapas interactivos |
| react-native-maps | Mapas mobile |

### State & Data
| Tecnología | Uso |
|------------|-----|
| Zustand | Global state |
| TanStack Query | Server state + cache |
| TanStack Table | Tablas avanzadas |
| React Hook Form | Formularios |
| Zod | Validación |

### AI Integration
| Tecnología | Uso |
|------------|-----|
| Vercel AI SDK | Streaming, hooks |
| OpenAI/Anthropic | Providers (agnóstico) |

### Testing
| Tecnología | Uso |
|------------|-----|
| Vitest | Unit tests |
| Testing Library | Component tests |
| Playwright | E2E tests (dashboard) |

---

## 📁 ESTRUCTURA DEL PROYECTO

```
propery-agents/
├── apps/
│   ├── dashboard/                    # React + Vite Dashboard
│   │   ├── src/
│   │   │   ├── app/                  # App entry + routing
│   │   │   │   ├── routes/
│   │   │   │   │   ├── dashboard/    # Home dashboard
│   │   │   │   │   ├── properties/   # Gestión de propiedades
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── new/
│   │   │   │   │   ├── leads/        # CRM de leads
│   │   │   │   │   ├── analytics/    # Analytics de mercado
│   │   │   │   │   ├── valuator/     # Valuador ML
│   │   │   │   │   ├── calendar/     # Calendario de visitas
│   │   │   │   │   ├── reports/      # Reportes generados
│   │   │   │   │   └── settings/     # Configuración
│   │   │   │   └── layout.tsx
│   │   │   ├── components/           # Dashboard components
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Breadcrumb.tsx
│   │   │   │   │   └── CommandPalette.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── KPICard.tsx
│   │   │   │   │   ├── LeadsChart.tsx
│   │   │   │   │   ├── PerformanceWidget.tsx
│   │   │   │   │   └── QuickActions.tsx
│   │   │   │   ├── properties/
│   │   │   │   ├── leads/
│   │   │   │   ├── analytics/
│   │   │   │   └── calendar/
│   │   │   ├── lib/
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   └── mobile/                       # React Native + Expo
│       ├── app/                      # Expo Router
│       │   ├── (tabs)/
│       │   │   ├── index.tsx         # Dashboard resumen
│       │   │   ├── properties.tsx    # Mis propiedades
│       │   │   ├── leads.tsx         # Leads activos
│       │   │   ├── calendar.tsx      # Agenda del día
│       │   │   └── profile.tsx       # Perfil
│       │   ├── property/
│       │   │   ├── [id]/
│       │   │   └── new.tsx
│       │   ├── lead/[id].tsx
│       │   ├── valuator.tsx          # Valuador rápido
│       │   ├── analytics/[zone].tsx
│       │   └── _layout.tsx
│       ├── components/
│       ├── assets/
│       └── app.json
│
├── packages/
│   ├── ui-agents/                    # Shared UI Components (Agents)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── KPICard.tsx
│   │   │   │   │   ├── StatWidget.tsx
│   │   │   │   │   └── PerformanceGauge.tsx
│   │   │   │   ├── properties/
│   │   │   │   │   ├── PropertyForm.tsx
│   │   │   │   │   ├── PropertyTable.tsx
│   │   │   │   │   ├── ImageUploader.tsx
│   │   │   │   │   └── PublishModal.tsx
│   │   │   │   ├── leads/
│   │   │   │   │   ├── LeadCard.tsx
│   │   │   │   │   ├── LeadPipeline.tsx
│   │   │   │   │   ├── LeadForm.tsx
│   │   │   │   │   └── LeadTimeline.tsx
│   │   │   │   ├── valuator/
│   │   │   │   │   ├── ValuationForm.tsx
│   │   │   │   │   ├── ValuationResult.tsx
│   │   │   │   │   ├── ComparablesTable.tsx
│   │   │   │   │   └── ValuationReport.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── TrendChart.tsx
│   │   │   │   │   ├── ZoneHeatmap.tsx
│   │   │   │   │   ├── DemandIndicator.tsx
│   │   │   │   │   └── MarketComparison.tsx
│   │   │   │   ├── calendar/
│   │   │   │   │   ├── VisitCalendar.tsx
│   │   │   │   │   ├── VisitCard.tsx
│   │   │   │   │   └── ScheduleModal.tsx
│   │   │   │   ├── ai/
│   │   │   │   │   ├── AIAssistant.tsx
│   │   │   │   │   ├── DescriptionGenerator.tsx
│   │   │   │   │   └── ReportGenerator.tsx
│   │   │   │   └── primitives/
│   │   │   │       ├── Button.tsx
│   │   │   │       ├── Input.tsx
│   │   │   │       ├── Select.tsx
│   │   │   │       ├── DataTable.tsx
│   │   │   │       ├── Card.tsx
│   │   │   │       └── Modal.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── core-agents/                  # Business Logic (Agents)
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   │   ├── useKPIs.ts
│   │   │   │   ├── useProperties.ts
│   │   │   │   ├── useLeads.ts
│   │   │   │   ├── useValuator.ts
│   │   │   │   ├── useComparables.ts
│   │   │   │   ├── useAnalytics.ts
│   │   │   │   ├── useCalendar.ts
│   │   │   │   └── useAI.ts
│   │   │   ├── stores/
│   │   │   │   ├── propertyFormStore.ts
│   │   │   │   ├── leadPipelineStore.ts
│   │   │   │   ├── calendarStore.ts
│   │   │   │   └── settingsStore.ts
│   │   │   ├── utils/
│   │   │   │   ├── formatters.ts
│   │   │   │   ├── calculations.ts
│   │   │   │   ├── validators.ts
│   │   │   │   └── exporters.ts     # PDF, Excel export
│   │   │   └── constants/
│   │   │       ├── leadStatuses.ts
│   │   │       ├── propertyStatuses.ts
│   │   │       └── portals.ts
│   │   └── package.json
│   │
│   ├── api-client-agents/            # API Types + Mocks (Agents)
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── property.ts       # Property management types
│   │   │   │   ├── lead.ts
│   │   │   │   ├── visit.ts
│   │   │   │   ├── valuation.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   └── agent.ts          # Agent/Agency types
│   │   │   ├── mocks/
│   │   │   │   ├── properties.json   # Agent's properties
│   │   │   │   ├── leads.json        # Leads pipeline
│   │   │   │   ├── visits.json       # Scheduled visits
│   │   │   │   ├── comparables.json  # Comparables database
│   │   │   │   ├── market-data.json  # Historical market data
│   │   │   │   └── portals.json      # Portal configurations
│   │   │   └── client.ts
│   │   └── package.json
│   │
│   ├── ai-agents/                    # AI Integration (Agents)
│   │   ├── src/
│   │   │   ├── providers/
│   │   │   ├── prompts/
│   │   │   │   ├── generate-description.ts
│   │   │   │   ├── valuation-report.ts
│   │   │   │   ├── market-analysis.ts
│   │   │   │   ├── lead-response.ts
│   │   │   │   └── comparable-analysis.ts
│   │   │   ├── tools/
│   │   │   │   ├── search-comparables.ts
│   │   │   │   ├── get-market-data.ts
│   │   │   │   └── generate-report.ts
│   │   │   └── hooks/
│   │   └── package.json
│   │
│   └── config/
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── TASK_TRACKER_AGENTS.md            # 👈 CRÍTICO: Tracker de tareas
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 🎨 DESIGN SYSTEM - AGENTES

### Paleta de Colores
```css
/* Propery Agents - Profesional Corporativo con toques modernos */

/* Primary - Azul Oscuro (Profesionalismo, Confianza) */
--primary-50: #f0f4ff;
--primary-100: #e0e9ff;
--primary-200: #c7d6fe;
--primary-300: #a4b8fc;
--primary-400: #7f91f8;
--primary-500: #5a67d8;  /* Principal */
--primary-600: #4c51bf;
--primary-700: #434190;
--primary-800: #3c366b;
--primary-900: #312e81;

/* Secondary - Teal (Datos, Análisis) */
--secondary-50: #e6fffa;
--secondary-100: #b2f5ea;
--secondary-400: #38b2ac;
--secondary-500: #319795;  /* Principal */
--secondary-600: #2c7a7b;

/* Accent - Naranja (Acciones, Alertas) */
--accent-400: #f6ad55;
--accent-500: #ed8936;

/* Status Colors */
--status-new: #3182ce;        /* Azul - Lead nuevo */
--status-contacted: #805ad5;  /* Púrpura - Contactado */
--status-visited: #d69e2e;    /* Amarillo - Visitó */
--status-negotiating: #ed8936; /* Naranja - Negociando */
--status-closed: #38a169;     /* Verde - Cerrado */
--status-lost: #e53e3e;       /* Rojo - Perdido */

/* Performance */
--performance-excellent: #48bb78;
--performance-good: #68d391;
--performance-average: #ecc94b;
--performance-poor: #fc8181;

/* Neutrals */
--gray-50: #f7fafc;
--gray-100: #edf2f7;
--gray-200: #e2e8f0;
--gray-300: #cbd5e0;
--gray-400: #a0aec0;
--gray-500: #718096;
--gray-600: #4a5568;
--gray-700: #2d3748;
--gray-800: #1a202c;
--gray-900: #171923;
```

### Typography
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-display: 'Plus Jakarta Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;  /* Para datos/números */
```

### Componentes Clave Dashboard
- **KPICard**: Card con métrica, comparación vs período anterior, sparkline
- **LeadPipeline**: Kanban board de leads por estado
- **PropertyTable**: Tabla con sorting, filtering, bulk actions
- **ValuationResult**: Resultado de valuación con confianza
- **TrendChart**: Gráfico de tendencias con ApexCharts
- **VisitCalendar**: Calendario de citas con drag & drop

---

## 📊 MOCK DATA REQUERIDO

### Agent Property (gestión)
```typescript
interface AgentProperty {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'ph' | 'land' | 'commercial';
  operation: 'sale' | 'rent';
  status: 'draft' | 'active' | 'paused' | 'sold' | 'rented';

  price: {
    amount: number;
    currency: 'ARS' | 'USD';
    isNegotiable: boolean;
  };
  expenses?: number;
  commission: number; // % de comisión

  // Location
  address: string;
  neighborhood: string;
  city: string;
  coordinates: { lat: number; lng: number };

  // Features
  surface: { total: number; covered: number };
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  age: number;
  amenities: string[];

  // Media
  images: Array<{
    url: string;
    isPrimary: boolean;
    order: number;
  }>;
  virtualTour?: string;
  video?: string;

  // Publishing
  publishedPortals: Array<{
    portal: 'zonaprop' | 'mercadolibre' | 'argenprop' | 'remax';
    externalId: string;
    url: string;
    publishedAt: string;
    status: 'active' | 'paused' | 'expired';
  }>;

  // Owner info
  owner: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };

  // Stats
  stats: {
    views: number;
    leads: number;
    visits: number;
    daysOnMarket: number;
  };

  createdAt: string;
  updatedAt: string;
}
```

### Lead
```typescript
interface Lead {
  id: string;
  propertyId: string;

  // Contact info
  name: string;
  email: string;
  phone: string;
  source: 'zonaprop' | 'mercadolibre' | 'website' | 'referral' | 'other';

  // Status
  status: 'new' | 'contacted' | 'visited' | 'negotiating' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high';

  // Qualification
  budget?: number;
  financing: boolean;
  timeline: 'immediate' | '1-3months' | '3-6months' | '6months+';

  // Activity
  activities: Array<{
    type: 'call' | 'email' | 'visit' | 'message' | 'note';
    date: string;
    description: string;
  }>;

  // Scheduling
  scheduledVisit?: {
    date: string;
    confirmed: boolean;
    notes: string;
  };

  assignedTo: string; // Agent ID
  createdAt: string;
  updatedAt: string;
}
```

### Valuation
```typescript
interface Valuation {
  id: string;
  propertyData: {
    type: string;
    operation: string;
    neighborhood: string;
    surface: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    age: number;
    amenities: string[];
  };

  result: {
    estimatedPrice: number;
    priceRange: { min: number; max: number };
    confidence: number;
    pricePerM2: number;
    comparables: Array<{
      id: string;
      address: string;
      price: number;
      pricePerM2: number;
      similarity: number;
      soldDate?: string;
    }>;
  };

  marketContext: {
    avgPriceZone: number;
    priceTrend: number;
    demandLevel: 'low' | 'medium' | 'high';
    avgDaysOnMarket: number;
  };

  generatedAt: string;
  expiresAt: string;
}
```

### KPIs
```typescript
interface AgentKPIs {
  period: 'daily' | 'weekly' | 'monthly';
  dateRange: { start: string; end: string };

  leads: {
    total: number;
    new: number;
    contacted: number;
    visited: number;
    closed: number;
    lost: number;
    conversionRate: number;
    avgResponseTime: number; // minutos
    vsLastPeriod: number; // % cambio
  };

  properties: {
    active: number;
    paused: number;
    sold: number;
    rented: number;
    avgDaysOnMarket: number;
    vsLastPeriod: number;
  };

  visits: {
    scheduled: number;
    completed: number;
    cancelled: number;
    showRate: number;
    vsLastPeriod: number;
  };

  revenue: {
    total: number;
    commissions: number;
    avgDealSize: number;
    vsLastPeriod: number;
  };

  marketPerformance: {
    vsZoneAvg: number;
    ranking: number;
    totalAgentsInZone: number;
  };
}
```

---

## 🔌 AI INTEGRATION - AGENTS

### Funciones del Asistente para Agentes
1. **Generar descripción**: Crear descripción atractiva para publicar
2. **Análisis de mercado**: Resumen de tendencias de zona
3. **Reporte de valuación**: Generar PDF profesional
4. **Análisis de comparables**: Explicar por qué se seleccionaron
5. **Respuesta a lead**: Generar respuesta personalizada
6. **Sugerencias de precio**: Basado en demanda actual
7. **Optimización de listing**: Sugerir mejoras a la publicación

### Prompts Base
```typescript
const AGENT_SYSTEM_PROMPT = `
Sos un asistente experto para corredores inmobiliarios en Argentina.
Tu objetivo es ayudar a los agentes a trabajar más eficientemente:
- Generar contenido de alta calidad para publicaciones
- Analizar datos de mercado y tendencias
- Crear reportes profesionales para clientes
- Responder consultas de forma rápida y efectiva

Usá un tono profesional y basate en datos concretos.
`;

const DESCRIPTION_PROMPT = `
Generá una descripción atractiva para esta propiedad.
Características:
- Destacar los puntos fuertes
- Mencionar ubicación y conectividad
- Usar lenguaje persuasivo pero honesto
- Formato: párrafo principal + bullets de características
- Longitud: 150-250 palabras
`;

const VALUATION_REPORT_PROMPT = `
Generá un resumen ejecutivo para el reporte de valuación.
Incluir:
- Precio sugerido y rango
- Comparables principales (3-5)
- Contexto de mercado
- Recomendación de precio de publicación
- Tiempo estimado de venta
`;
```

---

## ⚙️ CI/CD

### GitHub Actions
```yaml
name: CI Agents App
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
```

---

## 📝 CONVENCIONES DE CÓDIGO

### Naming
- **Componentes**: PascalCase (`LeadCard.tsx`)
- **Hooks**: camelCase con `use` (`useLeads.ts`)
- **Utils**: camelCase (`formatCurrency.ts`)
- **Types**: PascalCase (`Lead.ts`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Código**: Inglés
- **UI/Textos**: Español argentino

### Commits
```
feat(agents): add lead pipeline kanban
fix(agents-mobile): resolve calendar sync issue
refactor(agents): extract valuation logic to hook
```

---

## 🚀 ORDEN DE EJECUCIÓN

### Fase 1: Foundation (Módulo 1)
Setup monorepo, apps, design system, CI/CD

### Fase 2: Dashboard Core (Módulos 2, 3)
KPIs, gestión de propiedades

### Fase 3: Leads & Calendar (Módulos 4, 5)
CRM de leads, calendario de visitas

### Fase 4: Analytics & Valuator (Módulos 6, 7)
Analytics de mercado, valuador ML

### Fase 5: AI & Reports (Módulos 8, 9)
Asistente AI, generación de reportes

### Fase 6: Mobile (Módulo 10)
App mobile completa

---

## ⚠️ REGLAS IMPORTANTES

1. **SIEMPRE** actualizar `TASK_TRACKER_AGENTS.md` después de cada subtarea
2. **SIEMPRE** evaluar contexto antes de empezar tarea nueva
3. **NUNCA** empezar tarea que exceda 50% del contexto estimado
4. **SIEMPRE** TypeScript strict mode
5. **SIEMPRE** dashboard responsive (1024px+)
6. **SIEMPRE** accesibilidad (a11y) - especialmente tablas y formularios
7. **NUNCA** duplicar lógica entre dashboard y mobile

---

## 🔄 PARA CONTINUAR EN NUEVA SESIÓN

```
Continuando desarrollo de Propery Agents (Dashboard + Mobile).
Por favor:
1. Lee TASK_TRACKER_AGENTS.md
2. Identificá la última tarea completada
3. Continuá con la siguiente tarea pendiente
4. Actualizá el tracker al completar
```

---

*Prompt v1.0 - Propery Agents - Enero 2026*
