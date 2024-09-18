import { useState, useEffect, useRef } from "react";
import type { PaginationState } from "@tanstack/react-table";
import { addToast } from "../components/utils/toasterStore";
import type { QueryParams } from "../types/RequestType";

type FetchDataResponse<T> = {
  data: T[];
  pagination: {
    totalPages: number;
    totalElements: number;
  };
};

type ServiceFunction<T> = (
  queryParams: string,
  pagination: { page: number; pageSize: number }
) => Promise<FetchDataResponse<T>>;

function usePaginatedData<T extends Record<string, any>>(
  service: ServiceFunction<T>
) {
  const [data, setData] = useState<T[]>([]);
  const [isRefresh, setRefresh] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<QueryParams>({});

  const availableFilters = useRef<string[]>([]);
  const totalRows = useRef<number>(0);

  //Refetch if filters or pagination changes
  //Todo refetch if refresh on demand
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const queryParams = new URLSearchParams(
          Object.entries(filters)
        ).toString();
        const response: FetchDataResponse<T> = await service(queryParams, {
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
        });
        totalRows.current = response.pagination.totalPages;
        const keys =
          response.data.length > 0
            ? Object.keys(response.data[0] as Record<string, any>).filter(
                (key) => !Array.isArray(response.data[0][key])
              )
            : [];
        availableFilters.current = keys;
        setData(response.data);
      } catch (err: any) {
        console.log(err.message);
        addToast(err.message);
      }
      setLoading(false)
    };
    if (isRefresh) {
      fetchData();
      setRefresh(false)
    }
  }, [filters, pagination, isRefresh]);

  const addFilter = (column: string, value: string) => {
    if (column && value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [column]: value,
      }));
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  };

  const removeFilter = (key: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
    setRefresh(true)
  };

  const handlePaginationChange = (paginationToUpdate: PaginationState) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: paginationToUpdate.pageIndex,
      pageSize: paginationToUpdate.pageSize,
    }));
    setRefresh(true)
  };

  return {
    data,
    filters,
    availableFilters,
    pagination,
    addFilter,
    removeFilter,
    handlePaginationChange,
    totalRows,
    setRefresh,
    isLoading
  };
}

export default usePaginatedData;
