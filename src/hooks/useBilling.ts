import { generateRequestOptions, buildPaginatedUrl } from "../components/utils/httpHandler";
import type { Billing } from "../types/BillingType";
import type { PaginationParams, PaginatedResponse } from "../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";
import type { Transaction } from "../types/TransactionType";
import { useFetchData } from "./api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_BILLING = "/billing/"
const PATH_TRANSACTION = "/billing/transaction/"

export const getBilling = async (
    queryParams: string,
    pagination: PaginationParams
): Promise<PaginatedResponse<Billing>> => {
    const options = generateRequestOptions("GET")
    const url = buildPaginatedUrl(BASE_URL + PATH_BILLING + "/search", pagination, queryParams)
    if (options && url) {
        const response = await useFetchData<PaginatedResponse<Billing>>(url, options)
        return response ? response : blankPaginatedResponse
    } else {
        return blankPaginatedResponse
    }
};

export const createBilling = async (billing: Billing): Promise<TransactionResponse | undefined> => {
    const options = generateRequestOptions("POST", billing)
    if (options) {
      return await useFetchData<TransactionResponse>(BASE_URL + PATH_BILLING, options)
    } else {
      return undefined
    }
  };
  
  export const updateBilling = async (billing: Billing): Promise<string | undefined> => {
    const options = generateRequestOptions("PUT", billing)
    if (options) {
      const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_BILLING, options)
      return response?.message ? response.message : undefined
    } else {
      return undefined
    }
  };

  export const checkTrxStatus = async (trx: String): Promise<Transaction | undefined> => {
    const options = generateRequestOptions("GET")
    if (options) {
      return await useFetchData<Transaction>(BASE_URL + PATH_TRANSACTION + trx, options)
    } else {
      return undefined
    }
  };