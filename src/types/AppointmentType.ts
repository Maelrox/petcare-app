import Owners from "../components/modules/owner/Owners";
import { fetchPatientOptions } from "../hooks/usePatient";
import { fetchVeterinaries } from "../hooks/useVeterinary";
import type { Owner } from "./OwnerType";
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
}

export const appointmentFields: FormField<Appointment, Veterinary>[] = [
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
    identifier: true,
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
    validators: { maxLength: 16 },
  },

];