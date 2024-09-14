import { useFetchData } from "./api/useFetchData"
import { buildPaginatedUrl, generateRequestOptions } from "../components/utils/httpHandler";
import type { PaginatedResponse, PaginationParams } from "../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";
import type { Owner } from "../types/OwnerType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_OWNER = "/veterinary/owner"

export const fetchOwners = async (ownerId?: number): Promise<Owner[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_OWNER
  if (ownerId !== undefined) {
    url += `?ownerId=${ownerId}`;
  }
  if (options) {
    return await useFetchData<Owner[]>(url, options)
  }
};

export const searchOwners = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Owner>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_OWNER + "/search", pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Owner>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createOwner = async (owner: Owner): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", owner)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_OWNER, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updateOwner = async (owner: Owner): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", owner)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_OWNER, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deleteOwner = async (id: number): Promise<string | undefined> => {
  const options = generateRequestOptions("DELETE")
  if (options) {
    const url = `${BASE_URL}${PATH_OWNER}/${id}`
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};
