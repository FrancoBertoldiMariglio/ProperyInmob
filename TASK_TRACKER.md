Prueba la IA directamente en tus aplicaciones favoritas … Usa Gemini para generar borradores y pulir contenido, y disfruta de Gemini Pro con acceso a la IA de nueva generación de Google por 19,99 US$ 9,99 US$ durante 2 meses

# Propery Agents - Task Tracker

**Aplicación para Agentes Inmobiliarios (Dashboard Web + Mobile)**

Última actualización: 2026-01-29
Sesión actual: 1 (En progreso)

## Estado General

- Módulo actual: 2 de 10 (casi completo)
- Progreso global: 18%
- Apps: Dashboard (React/Vite) + Mobile (React Native/Expo)

---

## Módulos

### 1. Setup Proyecto + Design System

**Estimación:** 4-6 horas | **Dependencias:** Ninguna

- [x] 1.1 Inicializar monorepo con Turborepo + pnpm
- [x] 1.2 Configurar React + Vite 6 - apps/dashboard
- [x] 1.3 Configurar React Router DOM v7
- [ ] 1.4 Configurar Expo SDK 52 + Expo Router - apps/mobile
- [x] 1.5 Setup package: `@propery-agents/ui` (componentes)
- [x] 1.6 Setup package: `@propery-agents/core` (hooks, stores)
- [x] 1.7 Setup package: `@propery-agents/api-client` (types + mocks)
- [x] 1.8 Setup package: `@propery-agents/ai` (integración AI)
- [x] 1.9 Setup package: `@propery-agents/config`
- [x] 1.10 Configurar Tailwind v4 + shadcn/ui (dashboard)
- [ ] 1.11 Configurar NativeWind (mobile)
- [x] 1.12 Crear Design Tokens (colores corporativos, spacing)
- [x] 1.13 Crear componentes primitivos: Button, Input, Select, Card, DataTable
- [x] 1.14 Configurar ESLint + Prettier + husky
- [x] 1.15 Setup GitHub Actions (lint, typecheck, test, build)
- [x] 1.16 README con instrucciones de desarrollo

**Status:** IN_PROGRESS (14/16 completadas - pendiente: Expo mobile setup)

---

### 2. Dashboard Layout + KPIs

**Estimación:** 6-8 horas | **Dependencias:** Módulo 1

- [x] 2.1 Layout principal del dashboard:
  - [x] Sidebar colapsable con navegación
  - [x] Header con búsqueda global + notificaciones + perfil
  - [x] Breadcrumb
  - [x] Command palette (Cmd+K)
- [x] 2.2 Mock data: KPIs del agente (leads, propiedades, visitas, revenue)
- [x] 2.3 KPICard component:
  - [x] Métrica principal
  - [x] Comparación vs período anterior (% cambio)
  - [x] Sparkline mini gráfico
  - [x] Icono representativo
- [x] 2.4 Dashboard home page con grid de KPIs
- [x] 2.5 LeadsOverviewChart (ApexCharts):
  - [x] Leads por estado (stacked bar)
  - [x] Tendencia últimos 30 días
- [x] 2.6 PropertiesOverviewWidget:
  - [x] Activas vs vendidas/alquiladas
  - [x] Días promedio en mercado
- [x] 2.7 RevenueChart (line chart):
  - [x] Comisiones mensuales
  - [x] Proyección
- [x] 2.8 QuickActions panel:
  - [x] Nueva propiedad
  - [x] Nuevo lead
  - [x] Agendar visita
  - [x] Generar valuación
- [x] 2.9 Recent activity feed
- [x] 2.10 Responsive: tablets + desktop
- [ ] 2.11 Unit tests

**Status:** IN_PROGRESS (10/11 completadas - pendiente: unit tests)

---

### 3. Gestión de Propiedades

**Estimación:** 8-10 horas | **Dependencias:** Módulos 1, 2

