import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Edit,
  Trash2,
  Building2,
  Clock,
  DollarSign,
  User,
} from 'lucide-react';
import { Button, Badge, Card, Avatar } from '@propery-agents/ui';
import type { Lead } from '@propery-agents/api-client';

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
  onScheduleVisit: () => void;
  onAddActivity: () => void;
}

const statusColors: Record<
  string,
  'default' | 'success' | 'warning' | 'destructive' | 'secondary'
> = {
  new: 'default',
  contacted: 'warning',
  qualified: 'secondary',
  visited: 'default',
  negotiating: 'warning',
  closed_won: 'success',
  closed_lost: 'destructive',
};

const statusLabels: Record<string, string> = {
  new: 'Nuevo',
  contacted: 'Contactado',
  qualified: 'Calificado',
  visited: 'Visitó',
  negotiating: 'Negociando',
  closed_won: 'Cerrado',
  closed_lost: 'Perdido',
};

const priorityLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

const activityIcons: Record<string, React.ReactNode> = {
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  whatsapp: <MessageCircle className="h-4 w-4" />,
  visit: <Building2 className="h-4 w-4" />,
  note: <Edit className="h-4 w-4" />,
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export function LeadDetail({
  lead,
  onBack,
  onEdit,
  onDelete,
  onStatusChange,
  onScheduleVisit,
  onAddActivity,
}: LeadDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar name={lead.name} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{lead.name}</h1>
              <Badge variant={statusColors[lead.status]}>{statusLabels[lead.status]}</Badge>
            </div>
            <p className="text-gray-500">{lead.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact Actions */}
          <Card className="p-4">
            <div className="flex flex-wrap gap-3">
              <Button className="flex-1" onClick={() => window.open(`tel:${lead.phone}`)}>
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(`mailto:${lead.email}`)}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(`https://wa.me/${lead.phone?.replace(/\D/g, '')}`)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" className="flex-1" onClick={onScheduleVisit}>
                <Calendar className="mr-2 h-4 w-4" />
                Agendar visita
              </Button>
            </div>
          </Card>

          {/* Status Pipeline */}
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Estado del lead</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusLabels).map(([status, label]) => (
                <Button
                  key={status}
                  variant={lead.status === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange(status)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Activity Timeline */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Historial de actividades</h2>
              <Button size="sm" onClick={onAddActivity}>
                + Agregar actividad
              </Button>
            </div>

            {lead.activities && lead.activities.length > 0 ? (
              <div className="space-y-4">
                {lead.activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        {activityIcons[activity.type] || <Clock className="h-4 w-4" />}
                      </div>
                      {index < lead.activities!.length - 1 && (
                        <div className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{activity.type}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(activity.createdAt)}
                        </span>
                      </div>
                      {activity.notes && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Sin actividades registradas</p>
            )}
          </Card>

          {/* Notes */}
          {lead.notes && (
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Notas</h2>
              <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">{lead.notes}</p>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold">Información de contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{lead.email}</span>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm capitalize">Fuente: {lead.source}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Creado: {formatDate(lead.createdAt)}</span>
              </div>
            </div>
          </Card>

          {/* Qualification */}
          {lead.qualification && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Calificación</h3>
              <div className="space-y-3">
                {lead.qualification.budget && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Presupuesto</span>
                    <span className="font-medium">
                      {formatPrice(lead.qualification.budget, 'USD')}
                    </span>
                  </div>
                )}
                {lead.qualification.financing !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Financiación</span>
                    <Badge variant={lead.qualification.financing ? 'success' : 'secondary'}>
                      {lead.qualification.financing ? 'Sí' : 'No'}
                    </Badge>
                  </div>
                )}
                {lead.qualification.timeline && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Timeline</span>
                    <span className="text-sm capitalize">{lead.qualification.timeline}</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Property */}
          {lead.property && (
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Propiedad de interés</h3>
              <div className="space-y-2">
                <p className="font-medium">{lead.property.title}</p>
                <p className="text-sm text-gray-500">
                  {lead.property.address.street} {lead.property.address.number}
                </p>
                <p className="text-lg font-bold text-indigo-600">
                  {formatPrice(lead.property.price, lead.property.currency)}
                </p>
              </div>
            </Card>
          )}

          {/* Priority */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold">Prioridad</h3>
            <div className="flex gap-2">
              {(['high', 'medium', 'low'] as const).map((p) => (
                <Button
                  key={p}
                  variant={lead.priority === p ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                >
                  {priorityLabels[p]}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
