import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Building2,
  Users,
  Calendar,
  BarChart3,
  Calculator,
  FileText,
  Settings,
  Plus,
  X,
} from 'lucide-react';
import { cn } from '@propery-agents/config';
import { useAppStore } from '@propery-agents/core';

interface CommandItem {
  id: string;
  name: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  category: 'navigation' | 'action';
}

export function CommandPalette() {
  const navigate = useNavigate();
  const { commandPaletteOpen, closeCommandPalette } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-dashboard',
        name: 'Ir a Dashboard',
        icon: LayoutDashboard,
        action: () => navigate('/'),
        category: 'navigation',
      },
      {
        id: 'nav-properties',
        name: 'Ir a Propiedades',
        icon: Building2,
        action: () => navigate('/properties'),
        category: 'navigation',
      },
      {
        id: 'nav-leads',
        name: 'Ir a Leads',
        icon: Users,
        action: () => navigate('/leads'),
        category: 'navigation',
      },
      {
        id: 'nav-calendar',
        name: 'Ir a Calendario',
        icon: Calendar,
        action: () => navigate('/calendar'),
        category: 'navigation',
      },
      {
        id: 'nav-analytics',
        name: 'Ir a Analytics',
        icon: BarChart3,
        action: () => navigate('/analytics'),
        category: 'navigation',
      },
      {
        id: 'nav-valuator',
        name: 'Ir a Valuador',
        icon: Calculator,
        action: () => navigate('/valuator'),
        category: 'navigation',
      },
      {
        id: 'nav-reports',
        name: 'Ir a Reportes',
        icon: FileText,
        action: () => navigate('/reports'),
        category: 'navigation',
      },
      {
        id: 'nav-settings',
        name: 'Ir a Configuracion',
        icon: Settings,
        action: () => navigate('/settings'),
        category: 'navigation',
      },
      // Actions
      {
        id: 'action-new-property',
        name: 'Nueva Propiedad',
        description: 'Crear una nueva propiedad',
        icon: Plus,
        action: () => navigate('/properties/new'),
        category: 'action',
      },
      {
        id: 'action-new-lead',
        name: 'Nuevo Lead',
        description: 'Registrar un nuevo lead',
        icon: Plus,
        action: () => navigate('/leads/new'),
        category: 'action',
      },
      {
        id: 'action-new-visit',
        name: 'Agendar Visita',
        description: 'Programar una nueva visita',
        icon: Plus,
        action: () => navigate('/calendar?action=new'),
        category: 'action',
      },
      {
        id: 'action-new-valuation',
        name: 'Nueva Valuacion',
        description: 'Generar una valuacion',
        icon: Plus,
        action: () => navigate('/valuator'),
        category: 'action',
      },
    ],
    [navigate]
  );

  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    const lowerSearch = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(lowerSearch) ||
        cmd.description?.toLowerCase().includes(lowerSearch)
    );
  }, [commands, search]);

  const groupedCommands = useMemo(() => {
    const navigation = filteredCommands.filter((c) => c.category === 'navigation');
    const actions = filteredCommands.filter((c) => c.category === 'action');
    return { navigation, actions };
  }, [filteredCommands]);

  const executeCommand = useCallback(
    (command: CommandItem) => {
      command.action();
      closeCommandPalette();
      setSearch('');
    },
    [closeCommandPalette]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!commandPaletteOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          closeCommandPalette();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, filteredCommands, selectedIndex, executeCommand, closeCommandPalette]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (commandPaletteOpen) {
          closeCommandPalette();
        } else {
          useAppStore.getState().openCommandPalette();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [commandPaletteOpen, closeCommandPalette]);

  if (!commandPaletteOpen) return null;

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeCommandPalette} />

      {/* Dialog */}
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar comandos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
              autoFocus
            />
            <button
              onClick={closeCommandPalette}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No se encontraron resultados</p>
            ) : (
              <>
                {groupedCommands.actions.length > 0 && (
                  <div className="mb-2">
                    <p className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                      Acciones
                    </p>
                    {groupedCommands.actions.map((cmd) => {
                      const currentIndex = flatIndex++;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => executeCommand(cmd)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                            currentIndex === selectedIndex
                              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          <cmd.icon className="w-5 h-5 shrink-0" />
                          <div>
                            <p className="font-medium">{cmd.name}</p>
                            {cmd.description && (
                              <p className="text-sm text-gray-500">{cmd.description}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {groupedCommands.navigation.length > 0 && (
                  <div>
                    <p className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                      Navegacion
                    </p>
                    {groupedCommands.navigation.map((cmd) => {
                      const currentIndex = flatIndex++;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => executeCommand(cmd)}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                            currentIndex === selectedIndex
                              ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          )}
                        >
                          <cmd.icon className="w-5 h-5 shrink-0" />
                          <span className="font-medium">{cmd.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑↓</kbd> navegar
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>{' '}
                seleccionar
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">esc</kbd> cerrar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
