import { Users, Building2, Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@propery-agents/ui';
import {
  KPICard,
  LeadsOverviewChart,
  PropertiesOverviewWidget,
  RevenueChart,
  QuickActions,
  RecentActivity,
} from '@/components/dashboard';

// Mock KPI data (in production this would come from useKPIs hook)
const kpis = {
  totalLeads: {
    label: 'Leads Totales',
    value: 47,
    previousValue: 38,
    change: 23.7,
    changeType: 'increase' as const,
    format: 'number' as const,
    sparklineData: [32, 35, 38, 42, 40, 45, 47],
  },
  activeProperties: {
    label: 'Propiedades Activas',
    value: 12,
    previousValue: 10,
    change: 20,
    changeType: 'increase' as const,
    format: 'number' as const,
    sparklineData: [8, 9, 10, 10, 11, 11, 12],
  },
  scheduledVisits: {
    label: 'Visitas Programadas',
    value: 8,
    previousValue: 6,
    change: 33.3,
    changeType: 'increase' as const,
    format: 'number' as const,
    sparklineData: [4, 5, 6, 5, 7, 6, 8],
  },
  monthlyRevenue: {
    label: 'Comisiones del Mes',
    value: 15500,
    previousValue: 12000,
    change: 29.2,
    changeType: 'increase' as const,
    format: 'currency' as const,
    currency: 'USD' as const,
    sparklineData: [8000, 10000, 12000, 11500, 13000, 14000, 15500],
  },
  conversionRate: {
    label: 'Tasa de Conversion',
    value: 12.5,
    previousValue: 10.2,
    change: 22.5,
    changeType: 'increase' as const,
    format: 'percentage' as const,
    sparklineData: [8, 9, 10.2, 11, 10.5, 11.8, 12.5],
  },
  avgDaysOnMarket: {
    label: 'Dias Promedio',
    value: 45,
    previousValue: 52,
    change: -13.5,
    changeType: 'decrease' as const,
    format: 'number' as const,
    sparklineData: [58, 55, 52, 50, 48, 46, 45],
  },
};

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bienvenido de vuelta, Juan
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Aqui esta el resumen de tu actividad este mes.
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard kpi={kpis.totalLeads} icon={<Users className="w-5 h-5" />} />
        <KPICard kpi={kpis.activeProperties} icon={<Building2 className="w-5 h-5" />} />
        <KPICard kpi={kpis.scheduledVisits} icon={<Calendar className="w-5 h-5" />} />
        <KPICard kpi={kpis.monthlyRevenue} icon={<DollarSign className="w-5 h-5" />} />
        <KPICard kpi={kpis.conversionRate} icon={<TrendingUp className="w-5 h-5" />} />
        <KPICard kpi={kpis.avgDaysOnMarket} icon={<Clock className="w-5 h-5" />} />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Chart */}
          <Card>
            <CardContent className="p-6">
              <RevenueChart />
            </CardContent>
          </Card>

          {/* Leads Overview */}
          <Card>
            <CardContent className="p-6">
              <LeadsOverviewChart />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Widgets */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6">
              <QuickActions />
            </CardContent>
          </Card>

          {/* Properties Overview */}
          <Card>
            <CardContent className="p-6">
              <PropertiesOverviewWidget />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="p-6">
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
