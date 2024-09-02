import { flexRender, type Table } from "@tanstack/react-table";
import editIcon from "../../../assets/icons/table-edit.png";
import trashIcon from "../../../assets/icons/table-remove.png";
type CardViewProps<T> = {
  table: Table<T>;
};

function TableCardView<T>({ table }: CardViewProps<T>) {
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
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="bg-white border border-skyblue_dark rounded-lg shadow-md mb-4 p-4"
        >
          <div className="grid grid-cols-2 gap-4">
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
              <img
                src={editIcon.src}
                alt="Edit"
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src={trashIcon.src}
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TableCardView;
