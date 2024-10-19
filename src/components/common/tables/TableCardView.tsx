import { flexRender, type Table } from "@tanstack/react-table";
import { EditIcon, SettingsIcon, TrashIcon } from "lucide-react";
import ButtonIcon from "../buttons/ButtonIcon";

type CardViewProps<T> = {
  table: Table<T>;
  handleEdit: (rowData: T) => void;
  handleDelete: (rowData: T) => void;
  handleAdditionalAction?: (rowData: T) => void;
  handleAdditionalAction2?: (rowData: T) => void;
  handleSelect?: (rowData: T) => void;
};

function TableCardView<T>({ 
  table,
  handleEdit,
  handleDelete,
  handleAdditionalAction,
  handleAdditionalAction2,
  handleSelect, }: CardViewProps<T>) {
  const headerGroups = table.getHeaderGroups();
  const columnDefinitions = new Map<string, string>();

  headerGroups
    .flatMap((headerGroup) => headerGroup.headers)
    .forEach((header) => {
      columnDefinitions.set(
        header.column.id,
        header.column.columnDef.header as string
      );
    });


    return (
      <div className="block md:hidden">
        {table.getRowModel().rows.map((row) => {
          const rowData = row.original as T;
          
          return (
            <div
              onClick={handleSelect ? () => handleSelect(rowData) : undefined}
              key={row.id}
              className="bg-white border border-skyblue_dark rounded-lg shadow-md mb-4 p-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="flex items-center space-x-2">
                    <div className="font-semibold text-skyblue_dark">
                      {columnDefinitions.get(cell.column.id) || "No Header"}:
                    </div>
                    <div className="text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </div>
                ))}
                <div className="flex gap-1">
                  <ButtonIcon
                    text=""
                    onClick={() => handleEdit(rowData)}
                    bgColor="bg-gray-100"
                  >
                    <EditIcon size={12} />
                  </ButtonIcon>
                  <ButtonIcon
                    text=""
                    onClick={() => handleDelete(rowData)}
                    bgColor="bg-gray-100"
                  >
                    <TrashIcon size={12} />
                  </ButtonIcon>
                  {handleAdditionalAction && (
                    <ButtonIcon
                      text=""
                      onClick={() => handleAdditionalAction(rowData)}
                      bgColor="bg-gray-100"
                    >
                      <SettingsIcon size={12} />
                    </ButtonIcon>
                  )}
                  {handleAdditionalAction2 && (
                    <ButtonIcon
                      text=""
                      onClick={() => handleAdditionalAction2(rowData)}
                      bgColor="bg-gray-100"
                    >
                      <SettingsIcon size={12} />
                    </ButtonIcon>
                  )}
                  {handleSelect && (
                    <ButtonIcon
                      text=""
                      onClick={() => handleSelect(rowData)}
                      bgColor="bg-gray-100"
                    >
                      <SettingsIcon size={12} />
                    </ButtonIcon>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

export default TableCardView;
