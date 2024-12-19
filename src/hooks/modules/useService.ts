import { generateRequestOptions, buildPaginatedUrl } from "../../components/utils/httpHandler";
import type { PaginationParams, PaginatedResponse } from "../../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../../types/ResponseType";
import type { Service } from "../../types/ServiceType";
import { useFetchData } from "../api/useFetchData";


const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_SERVICE = "/inventory/service"

export const getService = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Service>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_SERVICE + "/search", pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Service>>(url, options)
    return response ? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createService = async (service: Service): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", service)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_SERVICE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updateService = async (service: Service): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", service)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_SERVICE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};