- [ ] 3.1 Tipos TypeScript: AgentProperty, PropertyStatus, Portal
- [ ] 3.2 Mock data: 20+ propiedades del agente
- [ ] 3.3 PropertyTable component (TanStack Table):
  - [ ] Columnas: foto, dirección, precio, estado, leads, días, acciones
  - [ ] Sorting por columna
  - [ ] Filtering por estado, tipo, operación
  - [ ] Bulk actions (pausar, activar, eliminar)
  - [ ] Paginación
- [ ] 3.4 PropertyFilters component
- [ ] 3.5 Página de lista de propiedades
- [ ] 3.6 PropertyForm (crear/editar):
  - [ ] Datos básicos (tipo, operación, precio)
  - [ ] Ubicación con mapa
  - [ ] Características (m², ambientes, etc.)
  - [ ] Amenities checkboxes
  - [ ] Datos del propietario
  - [ ] Comisión
- [ ] 3.7 ImageUploader component:
  - [ ] Drag & drop
  - [ ] Reordenar imágenes
  - [ ] Marcar principal
  - [ ] Preview
- [ ] 3.8 Página de detalle de propiedad:
  - [ ] Galería de fotos
  - [ ] Información completa
  - [ ] Stats (vistas, leads, visitas)
  - [ ] Historial de actividad
- [ ] 3.9 PublishModal:
  - [ ] Selección de portales
  - [ ] Preview por portal
  - [ ] Publicar/Pausar/Despublicar
- [ ] 3.10 Hook `useProperties` con TanStack Query
- [ ] 3.11 Store `propertyFormStore` con Zustand
- [ ] 3.12 Validación con Zod + React Hook Form
- [ ] 3.13 Unit tests

**Status:** NOT_STARTED

---

### 4. CRM de Leads

**Estimación:** 8-10 horas | **Dependencias:** Módulos 1, 2, 3

- [ ] 4.1 Tipos TypeScript: Lead, LeadStatus, LeadActivity
- [ ] 4.2 Mock data: 50+ leads con actividades
- [ ] 4.3 LeadPipeline component (Kanban):
  - [ ] Columnas por estado (Nuevo, Contactado, Visitó, Negociando, Cerrado, Perdido)
  - [ ] Drag & drop entre columnas
  - [ ] Cards con info resumida
  - [ ] Contador por columna
- [ ] 4.4 LeadCard component:
  - [ ] Nombre + propiedad
  - [ ] Fuente (ícono)
  - [ ] Prioridad (badge)
  - [ ] Tiempo desde último contacto
  - [ ] Quick actions
- [ ] 4.5 Vista alternativa: LeadTable (lista)
- [ ] 4.6 LeadFilters:
  - [ ] Por estado
  - [ ] Por propiedad
  - [ ] Por fuente
  - [ ] Por fecha
  - [ ] Por prioridad
- [ ] 4.7 LeadDetail page:
  - [ ] Info de contacto
  - [ ] Propiedad asociada
  - [ ] Timeline de actividades
  - [ ] Próxima visita programada
  - [ ] Notas
- [ ] 4.8 LeadForm (crear/editar):
  - [ ] Datos de contacto
  - [ ] Calificación (budget, financing, timeline)
  - [ ] Asignar propiedad
  - [ ] Prioridad
- [ ] 4.9 ActivityForm:
  - [ ] Tipo (llamada, email, visita, nota)
  - [ ] Descripción
  - [ ] Fecha
- [ ] 4.10 Cambio de estado con confirmación
- [ ] 4.11 Hook `useLeads`
- [ ] 4.12 Store `leadPipelineStore`
- [ ] 4.13 Unit tests

**Status:** NOT_STARTED

---

### 5. Calendario de Visitas

**Estimación:** 6-8 horas | **Dependencias:** Módulos 1, 3, 4

- [ ] 5.1 Tipos TypeScript: Visit, VisitStatus
- [ ] 5.2 Mock data: visitas programadas
- [ ] 5.3 VisitCalendar component:
  - [ ] Vista mensual
  - [ ] Vista semanal
  - [ ] Vista diaria
  - [ ] Navegación entre fechas
