import Owners from "../components/modules/owner/Owners";
import Services from "../components/modules/service/Services";
import { fetchPatientOptions } from "../hooks/modules/usePatient";
import { fetchVeterinaries } from "../hooks/modules/useVeterinary";
import type { FormField } from "./FormType";
import type { Owner } from "./OwnerType";
import type { Service } from "./ServiceType";
import type { Veterinary } from "./VeterinaryType";

export interface Appointment {
  appointmentId?: number;
  patientId: number;
  vetId: number;
  appointmentDate: string;
  reason: string;
  status: string;
  initialDate?: string;
  finalDate?: string;
  owner?: Owner;
  ownerId?: number;
  specieName?: string;
  vetName?: string;
  serviceId?: number;
  service?: Service;
  serviceName?: string;
}

export const appointmentFields: FormField<Appointment, Veterinary, Appointment>[] = [
  {
    name: "appointmentId",
    label: "",
    type: "none",
    required: false,
    identifier: true,
    placeHolder: true,
    includeFilter: false,
    hiddenOnList: true,
  },
  {
    name: "owner",
    label: "Owner",
    type: "text",
    required: true,
    searchTable: Owners,
    placeHolder: true,
    displaySelect: "name",
  },
  {
    name: "patientId",
    label: "Patient",
    type: "select-dependant",
    required: true,
    dependsOn: "owner",
    validators: { maxLength: 64 },
    dependantId: "ownerId",
    fetchDependant: fetchPatientOptions,
  },
  {
    name: "vetId",
    label: "Veterinary",
    type: "select",
    required: true,
    dependantId: "vetId",
    validators: { maxLength: 64 },
    fetch: fetchVeterinaries,
  },
  {
    name: "appointmentDate",
    label: "Date",
    type: "datetime-local",
    required: true,
    validators: { maxLength: 64 },
  },
  {
    name: "service",
    label: "Service",
    type: "text",
    required: true,
    placeHolder: true,
    searchTable: Services,
    displaySelect: "name",
  },
  {
    name: "serviceName",
    label: "",
    type: "none",
    placeHolder: true,
    dependsOn: "service"
  },
  {
    name: "serviceId",
    label: "Service",
    type: "none",
    dependsOn: "service",
    dependantId: "id",
  },
  {
    name: "reason",
    label: "Reason",
    type: "text",
    required: true,
    validators: { maxLength: 256 },
  },
  {
    name: "status",
    label: "Status",
    type: "text",
    required: true,
    readOnly: true,
    validators: { maxLength: 16 },
  },

];