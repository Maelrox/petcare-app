import { generateRequestOptions, buildPaginatedUrl, generateRequestOptionsForFileUpload } from "../../components/utils/httpHandler";
import type { PatientFile } from "../../types/PatientFilesType";
import type { Patient } from "../../types/PatientType";
import type { PaginationParams, PaginatedResponse } from "../../types/RequestType";
import  { blankPaginatedResponse, type TransactionResponse } from "../../types/ResponseType";
import { useFetchData } from "../api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_PATIENT = "/veterinary/patient"

export const uploadFile = async (patientFile: PatientFile, patientId?: number): Promise<string | undefined> => {
  const options = generateRequestOptionsForFileUpload("PUT", patientFile.file!, patientFile.description)
  let url = BASE_URL + PATH_PATIENT
  url += `/${patientId}/patientFiles`;
  if (options) {
    const response = await useFetchData<TransactionResponse>(url, options);
    return response?.message
  }
};

export const getPatientFiles = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Patient>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_PATIENT + "", pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Patient>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};