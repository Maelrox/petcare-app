import { generateRequestOptions, buildPaginatedUrl } from "../../components/utils/httpHandler";
import { addToast } from "../../components/utils/toasterStore";
import type { RegisterRequest } from "../../types/RegisterRequestType";
import type { PaginationParams, PaginatedResponse } from "../../types/RequestType";
import { type TransactionResponse, blankPaginatedResponse } from "../../types/ResponseType";
import { useFetchData } from "../api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_MANAGEMENT = "/management"
const PATH_EMPLOYEE = "/employee"

export const register = async (registerData: RegisterRequest): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", registerData);
  if (options) {
    try {
      const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_MANAGEMENT + PATH_EMPLOYEE, options);
      if (response?.success) {
        return response?.message ? response.message : undefined
      }
    } catch (error) {
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "Unknown Error";
      }
      addToast(`Error: ${errorMessage}`);
    }
  }
};

export const update = async (registerData: RegisterRequest): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", registerData)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_MANAGEMENT + PATH_EMPLOYEE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deactivateUser = async (username: String): Promise<string | undefined> => {
  const options = generateRequestOptions("PATCH")
  if (options) {
    const response = await useFetchData<TransactionResponse>(`${BASE_URL}${PATH_MANAGEMENT}${PATH_EMPLOYEE}/${username}/disable`, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const search = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<RegisterRequest>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_MANAGEMENT + PATH_EMPLOYEE, pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<RegisterRequest>>(url, options)
    return response ? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};