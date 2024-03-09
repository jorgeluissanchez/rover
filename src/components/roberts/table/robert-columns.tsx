"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/table"

export const RobertColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "oxigen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Oxigen" />
    ),
    cell: ({ row }) => <span>{row.getValue("oxigen")}</span>
  },
]