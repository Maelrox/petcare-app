import { generateRequestOptions, buildPaginatedUrl } from "../components/utils/httpHandler";
import type { Inventory } from "../types/InventoryType";
import type { PaginationParams, PaginatedResponse } from "../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";
import { useFetchData } from "./api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_INVENTORY = "/inventory/"

export const getInventory = async (
    queryParams: string,
    pagination: PaginationParams
): Promise<PaginatedResponse<Inventory>> => {
    const options = generateRequestOptions("GET")
    const url = buildPaginatedUrl(BASE_URL + PATH_INVENTORY + "/search", pagination, queryParams)
    if (options && url) {
        const response = await useFetchData<PaginatedResponse<Inventory>>(url, options)
        return response ? response : blankPaginatedResponse
    } else {
        return blankPaginatedResponse
    }
};

export const createInventory = async (inventory: Inventory): Promise<string | undefined> => {
    const options = generateRequestOptions("POST", inventory)
    if (options) {
      const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_INVENTORY, options)
      return response?.message ? response.message : undefined
    } else {
      return undefined
    }
  };
  
  export const updateInventory = async (inventory: Inventory): Promise<string | undefined> => {
    const options = generateRequestOptions("PUT", inventory)
    if (options) {
      const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_INVENTORY, options)
      return response?.message ? response.message : undefined
    } else {
      return undefined
    }
  };