- [ ] 5.4 VisitCard en calendario:
  - [ ] Hora + duración
  - [ ] Propiedad (dirección resumida)
  - [ ] Lead (nombre)
  - [ ] Estado (pendiente, confirmada, completada, cancelada)
- [ ] 5.5 ScheduleModal:
  - [ ] Selección de propiedad
  - [ ] Selección de lead
  - [ ] Fecha y hora
  - [ ] Duración estimada
  - [ ] Notas
- [ ] 5.6 Drag & drop para reagendar
- [ ] 5.7 Vista de agenda del día (lista)
- [ ] 5.8 Confirmación/cancelación de visita
- [ ] 5.9 Recordatorios (notificaciones)
- [ ] 5.10 Integración con LeadDetail (mostrar visita programada)
- [ ] 5.11 Hook `useCalendar`
- [ ] 5.12 Store `calendarStore`
- [ ] 5.13 Unit tests

**Status:** NOT_STARTED

---

### 6. Analytics de Mercado

**Estimación:** 8-10 horas | **Dependencias:** Módulo 1

- [ ] 6.1 Mock data: histórico de mercado por zona (12 meses)
- [ ] 6.2 Mock data: demanda por tipo/zona
- [ ] 6.3 Analytics page layout
- [ ] 6.4 ZoneSelector component (mapa + dropdown)
- [ ] 6.5 TrendChart (ApexCharts):
  - [ ] Precio promedio por m² en el tiempo
  - [ ] Línea de venta + línea de alquiler
  - [ ] Annotations de eventos de mercado
- [ ] 6.6 DemandIndicator:
  - [ ] Gauge o semáforo de demanda
  - [ ] Búsquedas por tipo de propiedad
- [ ] 6.7 SupplyChart:
  - [ ] Propiedades activas por tipo (bar chart)
  - [ ] Tendencia de publicaciones
- [ ] 6.8 PriceDistribution:
  - [ ] Histograma de precios
  - [ ] Percentiles
- [ ] 6.9 ZoneHeatmap (mapa):
  - [ ] Mapa de calor por precio/m²
  - [ ] Toggle por operación
- [ ] 6.10 MarketComparison:
  - [ ] Comparar hasta 3 zonas
  - [ ] Tabla side-by-side
- [ ] 6.11 DaysOnMarketChart:
  - [ ] Promedio por tipo
  - [ ] Tendencia
- [ ] 6.12 MarketInsights AI:
  - [ ] Resumen generado por AI del estado del mercado
- [ ] 6.13 Export a PDF/Excel
- [ ] 6.14 Hook `useAnalytics`
- [ ] 6.15 Responsive charts
- [ ] 6.16 Unit tests

**Status:** NOT_STARTED

---

### 7. Valuador ML

**Estimación:** 8-10 horas | **Dependencias:** Módulos 1, 6

- [ ] 7.1 Tipos TypeScript: Valuation, Comparable
- [ ] 7.2 Mock data: base de comparables (100+ propiedades vendidas/alquiladas)
- [ ] 7.3 ValuationForm:
  - [ ] Tipo de propiedad
  - [ ] Operación
  - [ ] Ubicación (barrio + dirección)
  - [ ] Superficie (total/cubierta)
  - [ ] Ambientes, dormitorios, baños
  - [ ] Antigüedad
  - [ ] Amenities
  - [ ] Estado de conservación
  - [ ] Opcional: fotos para análisis AI
- [ ] 7.4 Algoritmo de búsqueda de comparables:
  - [ ] Filtrar por zona cercana
  - [ ] Filtrar por tipo y operación
  - [ ] Score de similaridad
  - [ ] Ordenar por relevancia
- [ ] 7.5 ValuationResult component:
  - [ ] Precio estimado (número grande)
  - [ ] Rango min-max
  - [ ] Indicador de confianza (gauge)
  - [ ] Precio por m²
- [ ] 7.6 ComparablesTable:
  - [ ] Lista de propiedades similares
  - [ ] Dirección, precio, m², fecha venta
  - [ ] Score de similaridad
  - [ ] Link a ver detalle
