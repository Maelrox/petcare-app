import { generateRequestOptions, buildPaginatedUrl, configureRequestHeader } from "../../components/utils/httpHandler";
import type { Billing } from "../../types/BillingType";
import type { PaginationParams, PaginatedResponse } from "../../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../../types/ResponseType";
import type { Transaction } from "../../types/TransactionType";
import { useFetchData } from "../api/useFetchData";

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

export const cancellBilling = async (billing: Billing): Promise<TransactionResponse | undefined> => {
  const options = generateRequestOptions("DELETE", billing)
  if (options) {
    return await useFetchData<TransactionResponse>(BASE_URL + PATH_BILLING + billing.billingId, options)
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

export const downloadInvoice = async (billing: Billing): Promise<void> => {
  const options = generateRequestOptions("GET");
  if (!options) return;
  try {
    const headers = configureRequestHeader(options)
    const downloadUrl = BASE_URL + PATH_BILLING + "invoice/" + billing.billingId;
    const response = await fetch(downloadUrl, {
      ...options,
      headers,
    });   

    if (!response.ok) {
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice_${billing.billingId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("An error occurred while downloading the invoice:", error);
  }
};