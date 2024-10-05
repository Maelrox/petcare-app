import { useFetchData } from "./api/useFetchData"
import { buildPaginatedUrl, generateRequestOptions } from "../components/utils/httpHandler";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";
import type { Consult } from "../types/ConsultType";
import type { PaginatedResponse, PaginationParams } from "../types/RequestType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_APPOINTMENT = "/appointments/consultation"

export const searchConsult = async (
  consultFilter: Consult,
  pagination: PaginationParams
): Promise<PaginatedResponse<Consult>> => {

  const options = generateRequestOptions("POST", consultFilter ? consultFilter : {})
  
  const url = buildPaginatedUrl(BASE_URL + PATH_APPOINTMENT + "/search", pagination)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Consult>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const getConsult = async (consultId: number): Promise<Consult | undefined> => {
  const options = generateRequestOptions("GET", )
  const url = BASE_URL + PATH_APPOINTMENT + "/" + consultId
  if (options) {
    return await useFetchData<Consult>(url, options)
  }
};

export const createConsult = async (consult: Consult): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", consult)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_APPOINTMENT, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updateConsult = async (consult: Consult): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", consult)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_APPOINTMENT, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deleteAppointment = async (consultId: number): Promise<Consult | undefined> => {
  const options = generateRequestOptions("DELETE", )
  const url = BASE_URL + PATH_APPOINTMENT + "/" + consultId
  if (options) {
    return await useFetchData<Consult>(url, options)
  }
};