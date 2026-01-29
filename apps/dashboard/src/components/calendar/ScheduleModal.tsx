import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User } from 'lucide-react';
import { Button, Input, Select, Card } from '@propery-agents/ui';
import type { Visit, Property, Lead, CreateVisitInput } from '@propery-agents/api-client';

interface ScheduleModalProps {
  isOpen: boolean;
  visit?: Visit;
  initialDate?: Date;
  initialHour?: number;
  properties: Property[];
  leads: Lead[];
  onClose: () => void;
  onSubmit: (data: CreateVisitInput) => void;
  onDelete?: (visit: Visit) => void;
}

const durationOptions = [
  { value: '30', label: '30 minutos' },
  { value: '45', label: '45 minutos' },
  { value: '60', label: '1 hora' },
  { value: '90', label: '1.5 horas' },
  { value: '120', label: '2 horas' },
];

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTimeForInput = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export function ScheduleModal({
  isOpen,
  visit,
  initialDate,
  initialHour,
  properties,
  leads,
  onClose,
  onSubmit,
  onDelete,
}: ScheduleModalProps) {
  const [formData, setFormData] = useState<CreateVisitInput>({
    propertyId: '',
    leadId: '',
    date: '',
    startTime: '09:00',
    duration: 60,
    notes: '',
  });

  useEffect(() => {
    if (visit) {
      setFormData({
        propertyId: visit.propertyId,
        leadId: visit.leadId,
        date: visit.date,
        startTime: visit.startTime,
        duration: visit.duration || 60,
        notes: visit.notes || '',
      });
    } else if (initialDate) {
      const date = new Date(initialDate);
      if (initialHour !== undefined) {
        date.setHours(initialHour, 0, 0, 0);
      }
      setFormData((prev) => ({
        ...prev,
        date: formatDateForInput(date),
        startTime: formatTimeForInput(date),
      }));
    }
  }, [visit, initialDate, initialHour]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedProperty = properties.find((p) => p.id === formData.propertyId);
  const selectedLead = leads.find((l) => l.id === formData.leadId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {visit ? 'Editar visita' : 'Agendar visita'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Property */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4" />
              Propiedad *
            </label>
            <Select
              value={formData.propertyId}
              onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
              placeholder="Seleccionar propiedad"
              options={properties.map((p) => ({
                value: p.id,
                label: `${p.title} - ${p.address.street} ${p.address.number}`,
              }))}
            />
          </div>

          {/* Lead */}
          <div>
            <label className="mb-1 flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Lead *
            </label>
            <Select
              value={formData.leadId}
              onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
              placeholder="Seleccionar lead"
              options={leads.map((l) => ({
                value: l.id,
                label: `${l.name} - ${l.contact.email}`,
              }))}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Fecha *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4" />
                Hora
              </label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Duracion</label>
              <Select
                value={formData.duration.toString()}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                options={durationOptions}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-sm font-medium">Notas</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Notas adicionales..."
            />
          </div>

          {/* Preview */}
          {(selectedProperty || selectedLead) && (
            <Card className="bg-gray-50 p-4 dark:bg-gray-700">
              <h4 className="mb-2 text-sm font-medium">Resumen</h4>
              {selectedProperty && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📍 {selectedProperty.address.street} {selectedProperty.address.number},{' '}
                  {selectedProperty.address.neighborhood}
                </p>
              )}
              {selectedLead && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  👤 {selectedLead.name} ({selectedLead.contact.phone || selectedLead.contact.email}
                  )
                </p>
              )}
              {formData.date && formData.startTime && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  🗓️{' '}
                  {new Date(formData.date).toLocaleDateString('es-AR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}{' '}
                  a las {formData.startTime}
                </p>
              )}
            </Card>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            {visit && onDelete && (
              <Button type="button" variant="destructive" onClick={() => onDelete(visit)}>
                Eliminar
              </Button>
            )}
            <div className={`flex gap-3 ${!visit ? 'ml-auto' : ''}`}>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!formData.propertyId || !formData.leadId}>
                {visit ? 'Guardar cambios' : 'Agendar visita'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
