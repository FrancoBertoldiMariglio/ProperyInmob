import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button, Badge } from '@propery-agents/ui';
import type { Property } from '@propery-agents/api-client';

interface PropertyTableProps {
  properties: Property[];
  isLoading?: boolean;
  onView: (property: Property) => void;
  onEdit: (property: Property) => void;
  onToggleStatus: (property: Property) => void;
  onDelete: (property: Property) => void;
  onPublish: (property: Property) => void;
  onBulkAction?: (action: string, properties: Property[]) => void;
}

const statusColors: Record<
  string,
  'default' | 'success' | 'warning' | 'destructive' | 'secondary'
> = {
  active: 'success',
  paused: 'warning',
  draft: 'secondary',
  sold: 'default',
  rented: 'default',
  reserved: 'warning',
};

const statusLabels: Record<string, string> = {
  active: 'Activa',
  paused: 'Pausada',
  draft: 'Borrador',
  sold: 'Vendida',
  rented: 'Alquilada',
  reserved: 'Reservada',
};

const operationLabels: Record<string, string> = {
  sale: 'Venta',
  rent: 'Alquiler',
  temporary_rent: 'Temp.',
};

const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyTable({
  properties,
  isLoading,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
  onPublish,
  onBulkAction,
}: PropertyTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const columns = useMemo<ColumnDef<Property>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
        ),
        size: 40,
      },
      {
        id: 'image',
        header: '',
        cell: ({ row }) => {
          const mainImage = row.original.images.find((img) => img.isMain) || row.original.images[0];
          return mainImage ? (
            <img
              src={mainImage.thumbnailUrl}
              alt={row.original.title}
              className="h-12 w-16 rounded object-cover"
            />
          ) : (
            <div className="flex h-12 w-16 items-center justify-center rounded bg-gray-100 text-xs text-gray-400 dark:bg-gray-700">
              Sin foto
            </div>
          );
        },
        size: 80,
      },
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Propiedad
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{row.original.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.original.address.street} {row.original.address.number},{' '}
              {row.original.address.neighborhood}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Precio
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => (
          <div>
            <div className="font-medium">
              {formatPrice(row.original.price, row.original.currency)}
            </div>
            <div className="text-sm text-gray-500">{operationLabels[row.original.operation]}</div>
          </div>
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
        accessorKey: 'stats.leads',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Leads
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.original.stats.leads}</span>,
      },
      {
        accessorKey: 'stats.daysOnMarket',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 font-medium"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Días
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ row }) => <span>{row.original.stats.daysOnMarket}d</span>,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => {
          const property = row.original;
          const isOpen = openDropdown === property.id;

          return (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpenDropdown(isOpen ? null : property.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>

              {isOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                  <div className="absolute right-0 z-20 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <button
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        onView(property);
                        setOpenDropdown(null);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      Ver detalle
                    </button>
                    <button
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        onEdit(property);
                        setOpenDropdown(null);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </button>
                    <button
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        onPublish(property);
                        setOpenDropdown(null);
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                      Publicar
                    </button>
                    <button
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        onToggleStatus(property);
                        setOpenDropdown(null);
                      }}
                    >
                      {property.status === 'active' ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Activar
                        </>
                      )}
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      onClick={() => {
                        onDelete(property);
                        setOpenDropdown(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        },
        size: 50,
      },
    ],
    [openDropdown, onView, onEdit, onToggleStatus, onDelete, onPublish]
  );

  const table = useReactTable({
    data: properties,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedRows.length > 0 && onBulkAction && (
        <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {selectedRows.length} seleccionada(s)
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onBulkAction(
                  'pause',
                  selectedRows.map((r) => r.original)
                )
              }
            >
              <Pause className="mr-1 h-3 w-3" />
              Pausar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onBulkAction(
                  'activate',
                  selectedRows.map((r) => r.original)
                )
              }
            >
              <Play className="mr-1 h-3 w-3" />
              Activar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() =>
                onBulkAction(
                  'delete',
                  selectedRows.map((r) => r.original)
                )
              }
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Eliminar
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    style={{ width: header.getSize() }}
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
                  Cargando propiedades...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                  No se encontraron propiedades
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
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
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando{' '}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            properties.length
          )}{' '}
          de {properties.length} propiedades
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
