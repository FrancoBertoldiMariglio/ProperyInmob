import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Badge, Avatar } from '@propery-agents/ui';
import type { Lead } from '@propery-agents/api-client';

interface LeadTableProps {
  leads: Lead[];
  isLoading?: boolean;
  onView: (lead: Lead) => void;
  onQuickAction: (lead: Lead, action: string) => void;
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

const priorityColors: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
  high: 'destructive',
  medium: 'warning',
  low: 'default',
};

const priorityLabels: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
  });
};

export function LeadTable({ leads, isLoading, onView, onQuickAction }: LeadTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Lead
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.original.name} size="sm" />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {row.original.name}
              </div>
              <div className="text-sm text-gray-500">{row.original.email}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'property',
        header: 'Propiedad',
        cell: ({ row }) =>
          row.original.property ? (
            <div className="max-w-[200px]">
              <p className="truncate text-sm">{row.original.property.title}</p>
            </div>
          ) : (
            <span className="text-gray-400">-</span>
          ),
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => (
          <Badge variant={statusColors[row.original.status]}>
            {statusLabels[row.original.status]}
          </Badge>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Prioridad',
        cell: ({ row }) => (
          <Badge variant={priorityColors[row.original.priority]}>
            {priorityLabels[row.original.priority]}
          </Badge>
        ),
      },
      {
        accessorKey: 'source',
        header: 'Fuente',
        cell: ({ row }) => <span className="capitalize text-sm">{row.original.source}</span>,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Fecha
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction(row.original, 'call');
              }}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction(row.original, 'email');
              }}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction(row.original, 'whatsapp');
              }}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [onQuickAction]
  );

  const table = useReactTable({
    data: leads,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  Cargando leads...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  No se encontraron leads
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => onView(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {leads.length} lead{leads.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
