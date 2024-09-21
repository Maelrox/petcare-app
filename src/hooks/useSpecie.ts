import { useFetchData } from "./api/useFetchData"
import { buildPaginatedUrl, generateRequestOptions } from "../components/utils/httpHandler";
import type { PaginatedResponse, PaginationParams } from "../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";
import type { Specie } from "../types/SpecieType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_SPECIE = "/veterinary/specie"

export const fetchSpecies = async (): Promise<Specie[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_SPECIE
  if (options) {
    return await useFetchData<Specie[]>(url, options)
  }
};

export const searchSpecies = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Specie>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_SPECIE + "/search", pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Specie>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createSpecie = async (specie: Specie): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", specie)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_SPECIE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updateSpecie = async (specie: Specie): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", specie)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_SPECIE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deleteSpecie = async (id: number): Promise<string | undefined> => {
  const options = generateRequestOptions("DELETE")
  if (options) {
    const url = `${BASE_URL}${PATH_SPECIE}/${id}`
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};