import { generateRequestOptions } from "../components/utils/httpHandler";

import type { CompanyResume } from "../types/DashboardType";
import { useFetchData } from "./api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_MANAGEMENT = "/management"
const PATH_DASHBOARD = "/company/dashboard"


export const getCompanyResume = async () : Promise<CompanyResume | undefined> => {
  
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_MANAGEMENT + PATH_DASHBOARD
  if (options) {
    return await useFetchData<CompanyResume>(url, options)
  }
};
