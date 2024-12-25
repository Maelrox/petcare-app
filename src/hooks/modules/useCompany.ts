import { generateRequestOptions } from "../../components/utils/httpHandler";
import type { Company } from "../../types/CompanyType";
import type { TransactionResponse } from "../../types/ResponseType";
import { useFetchData } from "../api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_COMPANY = "/management/company"

export const fetchCompanyData = async (): Promise<Company | undefined> => {
  const options = generateRequestOptions("GET")
  const url = BASE_URL + PATH_COMPANY
  if (options) {
    return await useFetchData<Company>(url, options)
  }
};

export const updateCompany = async (company: Company): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", company)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_COMPANY, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};
