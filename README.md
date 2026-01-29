# Propery Agents

Aplicacion para Agentes Inmobiliarios - Dashboard Web + Mobile App

## Stack Tecnologico

### Apps

- **Dashboard Web**: React 19 + Vite 6 + React Router v7 + Tailwind v4
- **Mobile App**: React Native + Expo SDK 52 + Expo Router (pendiente)

### Packages

- `@propery-agents/ui`: Componentes UI compartidos (Button, Input, Card, DataTable, etc.)
- `@propery-agents/core`: Hooks y stores (TanStack Query, Zustand)
- `@propery-agents/api-client`: Types TypeScript y mocks de API
- `@propery-agents/ai`: Integracion con AI (generador de descripciones, analisis de mercado)
- `@propery-agents/config`: Design tokens, utilidades y configuracion compartida

### Herramientas

- **Monorepo**: Turborepo + pnpm
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 9 + Prettier
- **CI/CD**: GitHub Actions

## Requisitos

- Node.js 22+
- pnpm 10+

## Instalacion

```bash
# Clonar el repositorio
git clone <repo-url>
cd ProperyInmob

# Instalar dependencias
pnpm install
```

## Desarrollo

```bash
# Iniciar todos los apps en desarrollo
pnpm dev

# Iniciar solo el dashboard
pnpm --filter @propery-agents/dashboard dev

# Iniciar solo mobile (cuando este configurado)
pnpm --filter @propery-agents/mobile dev
```

## Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Iniciar todos los apps

# Build
pnpm build        # Build de produccion

# Testing
pnpm test         # Ejecutar tests
pnpm lint         # Ejecutar linter
pnpm typecheck    # Verificar tipos
pnpm format       # Formatear codigo

# Limpieza
pnpm clean        # Limpiar builds y node_modules
```

## Estructura del Proyecto

```
ProperyInmob/
├── apps/
│   ├── dashboard/          # Web app (React + Vite)
│   └── mobile/             # Mobile app (Expo) - pendiente
├── packages/
│   ├── ui/                 # Componentes UI
│   ├── core/               # Hooks y stores
│   ├── api-client/         # Types y API mocks
│   ├── ai/                 # Integracion AI
│   └── config/             # Configuracion compartida
├── .github/
│   └── workflows/          # GitHub Actions
├── turbo.json              # Configuracion Turborepo
├── pnpm-workspace.yaml     # Configuracion pnpm workspace
└── package.json            # Root package.json
```

## Modulos de la Aplicacion

1. **Setup Proyecto + Design System** - Completado
2. **Dashboard Layout + KPIs** - Pendiente
3. **Gestion de Propiedades** - Pendiente
4. **CRM de Leads** - Pendiente
5. **Calendario de Visitas** - Pendiente
6. **Analytics de Mercado** - Pendiente
7. **Valuador ML** - Pendiente
8. **AI Assistant** - Pendiente
9. **Reportes y Exportacion** - Pendiente
10. **App Mobile** - Pendiente

Ver `TASK_TRACKER.md` para el detalle completo del progreso.

## Contribucion

1. Crear un branch desde `develop`
2. Hacer cambios
3. Ejecutar `pnpm lint && pnpm typecheck && pnpm test`
4. Crear Pull Request

## Licencia

Privado - Todos los derechos reservados
