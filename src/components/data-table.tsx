import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  SearchIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/features/utils"
import { DefaultPageSizeOptions, type DefaultPageSizeOption } from "@/features/types"

type DataTableProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  className?: string
  emptyMessage?: string
  filterPlaceholder?: string
  isLoading?: boolean
  pageSizeOptions?: readonly number[]
  paginate?: boolean
  onPageChange?: (newPage: number) => void
  onPerPageChange?: (newPerPage: DefaultPageSizeOption) => void
  pageIndex?: number
  pageSize?: number
}


function getPageItems(pageIndex: number, pageCount: number) {
  const pages = new Set([0, pageIndex - 1, pageIndex, pageIndex + 1, pageCount - 1])

  return Array.from(pages)
    .filter((page) => page >= 0 && page < pageCount)
    .sort((a, b) => a - b)
}

function SortIcon({ sort }: { sort: false | "asc" | "desc" }) {
  if (sort === "asc") {
    return <ArrowUpIcon className="size-4 text-emerald-500" />
  }

  if (sort === "desc") {
    return <ArrowDownIcon className="size-4 text-red-500" />
  }

  return <ArrowUpDownIcon className="size-4 text-muted-foreground" />
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  className,
  emptyMessage = "Nenhum registro encontrado.",
  filterPlaceholder = "Buscar...",
  isLoading = false,
  pageSizeOptions = DefaultPageSizeOptions,
  paginate = true,
  onPageChange,
  onPerPageChange,
  pageIndex,
  pageSize,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeOptions[0] ?? 10,
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter,
      pagination: {
        pageIndex: pageIndex ?? pagination.pageIndex,
        pageSize: pageSize ?? pagination.pageSize,
      },
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      setPagination(updater)
      if (onPageChange) {
        const newPage = typeof updater === "function" ? updater(pagination).pageIndex : updater.pageIndex
        onPageChange(newPage + 1)
      }
      if (onPerPageChange) {
        const newPerPage = typeof updater === "function" ? updater(pagination).pageSize : updater.pageSize
        onPerPageChange(newPerPage as DefaultPageSizeOption)
      }
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const pageCount = table.getPageCount()
  const pageItems = getPageItems(table.getState().pagination.pageIndex, pageCount)

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative max-w-sm">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-label="Buscar na tabela"
          className="pl-9"
          placeholder={filterPlaceholder}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-md border border-border">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b border-border bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const sort = header.column.getIsSorted()

                    return (
                      <th
                        key={header.id}
                        className="h-11 px-4 text-left align-middle font-medium text-muted bg-card-foreground/50"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <Button
                            type="button"
                            variant="ghost"
                            className="-ml-3 h-8 px-3"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <SortIcon sort={sort} />
                          </Button>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="h-8 px-4 text-center text-muted-foreground"
                    colSpan={columns.length}
                  >
                    Carregando...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border transition-colors last:border-b-0 hover:bg-card-foreground/20"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="h-8 px-4 text-center text-muted-foreground"
                    colSpan={columns.length}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {
        paginate && (
          <>
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Linhas por pagina</span>
                <select
                  className="h-9 rounded-md border border-border bg-background px-2 text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
                  value={table.getState().pagination.pageSize}
                  onChange={(event) => table.setPageSize(Number(event.target.value))}
                >
                  {pageSizeOptions.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              <Pagination className="w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      aria-disabled={!table.getCanPreviousPage()}
                      className={cn(
                        !table.getCanPreviousPage() &&
                          "pointer-events-none opacity-50"
                      )}
                      href="#"
                      text="Anterior"
                      onClick={(event) => {
                        event.preventDefault()
                        table.previousPage()
                      }}
                    />
                  </PaginationItem>

                  {pageItems.map((page, index) => {
                    const previousPage = pageItems[index - 1]
                    const showEllipsis = previousPage !== undefined && page - previousPage > 1

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis ? (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : null}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive={page === table.getState().pagination.pageIndex}
                            onClick={(event) => {
                              event.preventDefault()
                              table.setPageIndex(page)
                            }}
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      aria-disabled={!table.getCanNextPage()}
                      className={cn(
                        !table.getCanNextPage() && "pointer-events-none opacity-50"
                      )}
                      href="#"
                      text="Proxima"
                      onClick={(event) => {
                        event.preventDefault()
                        table.nextPage()
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )
      }

    </div>
  )
}

export type { DataTableProps }