- [ ] 7.7 ComparablesMap:
  - [ ] Mapa con la propiedad a valuar
  - [ ] Markers de comparables
  - [ ] Radio de búsqueda
- [ ] 7.8 MarketContextCard:
  - [ ] Precio promedio de la zona
  - [ ] Tendencia de la zona
  - [ ] Nivel de demanda
  - [ ] Tiempo estimado de venta
- [ ] 7.9 PriceRecommendation:
  - [ ] Precio sugerido de publicación
  - [ ] Estrategia (agresivo, neutro, conservador)
- [ ] 7.10 ValuationReport generación:
  - [ ] PDF profesional para cliente
  - [ ] Logo del agente
  - [ ] Comparables incluidos
  - [ ] Gráficos
- [ ] 7.11 Historial de valuaciones realizadas
- [ ] 7.12 Hook `useValuator`
- [ ] 7.13 Unit tests

**Status:** NOT_STARTED

---

### 8. AI Assistant para Agentes

**Estimación:** 8-10 horas | **Dependencias:** Módulos 1, 3, 7

- [ ] 8.1 Arquitectura de providers AI agnóstica
- [ ] 8.2 AIAssistant component:
  - [ ] Panel lateral o modal
  - [ ] Chat conversacional
  - [ ] Streaming de respuestas
  - [ ] Historial de conversación
- [ ] 8.3 DescriptionGenerator:
  - [ ] Input: datos de propiedad
  - [ ] Output: descripción lista para publicar
  - [ ] Opciones de tono (formal, casual, premium)
  - [ ] Longitud configurable
  - [ ] Copiar/editar resultado
- [ ] 8.4 Función: Análisis de mercado de zona
- [ ] 8.5 Función: Reporte de valuación narrativo
- [ ] 8.6 Función: Respuesta sugerida a lead
- [ ] 8.7 Función: Optimización de listing
  - [ ] Analiza título y descripción
  - [ ] Sugiere mejoras
- [ ] 8.8 Función: Comparar mi propiedad vs competencia
- [ ] 8.9 ReportGenerator:
  - [ ] Generar reportes en PDF
  - [ ] Templates personalizables
- [ ] 8.10 Contexto automático (sabe qué propiedad/lead estás viendo)
- [ ] 8.11 Quick prompts predefinidos
- [ ] 8.12 Rate limiting y manejo de errores
- [ ] 8.13 Unit tests

**Status:** NOT_STARTED

---

### 9. Reportes y Exportación

**Estimación:** 4-6 horas | **Dependencias:** Módulos 6, 7, 8

- [ ] 9.1 ReportsPage:
  - [ ] Lista de reportes generados
  - [ ] Filtrar por tipo
  - [ ] Descargar/compartir
- [ ] 9.2 Tipos de reportes:
  - [ ] Valuación de propiedad
  - [ ] Análisis de mercado por zona
  - [ ] Performance del agente (mensual)
  - [ ] Comparativo de propiedades
- [ ] 9.3 PDF Generator (react-pdf o similar):
  - [ ] Template profesional
  - [ ] Logo personalizable
  - [ ] Gráficos embebidos
  - [ ] Tablas de datos
- [ ] 9.4 Excel Export:
  - [ ] Lista de propiedades
  - [ ] Lista de leads
  - [ ] Datos de mercado
- [ ] 9.5 Compartir por email (template)
- [ ] 9.6 Compartir por link (público temporal)
- [ ] 9.7 Historial de reportes con búsqueda
- [ ] 9.8 Unit tests

**Status:** NOT_STARTED

---

### 10. App Mobile para Agentes

**Estimación:** 10-12 horas | **Dependencias:** Módulos 1-9

- [ ] 10.1 Tab Navigation:
  - [ ] Dashboard (resumen)
  - [ ] Propiedades
  - [ ] Leads
  - [ ] Calendario
  - [ ] Perfil
- [ ] 10.2 Dashboard mobile:
  - [ ] KPIs resumidos
  - [ ] Visitas del día
  - [ ] Leads nuevos
  - [ ] Quick actions
