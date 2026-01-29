import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Command } from 'lucide-react';
import { cn } from '@propery-agents/config';
import { useAppStore } from '@propery-agents/core';
import { Avatar } from '@propery-agents/ui';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/properties': 'Propiedades',
  '/leads': 'Leads',
  '/calendar': 'Calendario',
  '/analytics': 'Analytics',
  '/valuator': 'Valuador',
  '/reports': 'Reportes',
  '/settings': 'Configuracion',
};

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const { openCommandPalette, toggleNotificationsPanel } = useAppStore();
  const [searchFocused, setSearchFocused] = useState(false);

  // Get current page title
  const currentPath = Object.keys(routeTitles).find((path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
  );
  const pageTitle = currentPath ? routeTitles[currentPath] : 'Dashboard';

  // Mock notification count
  const notificationCount = 3;

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 h-16 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title */}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div
          className={cn(
            'flex items-center w-full px-3 py-2 rounded-lg border transition-colors',
            searchFocused
              ? 'border-primary-500 ring-2 ring-primary-500/20'
              : 'border-gray-200 dark:border-gray-700'
          )}
        >
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar propiedades, leads..."
            className="flex-1 ml-2 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button
            onClick={openCommandPalette}
            className="hidden lg:flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Mobile search button */}
        <button
          onClick={openCommandPalette}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          onClick={toggleNotificationsPanel}
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 text-xs font-medium text-white bg-error-500 rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Avatar name="Juan Agente" size="sm" />
          <div className="hidden lg:block text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Juan Agente</p>
            <p className="text-xs text-gray-500">Agente Premium</p>
          </div>
        </button>
      </div>
    </header>
  );
}
