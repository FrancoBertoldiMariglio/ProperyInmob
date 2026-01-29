import { MapPin } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
}

const ZONES: Zone[] = [
  { id: 'palermo', name: 'Palermo' },
  { id: 'belgrano', name: 'Belgrano' },
  { id: 'recoleta', name: 'Recoleta' },
  { id: 'villa-crespo', name: 'Villa Crespo' },
  { id: 'puerto-madero', name: 'Puerto Madero' },
];

interface ZoneSelectorProps {
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  variant?: 'tabs' | 'dropdown';
  className?: string;
}

export function ZoneSelector({
  selectedZone,
  onZoneChange,
  variant = 'tabs',
  className,
}: ZoneSelectorProps) {
  if (variant === 'dropdown') {
    return (
      <div className={className}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={selectedZone}
            onChange={(e) => onZoneChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {ZONES.map((zone) => (
          <button
            key={zone.id}
            onClick={() => onZoneChange(zone.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedZone === zone.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {zone.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export { ZONES };
export type { Zone };
