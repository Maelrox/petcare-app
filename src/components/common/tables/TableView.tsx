import { flexRender, type Table } from "@tanstack/react-table";
import { EditIcon, SettingsIcon, TrashIcon } from "lucide-react";
import ButtonIcon from "../buttons/ButtonIcon";

type TableViewProps<T> = {
  table: Table<T>;
  handleEdit?: (rowData: T) => void;
  handleDelete: (rowData: T) => void;
  handleAdditionalAction?: (rowData: T) => void;
  handleAdditionalAction2?: (rowData: T) => void;
  handleSelect?: (rowData: T) => void;
};

function TableView<T>({
  table,
  handleEdit,
  handleDelete,
  handleAdditionalAction,
  handleAdditionalAction2,
  handleSelect,
}: TableViewProps<T>) {
  return (
    <div className="hidden md:block">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-skyblue_dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
              <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row, rowIndex) => {
            const rowData = row.original as T;
            return (
              <tr
                onClick={handleSelect ? () => handleSelect(rowData) : undefined}
                key={row.id}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-skyblue_dark hover:text-white text-color_brand`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="px-6 py-1 whitespace-nowrap text-sm font-medium"
                    >
                      {flexRender(
                        typeof cell.column.columnDef.cell === "function"
                          ? cell.column.columnDef.cell
                          : () => cell.getValue(),
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
                <td className="px-6 py-1 whitespace-nowrap flex space-x-2 justify-center">
                  {handleEdit &&
                    <ButtonIcon
                      text=""
                      onClick={() => handleEdit(rowData)}
                      bgColor="bg-gray-100"
                    >
                      <EditIcon size={12} />
                    </ButtonIcon>}
                  <ButtonIcon
                    text=""
                    onClick={() => handleDelete(rowData)}
                    bgColor="bg-rose-600"
                    color="text-white"
                  >
                    <TrashIcon size={12} />
                  </ButtonIcon>
                  {handleAdditionalAction && (
                    <>
                      <ButtonIcon
                        bgColor="bg-gray-100"
                        text=""
                        onClick={() => handleAdditionalAction(rowData)}
                      >
                        <SettingsIcon size={12} />
                      </ButtonIcon>
                    </>
                  )}
                  {handleAdditionalAction2 && (
                    <>
                      <ButtonIcon
                        text=""
                        bgColor="bg-gray-100"
                        onClick={() => handleAdditionalAction2(rowData)}
                      >
                        <SettingsIcon size={12} />
                      </ButtonIcon>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
