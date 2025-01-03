import { useFetchData } from "../api/useFetchData"
import { generateRequestOptions } from "../../components/utils/httpHandler";
import type { Appointment } from "../../types/AppointmentType";
import type { TransactionResponse } from "../../types/ResponseType";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_APPOINTMENT = "/appointments"

export const searchAppointment = async (appointmentFilter: Partial<Appointment>): Promise<Appointment[] | undefined> => {
  const options = generateRequestOptions("POST", appointmentFilter)
  const url = BASE_URL + PATH_APPOINTMENT + "/search"
  if (options) {
    return await useFetchData<Appointment[]>(url, options)
  }
};

export const getAppointment = async (appointmentId: number): Promise<Appointment | undefined> => {
  const options = generateRequestOptions("GET", )
  const url = BASE_URL + PATH_APPOINTMENT + "/" + appointmentId
  if (options) {
    return await useFetchData<Appointment>(url, options)
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

export const updateAppointment = async (appointment: Appointment): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", appointment)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_APPOINTMENT, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deleteAppointment = async (appointmentId: number): Promise<string | undefined> => {
  const options = generateRequestOptions("PATCH")
  const url = BASE_URL + PATH_APPOINTMENT + "/" + appointmentId
  if (options) {
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const fetchAppointments= async (patientId: number, appointmentId: string): Promise<Appointment[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_APPOINTMENT + `/${appointmentId}/patient/${patientId}`
  if (options) {
    return await useFetchData<Appointment[]>(url, options)
  }
};

export const fetchScheduledAppointments= async (patientId: number): Promise<Appointment[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_APPOINTMENT + `/patient/scheduled/${patientId}`
  if (options) {
    return await useFetchData<Appointment[]>(url, options)
  }
};