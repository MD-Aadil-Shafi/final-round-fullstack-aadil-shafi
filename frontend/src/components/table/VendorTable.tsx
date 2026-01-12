import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { HouseHeart, Upload, ArrowUp, CircleCheckBig, CircleX } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableFilter from "./TableFilter"
import { getInitials } from "@/utils/Initilas"
import { useAppDispatch, useAppSelector } from "@/redux/useTypedSelectors"
import { fetchVendors } from "@/redux/thunk/vendorThunk"

export type Vendors = {
    name: string,
    about: string,
    logo?: string,
    owner_first_name?:string,
    owner_last_name?:string,
    description?: string,
    department?: string,
    location?:string,
    created_at: string,
    payment_type: string,
    year_expense: number,
    month_expense: number,
    active:boolean
}



export const columns: ColumnDef<Vendors>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Vendor",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback><HouseHeart /></AvatarFallback>
      </Avatar>
      <div className="flex flex-col capitalize">
        <h3>{row.getValue("name")}</h3>
        <p className="text-neutral-500">{row.original.about}</p>
      </div>
      </div>
    ),
  },
{
  accessorKey: "owner",
  header: "Owners",
  cell: ({ row }) => {
    const { owner_first_name, owner_last_name } = row.original

    return (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>
            {getInitials(owner_first_name)}
            {getInitials(owner_last_name)}
          </AvatarFallback>
        </Avatar>

        <h6 className="capitalize">
          {owner_first_name} {owner_last_name}
        </h6>
      </div>
    )
  },
},
  {
    accessorKey: "year_expense",
    header: ({ column }) => {
      return (
        <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          <ArrowUp />
          {/* <ArrowDown /> */}
        </Button>
        <p>365-day-spend</p>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("year_expense")) || 15500
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "month_expense",
    header: () => <div className="text-right">30-day-spend</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("month_expense")) || 0

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right">{formatted}</div>
    },
  },
{
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex">
        <h6 className="capitalize">{row.getValue("description")}</h6>
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="flex">
        <h6 className="capitalize">{row.getValue("department")}</h6>
      </div>
    ),
  },
    {
    accessorKey: "",
    header: "Contract",
    cell: () => (
      <Button variant="ghost"><Upload /></Button>
    ),
  },
  {
    accessorKey: "location",
    header: "Vendor owner location",
    cell: ({ row }) => (
        <h6 className="capitalize">{row.getValue("location")}</h6>
    ),
  },
    {
    accessorKey: "created_at",
    header: "Creation date",
    cell: ({ row }) => (
        <h6 className="capitalize">{row.getValue("created_at")}</h6>
    ),
  },
{
    accessorKey: "payment_type",
    header: "Payment type",
    cell: ({ row }) => (
        <h6 className="capitalize">{row.getValue("payment_type")}</h6>
    ),
  },
{
    accessorKey: "active",
    header: "Vendor status",
    cell: ({ row }) => (
        <h6 className="flex gap-2">{row.getValue("active") == true ? <CircleCheckBig className="text-green-400"/> : <CircleX className="text-red-400"/>} {row.getValue("active") == true ? "Active" : "In-Active"}</h6>
    ),
  },
  {
    accessorKey: "contact",
    header: "Default contact",
    cell: ({ row }) => (
        <h6>{row.getValue("contact")}</h6>
    ),
  },
]

export function VendorTable() {
  const dispatch = useAppDispatch();
  const { items, loading, total } = useAppSelector(
    (state) => state.vendors
  );
console.log('items', items, 'load', loading, 'total', total)
  React.useEffect(() => {
    dispatch(
      fetchVendors({
        page: 1,
        limit: 30,
        search: "",
        sort_by: "created_at",
        order: "desc",
      })
    );
  }, [dispatch]);

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data:items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  return (
    <div className="w-full">
      <TableFilter />
      <div className="overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-normal">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
