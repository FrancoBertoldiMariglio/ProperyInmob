import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@propery-agents/config';

const routeLabels: Record<string, string> = {
  properties: 'Propiedades',
  leads: 'Leads',
  calendar: 'Calendario',
  analytics: 'Analytics',
  valuator: 'Valuador',
  reports: 'Reportes',
  settings: 'Configuracion',
};

export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumb on home page
  if (pathSegments.length === 0) {
    return null;
  }

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = routeLabels[segment] || segment;
    const isLast = index === pathSegments.length - 1;

    return { path, label, isLast };
  });

  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
      <Link
        to="/"
        className="flex items-center hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2" />
          {crumb.isLast ? (
            <span className="font-medium text-gray-900 dark:text-white">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
