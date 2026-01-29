import type { Visit } from '../types';

// Helper to get dates relative to today
const getDate = (daysFromToday: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().split('T')[0];
};

export const mockVisits: Visit[] = [
  {
    id: 'visit-1',
    propertyId: 'prop-1',
    propertyTitle: 'Departamento 3 ambientes con balcon en Palermo',
    propertyAddress: 'Honduras 4500, Palermo',
    leadId: 'lead-1',
    leadName: 'Juan Perez',
    leadPhone: '+54 11 6666-1111',
    date: getDate(0), // Today
    startTime: '10:00',
    endTime: '10:45',
    duration: 45,
    status: 'confirmed',
    notes: 'Cliente muy interesado. Mostrar balcon y amenities.',
    createdAt: '2025-01-27T10:00:00Z',
    updatedAt: '2025-01-28T09:00:00Z',
  },
  {
    id: 'visit-2',
    propertyId: 'prop-2',
    propertyTitle: 'Casa 4 ambientes con jardin y pileta en Martinez',
    propertyAddress: 'Av. del Libertador 14200, Martinez',
    leadId: 'lead-2',
    leadName: 'Carolina Martinez',
    leadPhone: '+54 11 6666-2222',
    date: getDate(0), // Today
    startTime: '15:00',
    endTime: '16:00',
    duration: 60,
    status: 'pending',
    notes: 'Primera visita. Familia de 4 integrantes.',
    createdAt: '2025-01-26T12:00:00Z',
    updatedAt: '2025-01-26T12:00:00Z',
  },
  {
    id: 'visit-3',
    propertyId: 'prop-3',
    propertyTitle: 'Monoambiente amoblado en Belgrano',
    propertyAddress: 'Cabildo 2800, Belgrano',
    leadId: 'lead-4',
    leadName: 'Ana Fernandez',
    leadPhone: '+54 11 6666-4444',
    date: getDate(1), // Tomorrow
    startTime: '11:00',
    endTime: '11:30',
    duration: 30,
    status: 'confirmed',
    notes: 'Segunda visita para medir muebles.',
    createdAt: '2025-01-27T10:00:00Z',
    updatedAt: '2025-01-27T10:00:00Z',
  },
  {
    id: 'visit-4',
    propertyId: 'prop-1',
    propertyTitle: 'Departamento 3 ambientes con balcon en Palermo',
    propertyAddress: 'Honduras 4500, Palermo',
    leadId: 'lead-3',
    leadName: 'Roberto Sanchez',
    leadPhone: '+54 11 6666-3333',
    date: getDate(-3), // 3 days ago
    startTime: '15:00',
    endTime: '15:45',
    duration: 45,
    status: 'completed',
    feedback: 'Le gusto mucho el departamento. Pendiente aprobacion de credito.',
    rating: 4,
    createdAt: '2025-01-21T10:00:00Z',
    updatedAt: '2025-01-24T16:00:00Z',
  },
  {
    id: 'visit-5',
    propertyId: 'prop-5',
    propertyTitle: 'Oficina premium en Puerto Madero',
    propertyAddress: 'Juana Manso 500, Puerto Madero',
    leadId: 'lead-7',
    leadName: 'Empresa Tech SA',
    leadPhone: '+54 11 7777-0000',
    date: getDate(3), // In 3 days
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    status: 'pending',
    notes: 'Visita con director de operaciones.',
    createdAt: '2025-01-28T14:00:00Z',
    updatedAt: '2025-01-28T14:00:00Z',
  },
];
