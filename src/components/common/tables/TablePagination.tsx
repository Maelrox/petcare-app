import {
  type Table,
} from '@tanstack/react-table';

type PaginationProps<T> = {
  table: Table<T>;
};

function Pagination<T>({ table }: PaginationProps<T>) {
  return (
    <div className="mt-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
      {/* Pagination Buttons */}
      <div className="flex gap-2">
        <button
          className="px-4 py-2 border rounded bg-skyblue_dark text-white hover:bg-gray-300 disabled:opacity-50"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="px-4 py-2 border rounded bg-skyblue_dark text-white hover:bg-gray-300 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="px-4 py-2 border rounded bg-skyblue_dark text-white hover:bg-gray-300 disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="px-4 py-2 border rounded bg-skyblue_dark text-white hover:bg-gray-300 disabled:opacity-50"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>

      {/* Pagination Info */}
      <div className="text-skyblue_dark">
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
      </div>

      {/* Go to Page Input */}
      <div className="flex items-center gap-2 text-skyblue_dark">
        <span>Go to page:</span>
        <input
          type="number"
          min="1"
          max={table.getPageCount()}
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-20 text-skyblue_dark"
        />
      </div>
    
    </div>
  );
}

export default Pagination;