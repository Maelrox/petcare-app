import { useFetchData } from "./api/useFetchData"
import { buildPaginatedUrl, generateRequestOptions } from "../components/utils/httpHandler";
import type { PaginatedResponse, PaginationParams } from "../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../types/ResponseType";
import type { Patient } from "../types/PatientType";
import { addToast } from "../components/utils/toasterStore";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_PATIENT = "/veterinary/patient"

export const fetchPatients = async (ownerId?: number): Promise<Patient[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_PATIENT
  if (ownerId !== undefined) {
    url += `?ownerId=${ownerId}`;
  }
  if (options) {
    return await useFetchData<Patient[]>(url, options)
  }
};

export const searchPatients = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Patient>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_PATIENT + "/search", pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Patient>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createPatient = async (patient: Patient): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", patient)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_PATIENT, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updatePatient = async (patient: Patient): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", patient)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_PATIENT, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deletePatient = async (id: number): Promise<string | undefined> => {
  const options = generateRequestOptions("DELETE")
  if (options) {
    const url = `${BASE_URL}${PATH_PATIENT}/${id}`
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const fetchPatientOptions = async (
  dependantId: number,
  optionIdField: string
): Promise<SelectOption[]> => {
  try {
    const patients = await fetchPatients(dependantId);
    if (patients && Array.isArray(patients)) {
      const idField = optionIdField as keyof Patient;
      return patients.map(patient => {
        const value = patient[idField];
        if (typeof value === 'number') {
          return {
            value,
            label: patient.name,
            dependantName: patient.owner?.name,
          };
        }
        throw new Error(`Value of ${optionIdField} is not a number.`);
      });
    }
  } catch (error) {
    addToast("Error reading patient options");
    console.error("Error fetching patients:", error);
  }
  return [];
};