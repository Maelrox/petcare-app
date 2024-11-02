import React from "react";
import {
  type PaginationState,
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import TableCardView from "./TableCardView";
import Pagination from "./TablePagination";
import TableView from "./TableView";
import notFoundImage from "../../../assets/not_found_doctor.png";
import type { FormConfiguration } from "../../../types/FormFieldTypes";

type DataTableProps<T, U> = {
  dataSource: T[];
  pagination: PaginationState;
  totalRows: number;
  onPaginationChange: (pagination: PaginationState) => void;
  handleEdit: (rowData: T) => void;
  handleDelete: (rowData: T) => void;
  handleAdditionalAction?: (rowData: T) => void;
  handleAdditionalAction2?: (rowData: T) => void;
  isLoading: boolean;
  handleSelect?: (rowData: T) => void;
  configFields: FormConfiguration<T, U>[];
};

type AccessorFn<T> = (data: T) => any;

function createAccessorFn<T>(key: keyof T): AccessorFn<T> {
  return (data: T) => {
    const value = data[key];
    if (typeof value === 'object' && value !== null && 'name' in value) {
      return (value as any).name;
    }
    return value;
  };
}

function generateTableColumns<T, U>(data: T[], configFields: FormConfiguration<T, U>[]): {
  data: T[];
  columns: ColumnDef<T, any>[];
} {
  const columnHelper = createColumnHelper<T>();
  const columns: ColumnDef<T, any>[] = configFields.filter(field => !field.hiddenOnList).map((field) => {
    const accessorFn = createAccessorFn(field.name);
    return columnHelper.accessor(accessorFn, {
      id: field.name as string,
      header: field.label,
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    });
  });
  return { data, columns };
}

function DataTable<T, U>({
  dataSource,
  pagination,
  totalRows,
  onPaginationChange,
  handleEdit,
  handleDelete,
  handleAdditionalAction,
  handleAdditionalAction2,
  isLoading,
  handleSelect,
  configFields
}: DataTableProps<T, U>) {
  const { data, columns } = React.useMemo(
    () => generateTableColumns(dataSource, configFields),
    [dataSource, configFields]
  );
  const table = useReactTable({
    data,
    columns,
    pageCount: totalRows,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        onPaginationChange(updater(table.getState().pagination));
      } else {
        onPaginationChange(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false,
  });

  return (
    <div className="p-4">
      {!isLoading && dataSource.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={notFoundImage.src} alt="Not Found" className="mb-4" />
          <p className="text-gray-700 text-center">
            Apologies, but your search did not return any results. Please try
            adjusting your search terms or filters and try again.
          </p>
        </div>
      ) : (
        <>
          <TableView
            table={table}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAdditionalAction={handleAdditionalAction}
            handleAdditionalAction2={handleAdditionalAction2}
            handleSelect={handleSelect}
          />
          <TableCardView handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAdditionalAction={handleAdditionalAction}
            handleAdditionalAction2={handleAdditionalAction2}
            handleSelect={handleSelect}
            table={table} />
          <Pagination table={table} />
        </>
      )}
    </div>
  );
}

export default DataTable;
