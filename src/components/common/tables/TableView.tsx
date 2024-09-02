import { flexRender, type Table } from "@tanstack/react-table";
import editIcon from "../../../assets/icons/table-edit.png";
import trashIcon from "../../../assets/icons/table-remove.png";
import additionalIcon from "../../../assets/icons/associate-permission.png";
import moduleActionIcon from "../../../assets/icons/module-action.png";

type TableViewProps<T> = {
  table: Table<T>;
  handleEdit: (rowData: T) => void;
  handleDelete: (rowData: T) => void;
  handleAdditionalAction?: (rowData: T) => void;
  handleAdditionalAction2?: (rowData: T) => void;
};

function TableView<T>({
  table,
  handleEdit,
  handleDelete,
  handleAdditionalAction,
  handleAdditionalAction2,
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
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
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
                key={row.id}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-skyblue_dark hover:text-white text-color_brand`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-1 whitespace-nowrap text-sm font-medium"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="px-6 py-1 whitespace-nowrap flex space-x-2">
                  <img
                    src={editIcon.src}
                    alt="Edit"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleEdit(rowData)}
                  />
                  <img
                    src={trashIcon.src}
                    alt="Delete"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleDelete(rowData)}

                  />
                  {handleAdditionalAction && (
                    <img
                      src={additionalIcon.src}
                      alt="Assign Permission"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleAdditionalAction(rowData)}
                    />
                  )}
                  {handleAdditionalAction2 && (
                    <img
                      src={moduleActionIcon.src}
                      alt="Assign Permission"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleAdditionalAction2(rowData)}
                    />
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
