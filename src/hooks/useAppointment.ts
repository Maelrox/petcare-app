import { useFetchData } from "./api/useFetchData"
import { generateRequestOptions } from "../components/utils/httpHandler";
import type { Appointment } from "../types/AppointmentType";
import type { TransactionResponse } from "../types/ResponseType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_APPOINTMENT = "/appointments"

export const search = async (appointmentFilter: Appointment): Promise<Appointment[] | undefined> => {
  const options = generateRequestOptions("POST", appointmentFilter)
  const url = BASE_URL + PATH_APPOINTMENT + "/search"
  if (options) {
    return await useFetchData<Appointment[]>(url, options)
  }
};

export const createAppointment = async (appointment: Appointment): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", appointment)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_APPOINTMENT, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};
