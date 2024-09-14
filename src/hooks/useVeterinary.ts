import { useFetchData } from "./api/useFetchData"
import { buildPaginatedUrl, generateRequestOptions } from "../components/utils/httpHandler";
import type { Veterinary } from "../types/VeterinaryType";
import type { PaginatedResponse, PaginationParams } from "../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_VETERINARY = "/veterinary"

export const fetchVeterinaries = async (veterinaryId?: number): Promise<Veterinary[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_VETERINARY
  if (veterinaryId !== undefined) {
    url += `?veterinaryId=${veterinaryId}`;
  }
  if (options) {
    return await useFetchData<Veterinary[]>(url, options)
  }
};

export const searchVeterinaries = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Veterinary>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_VETERINARY + "/search", pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Veterinary>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createVeterinary = async (veterinary: Veterinary): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", veterinary)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_VETERINARY, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updateVeterinary = async (veterinary: Veterinary): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", veterinary)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_VETERINARY, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deleteRole = async (id: number): Promise<string | undefined> => {
  const options = generateRequestOptions("DELETE")
  if (options) {
    const url = `${BASE_URL}${PATH_VETERINARY}/${id}`
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};