- [ ] 10.3 Lista de propiedades:
  - [ ] Cards con foto + info
  - [ ] Filtros básicos
  - [ ] Pull to refresh
- [ ] 10.4 Detalle de propiedad mobile
- [ ] 10.5 Formulario de propiedad simplificado
- [ ] 10.6 Cámara para fotos de propiedad
- [ ] 10.7 Lista de leads:
  - [ ] Cards con info clave
  - [ ] Swipe actions (llamar, email, whatsapp)
- [ ] 10.8 Detalle de lead mobile
- [ ] 10.9 Cambio rápido de estado de lead
- [ ] 10.10 Calendario mobile:
  - [ ] Vista de agenda del día
  - [ ] Lista de próximas visitas
  - [ ] Confirmar/cancelar
- [ ] 10.11 Valuador rápido:
  - [ ] Formulario simplificado
  - [ ] Resultado inmediato
- [ ] 10.12 AI Assistant mobile:
  - [ ] Chat simplificado
  - [ ] Voice input
- [ ] 10.13 Notificaciones push:
  - [ ] Nuevo lead
  - [ ] Recordatorio de visita
  - [ ] Lead sin responder
- [ ] 10.14 Offline mode básico:
  - [ ] Ver propiedades y leads cacheados
  - [ ] Sync cuando hay conexión
- [ ] 10.15 Deep linking
- [ ] 10.16 Unit tests

**Status:** NOT_STARTED

---

## Registro de Sesiones

| Sesión | Fecha      | Duración    | Módulos | Tareas Completadas | Notas                                                   |
| ------ | ---------- | ----------- | ------- | ------------------ | ------------------------------------------------------- |
| 1      | 2026-01-29 | En progreso | 1, 2    | 24/27              | Setup monorepo, packages, dashboard layout, KPIs charts |

---

## Notas Técnicas

### Decisiones de Arquitectura

- Monorepo con Turborepo + pnpm workspaces
- React 19 + Vite 6 para el dashboard web
- Tailwind CSS v4 con plugin de Vite
- TanStack Query v5 para data fetching
- Zustand para estado global
- Mock API con tipos TypeScript completos
- AI package con arquitectura de providers agnóstica

### Problemas Encontrados

- Ninguno hasta el momento

### Componentes Implementados (Módulo 2)

- **Layout:** Sidebar, Header, Breadcrumb, CommandPalette, MobileSidebar
- **Dashboard:** KPICard (con sparklines), LeadsOverviewChart, PropertiesOverviewWidget, RevenueChart, QuickActions, RecentActivity
- Todos los componentes tienen soporte para dark mode y responsive design

### Dependencias Instaladas

- turbo, prettier, husky, lint-staged (root)
- react, react-dom, react-router-dom, @tanstack/react-query, zustand
- vite, tailwindcss, @tailwindcss/vite
- vitest, @testing-library/react
- lucide-react, apexcharts, react-apexcharts
- class-variance-authority, @radix-ui/react-slot

---

## Estimación Total

| Módulo                 | Estimación |
| ---------------------- | ---------- |
| 1. Setup               | 4-6h       |
| 2. Dashboard + KPIs    | 6-8h       |
| 3. Gestión Propiedades | 8-10h      |
| 4. CRM Leads           | 8-10h      |
| 5. Calendario          | 6-8h       |
| 6. Analytics Mercado   | 8-10h      |
| 7. Valuador ML         | 8-10h      |
| 8. AI Assistant        | 8-10h      |
| 9. Reportes            | 4-6h       |
| 10. Mobile App         | 10-12h     |
| **TOTAL**              | **70-90h** |

---

## Próximos Pasos

1. Iniciar Módulo 3 (Gestión de Propiedades)
2. Implementar PropertyTable con TanStack Table
3. Crear PropertyForm para crear/editar propiedades
4. Implementar ImageUploader con drag & drop
5. Opcional: Unit tests para Módulos 1 y 2
6. Opcional: Configuración de Expo + NativeWind para mobile
